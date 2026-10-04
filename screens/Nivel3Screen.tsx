import React, { useEffect, useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../service/supabase'
import { usuarioActual } from '../service/usuarioActual'

const laberinto = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

export default function Nivel3Screen({ navigation, route }: any) {

  const personaje = route.params?.personaje
  const [fila, setFila] = useState(1)
  const [columna, setColumna] = useState(1)

  // ==========================================
  // CRONÓMETRO
  // ==========================================
  const [tiempo, setTiempo] = useState(0)

  // ==========================================
  // ESTADO DEL JUEGO
  // ==========================================
  const [jugando, setJugando] = useState(true)

  // ==========================================
  // INICIAR CRONÓMETRO
  // ==========================================
  useEffect(() => {
    if (!jugando) {
      return
    }

    const intervalo = setInterval(() => {
      setTiempo(valor => valor + 1)
    }, 1000)

    return () => {
      clearInterval(intervalo)
    }
  }, [jugando])

  // ==========================================
  // FORMATEAR TIEMPO
  // ==========================================
  function formatearTiempo(segundos: number) {
    const minutos = Math.floor(segundos / 60)
    const segundosRestantes = segundos % 60

    return `${String(minutos).padStart(
      2,
      '0'
    )}:${String(segundosRestantes).padStart(
      2,
      '0'
    )}`
  }

  // ==========================================
  // GUARDAR PARTIDA
  // ==========================================
  async function guardarPartida(tiempoFinal: number) {

    const { error } = await supabase
      .from('partidas')
      .insert([
        {
          usuario: usuarioActual,
          personaje: personaje,
          nivel: 3,
          tiempo: tiempoFinal
        }
      ])

    if (error) {
      console.log('Error al guardar partida:', error)
      return
    }

    console.log('Partida guardada correctamente')
  }

  // ==========================================
  // MOVIMIENTO
  // ==========================================
  async function mover(
    cambioFila: number,
    cambioColumna: number
  ) {

    if (!jugando) {
      return
    }

    const nuevaFila =
      fila + cambioFila

    const nuevaColumna =
      columna + cambioColumna

    // ========================================
    // EVITAR SALIR DEL MAPA
    // ========================================
    if (
      nuevaFila < 0 ||
      nuevaFila >= laberinto.length ||
      nuevaColumna < 0 ||
      nuevaColumna >= laberinto[0].length
    ) {
      return
    }

    const siguienteCasilla =
      laberinto[nuevaFila][nuevaColumna]

    // ========================================
    // COLISIÓN CON PARED
    // ========================================
    if (siguienteCasilla === 1) {
      return
    }

    // ========================================
    // MOVER PERSONAJE
    // ========================================
    setFila(nuevaFila)
    setColumna(nuevaColumna)

    // ========================================
    // LLEGÓ A LA META
    // ========================================
    if (siguienteCasilla === 2) {
      setJugando(false)

      const tiempoFinal = tiempo

      await guardarPartida(tiempoFinal)

      Alert.alert(
        '🏆 ¡Nivel 3 completado!',
        `Terminaste Castillo Oscuro en ${formatearTiempo(
          tiempoFinal
        )}`,
        [
          {
            text: 'Volver a niveles',
            onPress: () =>
              navigation.goBack()
          }
        ]
      )
    }
  }

  // ==========================================
  // TAMAÑO RESPONSIVE
  // ==========================================
  const ancho =
    Dimensions.get('window').width

  const tamanoCasilla =
    Math.min(
      (ancho - 10) / 15,
      38
    )

  function obtenerImagenPersonaje() {
    switch (personaje) {
      case 'Guerrero':
        return require('../assets/images/personajes/guerrero_pixel.png')
      case 'Mago':
        return require('../assets/images/personajes/mago_pixel.png')
      case 'Arquero':
        return require('../assets/images/personajes/arquero_pixel.png')
      case 'Aventurero':
        return require('../assets/images/personajes/aventurero_pixel.png')
      default:
        return require('../assets/images/personajes/guerrero_pixel.png')
    }
  }

  return (
    <ImageBackground
      source={require(
        '../assets/images/fondo-home.png'
      )}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.overlay}>

        {/* ===============================
            TÍTULO
        =============================== */}
        <Text style={styles.titulo}>
          NIVEL 3
        </Text>

        <Text style={styles.nombre}>
          Castillo Oscuro
        </Text>

        {/* ===============================
            CRONÓMETRO
        =============================== */}
        <View style={styles.cronometro}>

          <Ionicons
            name="time-outline"
            size={24}
            color="#d6b47a"
          />

          <Text style={styles.tiempo}>
            {formatearTiempo(tiempo)}
          </Text>
        </View>

        {/* ===============================
            LABERINTO
        =============================== */}
        <View style={styles.laberinto}>

          {laberinto.map(
            (
              filaLaberinto,
              indiceFila
            ) => (

              <View
                key={indiceFila}
                style={styles.fila}
              >

                {filaLaberinto.map(
                  (
                    casilla,
                    indiceColumna
                  ) => {

                    const estaJugador =
                      fila === indiceFila &&
                      columna ===
                      indiceColumna

                    return (
                      <View
                        key={indiceColumna}
                        style={[
                          styles.casilla,

                          {
                            width:
                              tamanoCasilla,
                            height:
                              tamanoCasilla
                          },

                          casilla === 1
                            ? styles.pared
                            : styles.camino,

                          casilla === 2 &&
                          styles.meta
                        ]}
                      >

                        {/* PERSONAJE */}
                        {estaJugador && (

                          <Image
                            source={obtenerImagenPersonaje()}
                            style={styles.personaje}
                            resizeMode="contain"
                          />

                        )}

                        {/* META */}
                        {casilla === 2 &&
                          !estaJugador && (

                            <Ionicons
                              name="flag"
                              size={tamanoCasilla * 0.6}
                              color="#ffffff"
                            />

                          )}
                      </View>
                    )
                  }
                )}

              </View>
            )
          )}

        </View>

        {/* ===============================
            CONTROLES
        =============================== */}
        <Controles mover={mover} />

      </View>
    </ImageBackground>
  )
}

function Controles({ mover }: any) {

  return (
    <View style={styles.controles}>

      {/* ARRIBA */}
      <Pressable
        style={styles.boton}
        onPress={() =>
          mover(-1, 0)
        }
      >

        <Ionicons
          name="chevron-up"
          size={32}
          color="#f1ddaf"
        />

      </Pressable>

      <View style={styles.filaBotones}>

        {/* IZQUIERDA */}
        <Pressable
          style={styles.boton}
          onPress={() =>
            mover(0, -1)
          }
        >
          <Ionicons
            name="chevron-back"
            size={32}
            color="#f1ddaf"
          />
        </Pressable>

        {/* ABAJO */}
        <Pressable
          style={styles.boton}
          onPress={() =>
            mover(1, 0)
          }
        >

          <Ionicons
            name="chevron-down"
            size={32}
            color="#f1ddaf"
          />

        </Pressable>

        {/* DERECHA */}
        <Pressable
          style={styles.boton}
          onPress={() =>
            mover(0, 1)
          }
        >

          <Ionicons
            name="chevron-forward"
            size={32}
            color="#f1ddaf"
          />

        </Pressable>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  fondo: {
    flex: 1
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.58)',
    alignItems: 'center',
    paddingTop: 15
  },

  titulo: {
    color: '#f1ddaf',
    fontSize: 27,
    fontWeight: 'bold',
    letterSpacing: 1
  },

  nombre: {
    color: '#ffffff',
    fontSize: 15,
    marginTop: 3
  },

  cronometro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginVertical: 9,
    backgroundColor: '#071019',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6b47a'
  },

  tiempo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  laberinto: {
    borderWidth: 3,
    borderColor: '#d6b47a',
    backgroundColor: '#071019'
  },

  fila: {
    flexDirection: 'row'
  },

  casilla: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  pared: {
    backgroundColor: '#1d252d',
    borderWidth: 0.4,
    borderColor: '#3c4650'
  },

  camino: {
    backgroundColor: '#987b50'
  },

  meta: {
    backgroundColor: '#7a2929'
  },

  personaje: {
    width: '95%',
    height: '95%'
  },

  controles: {
    alignItems: 'center',
    marginTop: 10
  },

  filaBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8
  },

  boton: {
    width: 62,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#071019',
    borderWidth: 2,
    borderColor: '#d6b47a',
    justifyContent: 'center',
    alignItems: 'center'
  }
})