import {Alert, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../service/supabase'
import { guardarUsuario } from '../service/usuarioActual'

export default function LoginScreen({ navigation }: any) {

  const [usuario, setUsuario] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  async function ingresar() {

  if (usuario === '' || contrasenia === '') {
    Alert.alert('AVISO', 'Complete todos los campos')
    return
  }

  const { data, error } = await supabase
    .from('usuarios')
    .select()
    .eq('nombre', usuario)
    .eq('contrasenia', contrasenia)

  if (error) {
    Alert.alert('ERROR', 'No se pudo iniciar sesión')
    return
  }

  if (data.length === 0) {
    Alert.alert('ERROR', 'Usuario o contraseña incorrectos')
    return
  }

  Alert.alert(
    'BIENVENIDO',
    'Inicio de sesión correcto'
  )

  guardarUsuario(data[0].nombre)

  navigation.navigate('Menu')
}

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/casco-login.png')}
        style={styles.icono}
      />

      <Text style={styles.titulo}>
        Iniciar Sesión
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#9f9f9f"
        keyboardType="email-address"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#9f9f9f"
        secureTextEntry
        value={contrasenia}
        onChangeText={setContrasenia}
      />

      <Pressable
        style={styles.boton}
        onPress={ingresar}
      >
        <Text style={styles.textoBoton}>
          Ingresar
        </Text>
      </Pressable>

      <View style={styles.fila}>

        <Text style={styles.texto}>
          ¿No tienes cuenta?
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Registro')}
        >
          <Text style={styles.enlace}>
            Regístrate
          </Text>
        </Pressable>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#071019',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },

  icono: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10
  },

  titulo: {
    color: '#f1ddaf',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 30
  },

  input: {
    width: '100%',
    backgroundColor: '#151f29',
    color: 'white',
    borderWidth: 1,
    borderColor: '#303a44',
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 15
  },

  boton: {
    width: '100%',
    backgroundColor: '#d8c29d',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },

  textoBoton: {
    color: '#111',
    fontSize: 17,
    fontWeight: 'bold'
  },

  fila: {
    flexDirection: 'row',
    marginTop: 25,
    gap: 5
  },

  texto: {
    color: '#ddd'
  },

  enlace: {
    color: '#d8c29d',
    textDecorationLine: 'underline'
  }

})