import {
  ImageBackground,
  StyleSheet,
  Text,
  View
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function HomeScreen() {

  return (
    <ImageBackground
      source={require('../assets/images/fondo-home.png')}
      style={styles.fondo}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

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

        <View style={styles.contenido}>

          <Text style={styles.titulo}>
            ¡Bienvenido, Aventurero!
          </Text>

          <Text style={styles.subtitulo}>
            Elige tu camino y forja tu leyenda
          </Text>

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25
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
    marginTop: 10,
    textAlign: 'center'
  }

})