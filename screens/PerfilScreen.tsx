import React, { useEffect, useState } from 'react'
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../service/supabase'
import { usuarioActual } from '../service/usuarioActual'

export default function PerfilScreen({ navigation }: any) {

  const [usuario, setUsuario] = useState<any>(null)

  async function leerUsuario() {

    const { data, error } = await supabase
      .from('usuarios')
      .select()
      .eq('nombre', usuarioActual)

    if (error) {
      Alert.alert('ERROR', 'No se pudo cargar el perfil')
      return
    }

    if (data.length > 0) {
      setUsuario(data[0])
    }
  }

  useEffect(() => {
    leerUsuario()
  }, [])

  function cerrarSesion() {
    navigation.navigate('Welcome')
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Ionicons
          name="shield-outline"
          size={25}
          color="#d6b47a"
        />

        <Text style={styles.titulo}>
          Mi Perfil
        </Text>

        <View style={{ width: 25 }} />
      </View>

      <View style={styles.contenido}>

        <View style={styles.iconoUsuario}>
          <Ionicons
            name="person"
            size={70}
            color="#ead7b0"
          />
        </View>

        <View style={styles.tarjeta}>

          <View style={styles.campo}>
            <Text style={styles.label}>Usuario</Text>
            <Text style={styles.valor}>
              {usuario?.nombre}
            </Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Correo</Text>
            <Text style={styles.valor}>
              {usuario?.correo}
            </Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Mi Personaje</Text>
            <Text style={styles.valor}>
              Sin personaje
            </Text>
          </View>

          <Pressable
            style={styles.botonCerrar}
            onPress={cerrarSesion}
          >
            <Text style={styles.textoCerrar}>
              Cerrar Sesión
            </Text>
          </Pressable>

        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#071019'
  },

  header: {
    height: 70,
    backgroundColor: '#071019',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#594a35'
  },

  titulo: {
    color: '#f1ddaf',
    fontSize: 24,
    fontWeight: 'bold'
  },

  contenido: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40
  },

  iconoUsuario: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#d6b47a',
    backgroundColor: '#101820',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -30,
    zIndex: 2
  },

  tarjeta: {
    width: '100%',
    backgroundColor: '#d8c29d',
    borderRadius: 10,
    padding: 20,
    paddingTop: 50
  },

  campo: {
    borderWidth: 1,
    borderColor: '#b59c76',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },

  label: {
    fontWeight: 'bold',
    color: '#333'
  },

  valor: {
    marginTop: 5,
    color: '#222',
    fontSize: 16
  },

  botonCerrar: {
    backgroundColor: '#421313',
    borderWidth: 2,
    borderColor: '#8b1e1e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15
  },

  textoCerrar: {
    color: '#ff8d7f',
    fontSize: 16,
    fontWeight: 'bold'
  }

})