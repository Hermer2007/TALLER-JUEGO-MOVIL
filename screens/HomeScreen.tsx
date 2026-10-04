import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function HomeScreen({ navigation }: any) {

  const [personajeSeleccionado, setPersonajeSeleccionado] = useState('')

  const personajes = [
    {
      nombre: 'Guerrero',
      imagen: require('../assets/images/personajes/guerrero.png')
    },
    {
      nombre: 'Mago',
      imagen: require('../assets/images/personajes/mago.png')
    },
    {
      nombre: 'Arquero',
      imagen: require('../assets/images/personajes/arquero.png')
    },
    {
      nombre: 'Aventurero',
      imagen: require('../assets/images/personajes/aventurero.png')
    }
  ]

  return (
    <ImageBackground
      source={require('../assets/images/fondo-home.png')}
      style={styles.fondo}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        {/* NAVBAR */}
        <View style={styles.navbar}>

          <Text style={styles.logo}>
            FANTASY REALM
          </Text>

          <Ionicons
            name="shield-outline"
            size={27}
            color="#d6b47a"
          />

        </View>

        {/* CONTENIDO */}
        <View style={styles.contenido}>

          <Text style={styles.titulo}>
            ¡Bienvenido, Aventurero!
          </Text>

          <Text style={styles.subtitulo}>
            Elige tu personaje y forja tu leyenda
          </Text>

          {/* PERSONAJES */}
          <View style={styles.contenedorPersonajes}>

            {personajes.map((personaje) => {

              const seleccionado =
                personajeSeleccionado === personaje.nombre

              return (

                <Pressable
                  key={personaje.nombre}
                  style={[
                    styles.tarjeta,
                    seleccionado && styles.tarjetaSeleccionada
                  ]}
                  onPress={() =>
                    setPersonajeSeleccionado(personaje.nombre)
                  }
                >

                  <Image
                    source={personaje.imagen}
                    style={styles.imagenPersonaje}
                    resizeMode="cover"
                  />

                  {seleccionado && (

                    <View style={styles.indicadorSeleccionado}>

                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#f1ddaf"
                      />

                    </View>
                  )}
                </Pressable>
              )
            })}
          </View>

          {/* PERSONAJE ELEGIDO */}
          {personajeSeleccionado !== '' && (

            <Text style={styles.textoSeleccionado}>
              Personaje seleccionado: {personajeSeleccionado}
            </Text>
          )}
          
          <Pressable
            style={[
              styles.botonContinuar,
              personajeSeleccionado === '' && styles.botonDesactivado
            ]}
            disabled={personajeSeleccionado === ''}
            onPress={() =>
              navigation.navigate('Partida', {
                personaje: personajeSeleccionado
              })
            }
          >
            <Text style={styles.textoBoton}>
              CONTINUAR
            </Text>

            <Ionicons
              name="arrow-forward"
              size={22}
              color="#071019"
            />
          </Pressable>
        </View>

      </View>

    </ImageBackground>
  )
}

const styles = StyleSheet.create({

  fondo: {
    flex: 1
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)'
  },

  navbar: {
    height: 100,
    backgroundColor: 'rgba(7,16,25,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#594a35'
  },

  logo: {
    color: '#d6b47a',
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1
  },

  contenido: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 45
  },

  titulo: {
    color: '#f1ddaf',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  subtitulo: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center'
  },

  contenedorPersonajes: {
    width: '100%',
    maxWidth: 500,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginTop: 30
  },

  tarjeta: {
    width: '45%',
    aspectRatio: 0.85,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#594a35',
    backgroundColor: '#071019'
  },

  tarjetaSeleccionada: {
    borderColor: '#f1ddaf',
    borderWidth: 4,
    transform: [{ scale: 1.03 }]
  },

  imagenPersonaje: {
    width: '100%',
    height: '100%'
  },

  indicadorSeleccionado: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(7,16,25,0.9)',
    borderRadius: 20
  },

  textoSeleccionado: {
    color: '#f1ddaf',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20
  },

  botonContinuar: {
    marginTop: 20,
    backgroundColor: '#d6b47a',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },

  botonDesactivado: {
    opacity: 0.4
  },

  textoBoton: {
    color: '#071019',
    fontSize: 16,
    fontWeight: 'bold'
  }
})