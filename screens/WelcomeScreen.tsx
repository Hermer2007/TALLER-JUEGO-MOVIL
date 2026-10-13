import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({ navigation }: any) {
    return (
        <ImageBackground
            source={require('../assets/images/fondo-juego.png')}
            style={styles.fondo}
            resizeMode="cover"
        >
            <View style={styles.overlay}>

                <Image
                    source={require('../assets/images/titulo-juego.png')}
                    style={styles.logo}
                />

                <Text style={styles.subtitulo}>
                    TU HISTORIA COMIENZA AQUÍ
                </Text>

                <Pressable
                    style={styles.botonPrincipal}
                    onPress={() => navigation.navigate('Registro')}
                >
                    <Text style={styles.textoBotonPrincipal}>
                        Registrarse
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.botonSecundario}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.textoBotonSecundario}>
                        Iniciar sesión
                    </Text>
                </Pressable>

                <Text style={styles.frase}>
                    “Todo gran héroe comienza con un primer paso”
                </Text>

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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'rgba(0,0,0,0.25)'
    },

    logo: {
        width: 280,
        height: 130,
        resizeMode: 'contain',
        marginBottom: 5
    },

    subtitulo: {
        color: '#d8c29d',
        fontSize: 12,
        fontFamily: 'PressStart2P_400Regular',
        textAlign: 'center',
        lineHeight: 22,
        letterSpacing: 0,
        marginBottom: 55,
        width: '100%',
        flexShrink: 1
    },

    botonPrincipal: {
        width: '80%',
        backgroundColor: '#d8c29d',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },

    textoBotonPrincipal: {
        color: '#111',
        fontSize: 17,
        fontWeight: 'bold'
    },

    botonSecundario: {
        width: '80%',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#d8c29d',
        backgroundColor: 'rgba(0,0,0,0.35)'
    },

    textoBotonSecundario: {
        color: '#f4e8d0',
        fontSize: 17,
        fontWeight: 'bold'
    },

    frase: {
        color: '#e8e0d4',
        fontSize: 10,
        fontFamily: 'PressStart2P_400Regular',
        textAlign: 'center',
        lineHeight: 22,
        marginTop: 55,
        width: '100%',
        flexShrink: 1
    }
})