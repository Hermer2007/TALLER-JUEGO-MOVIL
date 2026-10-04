import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { File } from 'expo-file-system'
import { supabase } from '../service/supabase'
import { usuarioActual } from '../service/usuarioActual'

export default function PerfilScreen({ navigation }: any) {

  const [usuario, setUsuario] = useState<any>(null)
  const [subiendo, setSubiendo] = useState(false)

  async function leerUsuario() {

    const { data, error } = await supabase
      .from('usuarios')
      .select()
      .eq('nombre', usuarioActual)

    if (error) {
      console.log('Error al cargar usuario:', error)
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

  // ==========================================
  // OPCIONES PARA CAMBIAR FOTO
  // ==========================================
  function cambiarFoto() {

    Alert.alert(
      'Foto de perfil',
      'Selecciona una opción',
      [
        {
          text: 'Tomar foto',
          onPress: tomarFoto
        },
        {
          text: 'Elegir de galería',
          onPress: seleccionarGaleria
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }

  // ==========================================
  // TOMAR FOTO
  // ==========================================
  async function tomarFoto() {

    const permiso =
      await ImagePicker.requestCameraPermissionsAsync()

    if (!permiso.granted) {
      Alert.alert(
        'Permiso requerido',
        'Debes permitir el acceso a la cámara'
      )
      return
    }

    const resultado =
      await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      })

    console.log(resultado)

    if (!resultado.canceled) {
      await subirFoto(resultado.assets[0].uri)
    }
  }

  // ==========================================
  // ELEGIR DE GALERÍA
  // ==========================================
  async function seleccionarGaleria() {

    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permiso.granted) {
      Alert.alert(
        'Permiso requerido',
        'Debes permitir el acceso a tus imágenes'
      )
      return
    }

    const resultado =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      })

    console.log(resultado)

    if (!resultado.canceled) {
      await subirFoto(resultado.assets[0].uri)
    }
  }

  // ==========================================
  // SUBIR FOTO A SUPABASE
  // ==========================================
  async function subirFoto(uri: string) {

    try {

      setSubiendo(true)

      // Método utilizado por el docente
      const file = new File(uri)
      const arrayBits = await file.bytes()

      // Nombre único para cada imagen
      const nombreArchivo =
        `${usuarioActual}_${Date.now()}.jpg`

      // Subir imagen al Storage
      const { data, error: errorSubida } =
        await supabase
          .storage
          .from('perfiles')
          .upload(nombreArchivo, arrayBits, {
            cacheControl: 'no-cache',
            contentType: 'image/jpeg',
            upsert: false
          })

      console.log('Imagen subida:', data)
      console.log('Error Storage:', errorSubida)

      if (errorSubida) {
        Alert.alert(
          'ERROR',
          'No se pudo subir la imagen'
        )
        return
      }

      // ======================================
      // OBTENER URL PÚBLICA
      // ======================================
      const { data: urlData } =
        supabase
          .storage
          .from('perfiles')
          .getPublicUrl(nombreArchivo)

      const urlFoto = urlData.publicUrl

      console.log('URL de la foto:', urlFoto)

      // ======================================
      // GUARDAR URL EN EL USUARIO
      // ======================================
      const { error: errorActualizar } =
        await supabase
          .from('usuarios')
          .update({
            foto: urlFoto
          })
          .eq('nombre', usuarioActual)

      if (errorActualizar) {

        console.log(
          'Error al actualizar usuario:',
          errorActualizar
        )

        Alert.alert(
          'ERROR',
          'La imagen se subió, pero no se pudo actualizar el perfil'
        )

        return
      }

      // Actualizar foto inmediatamente
      setUsuario({
        ...usuario,
        foto: urlFoto
      })

      Alert.alert(
        'ÉXITO',
        'Foto de perfil actualizada'
      )

    } catch (error) {

      console.log(
        'Error al subir imagen:',
        error
      )

      Alert.alert(
        'ERROR',
        'Ocurrió un problema al subir la imagen'
      )

    } finally {

      setSubiendo(false)

    }
  }

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

        {/* FOTO DE PERFIL */}
        <View style={styles.contenedorFoto}>

          <View style={styles.iconoUsuario}>

            {usuario?.foto ? (

              <Image
                source={{ uri: usuario.foto }}
                style={styles.fotoPerfil}
                resizeMode="cover"
              />

            ) : (

              <Ionicons
                name="person"
                size={70}
                color="#ead7b0"
              />

            )}

          </View>

          {/* BOTÓN LÁPIZ */}
          <Pressable
            style={styles.botonEditarFoto}
            onPress={cambiarFoto}
            disabled={subiendo}
          >

            <Ionicons
              name="pencil"
              size={20}
              color="#071019"
            />

          </Pressable>

        </View>

        <View style={styles.tarjeta}>

          <View style={styles.campo}>
            <Text style={styles.label}>
              Usuario
            </Text>

            <Text style={styles.valor}>
              {usuario?.nombre}
            </Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>
              Correo
            </Text>

            <Text style={styles.valor}>
              {usuario?.correo}
            </Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>
              Mi Personaje
            </Text>

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

  contenedorFoto: {
    position: 'relative',
    marginBottom: -30,
    zIndex: 2
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
    overflow: 'hidden'
  },

  fotoPerfil: {
    width: '100%',
    height: '100%'
  },

  botonEditarFoto: {
    position: 'absolute',
    right: -3,
    bottom: 5,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#d6b47a',
    borderWidth: 3,
    borderColor: '#071019',
    justifyContent: 'center',
    alignItems: 'center'
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