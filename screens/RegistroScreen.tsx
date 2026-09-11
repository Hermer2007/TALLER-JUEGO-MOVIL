import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { supabase } from '../service/supabase'

export default function RegistroScreen({ navigation }: any) {

  const [usuario, setUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [confirmar, setConfirmar] = useState('')

  async function registrar() {

  if (usuario === '' || correo === '' || contrasenia === '' || confirmar === '') {
    Alert.alert('AVISO', 'Complete todos los campos')
    return
  }

  if (contrasenia !== confirmar) {
    Alert.alert('ERROR', 'Las contraseñas no coinciden')
    return
  }

  const { error } = await supabase
    .from('usuarios')
    .insert({
      nombre: usuario,
      correo: correo,
      contrasenia: contrasenia
    })

  if (error) {
    Alert.alert('ERROR', 'No se pudo registrar')
    return
  }

  Alert.alert(
    'REGISTRO',
    'Usuario registrado correctamente'
  )

  setUsuario('')
  setCorreo('')
  setContrasenia('')
  setConfirmar('')

  navigation.navigate('Login')
}

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/libro-registro.png')}
        style={styles.icono}
      />

      <Text style={styles.titulo}>
        Crear Cuenta
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        placeholderTextColor="#9f9f9f"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#9f9f9f"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#9f9f9f"
        secureTextEntry
        value={contrasenia}
        onChangeText={setContrasenia}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        placeholderTextColor="#9f9f9f"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
      />

      <Pressable
        style={styles.boton}
        onPress={registrar}
      >
        <Text style={styles.textoBoton}>
          Registrarse
        </Text>
      </Pressable>

      <View style={styles.fila}>
        <Text style={styles.texto}>
          ¿Ya tienes cuenta?
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.enlace}>
            Inicia sesión
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