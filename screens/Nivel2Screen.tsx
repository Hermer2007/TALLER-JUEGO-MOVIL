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
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

export default function Nivel2Screen({ navigation, route }: any) {

  const personaje = route.params?.personaje
  const [fila, setFila] = useState(1)
  const [columna, setColumna] = useState(1)

  // Cronómetro
  const [tiempo, setTiempo] = useState(0)

  // Estado de la partida
  const [jugando, setJugando] = useState(true)

  // ==========================================
  // CRONÓMETRO
  // ==========================================

  useEffect(() => {
    if (!jugando) {
      return
    }

    const intervalo = setInterval(() => {

      setTiempo(valor => valor + 1)

    }, 1000)
    return () => clearInterval(intervalo)
  }, [jugando])

  // ==========================================
  // FORMATEAR TIEMPO
  // ==========================================
  function formatearTiempo(segundos: number) {

    const minutos = Math.floor(segundos / 60)

    const segundosRestantes = segundos % 60

    return `${String(minutos).padStart(2, '0')}:${String(
      segundosRestantes
    ).padStart(2, '0')}`

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
          nivel: 2,
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
  // MOVIMIENTO DEL PERSONAJE
  // ==========================================

  async function mover(
    cambioFila: number,
    cambioColumna: number
  ) {

    if (!jugando) {
      return
    }

    const nuevaFila = fila + cambioFila
    const nuevaColumna = columna + cambioColumna

    // Evitar salir del laberinto
    if (
      nuevaFila < 0 ||
      nuevaFila >= laberinto.length ||
      nuevaColumna < 0 ||
      nuevaColumna >= laberinto[0].length
    ) {
      return
    }

    // Obtener la siguiente casilla
    const siguienteCasilla =
      laberinto[nuevaFila][nuevaColumna]

    // Si hay pared no puede avanzar
    if (siguienteCasilla === 1) {
      return
    }

    // Movimiento válido
    setFila(nuevaFila)
    setColumna(nuevaColumna)

    // ==========================================
    // META
    // ==========================================
    if (siguienteCasilla === 2) {
      setJugando(false)

      const tiempoFinal = tiempo

      await guardarPartida(tiempoFinal)

      Alert.alert(
        '🏆 ¡Nivel 2 completado!',
        `Terminaste Mazmorra Antigua en ${formatearTiempo(tiempoFinal)}`,
        [
          {
            text: 'Volver a niveles',
            onPress: () => navigation.goBack()
          }
        ]
      )
    }
  }

  // ==========================================
  // TAMAÑO RESPONSIVE DEL LABERINTO
  // ==========================================

  const ancho = Dimensions.get('window').width

  const tamanoCasilla = Math.min(
    (ancho - 10) / 13, 42
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
      source={require('../assets/images/fondo-home.png')}
      style={styles.fondo}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        {/* TÍTULO */}
        <Text style={styles.titulo}>
          NIVEL 2
        </Text>

        <Text style={styles.nombre}>
          Mazmorra Antigua
        </Text>

        {/* CRONÓMETRO */}
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

        {/* ===================================
            LABERINTO
        =================================== */}

        <View style={styles.laberinto}>

          {laberinto.map(
            (filaLaberinto, indiceFila) => (

              <View
                key={indiceFila}
                style={styles.fila}
              >

                {filaLaberinto.map(
                  (casilla, indiceColumna) => {

                    const estaJugador =
                      fila === indiceFila &&
                      columna === indiceColumna

                    return (
                      <View
                        key={indiceColumna}
                        style={[
                          styles.casilla,

                          {
                            width: tamanoCasilla,
                            height: tamanoCasilla
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

        {/* CONTROLES */}
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
        onPress={() => mover(-1, 0)}
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
          onPress={() => mover(0, -1)}
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
          onPress={() => mover(1, 0)}
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
          onPress={() => mover(0, 1)}
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
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    paddingTop: 70
  },

  titulo: {
    color: '#f1ddaf',
    fontSize: 25,
    fontFamily: 'PressStart2P_400Regular',
    textAlign: 'center',
    lineHeight: 30
  },

  nombre: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'PressStart2P_400Regular',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 5
  },

  cronometro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginVertical: 10,
    backgroundColor: '#071019',
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6b47a'
  },

  tiempo: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'PressStart2P_400Regular',
    textAlign: 'center'
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
    backgroundColor: '#26313b',
    borderWidth: 0.5,
    borderColor: '#45515c'
  },

  camino: {
    backgroundColor: '#aa8c5c'
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
    marginTop: 12
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