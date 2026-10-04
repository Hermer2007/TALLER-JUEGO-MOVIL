import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function PartidasScreen({ navigation, route }: any) {

    const personaje = route.params?.personaje

    const [nivelSeleccionado, setNivelSeleccionado] =
        useState<number | null>(null)

    const niveles = [
        {
            numero: 1,
            nombre: 'Bosque Perdido',
            dificultad: '★☆☆',
            descripcion: 'Un camino sencillo para comenzar tu aventura.'
        },
        {
            numero: 2,
            nombre: 'Mazmorra Antigua',
            dificultad: '★★☆',
            descripcion: 'Más caminos y obstáculos te esperan.'
        },
        {
            numero: 3,
            nombre: 'Castillo Oscuro',
            dificultad: '★★★',
            descripcion: 'Solo los mejores aventureros llegarán a la meta.'
        }
    ]

    function seleccionarNivel(numero: number) {
        setNivelSeleccionado(numero)
    }

    function iniciarPartida() {

        if (nivelSeleccionado === null) {
            return
        }

        if (nivelSeleccionado === 1) {
            navigation.navigate('Nivel1', {
                personaje: personaje
            })
        }

        if (nivelSeleccionado === 2) {
            navigation.navigate('Nivel2', {
                personaje: personaje
            })
        }

        if (nivelSeleccionado === 3) {
            navigation.navigate('Nivel3', {
                personaje: personaje
            })
        }
    }

    return (
        <ImageBackground
            source={require('../assets/images/fondo-home.png')}
            style={styles.fondo}
            resizeMode="cover"
        >

            <View style={styles.overlay}>

                <View style={styles.contenido}>

                    <Text style={styles.titulo}>
                        PARTIDA
                    </Text>

                    <Text style={styles.subtitulo}>
                        Selecciona un nivel
                    </Text>

                    <View style={styles.listaNiveles}>

                        {niveles.map((nivel) => {

                            const seleccionado =
                                nivelSeleccionado === nivel.numero

                            return (

                                <Pressable
                                    key={nivel.numero}
                                    style={[
                                        styles.tarjetaNivel,
                                        seleccionado &&
                                        styles.tarjetaSeleccionada
                                    ]}
                                    onPress={() =>
                                        seleccionarNivel(nivel.numero)
                                    }
                                >

                                    <View style={styles.numeroNivel}>

                                        <Text style={styles.numeroTexto}>
                                            {nivel.numero}
                                        </Text>

                                    </View>

                                    <View style={styles.infoNivel}>

                                        <Text style={styles.nombreNivel}>
                                            {nivel.nombre}
                                        </Text>

                                        <Text style={styles.descripcion}>
                                            {nivel.descripcion}
                                        </Text>

                                        <Text style={styles.dificultad}>
                                            {nivel.dificultad}
                                        </Text>

                                    </View>

                                    {seleccionado && (

                                        <Ionicons
                                            name="checkmark-circle"
                                            size={30}
                                            color="#d6b47a"
                                        />

                                    )}

                                </Pressable>

                            )

                        })}

                    </View>

                    <Pressable
                        style={[
                            styles.botonIniciar,

                            nivelSeleccionado === null &&
                            styles.botonDesactivado
                        ]}
                        disabled={nivelSeleccionado === null}
                        onPress={iniciarPartida}
                    >

                        <Ionicons
                            name="game-controller-outline"
                            size={24}
                            color="#071019"
                        />

                        <Text style={styles.textoBoton}>
                            INICIAR PARTIDA
                        </Text>

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
        backgroundColor: 'rgba(0,0,0,0.45)'
    },

    contenido: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 45
    },

    titulo: {
        color: '#f1ddaf',
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 2
    },

    subtitulo: {
        color: '#ffffff',
        fontSize: 17,
        marginTop: 8,
        marginBottom: 30
    },

    listaNiveles: {
        width: '100%',
        maxWidth: 600,
        gap: 15
    },

    tarjetaNivel: {
        minHeight: 110,
        backgroundColor: 'rgba(7,16,25,0.92)',
        borderWidth: 2,
        borderColor: '#594a35',
        borderRadius: 15,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },

    tarjetaSeleccionada: {
        borderColor: '#d6b47a',
        borderWidth: 3
    },

    numeroNivel: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#d6b47a',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18
    },

    numeroTexto: {
        color: '#071019',
        fontSize: 24,
        fontWeight: 'bold'
    },

    infoNivel: {
        flex: 1
    },

    nombreNivel: {
        color: '#f1ddaf',
        fontSize: 19,
        fontWeight: 'bold'
    },

    descripcion: {
        color: '#d4d4d4',
        fontSize: 13,
        marginTop: 5
    },

    dificultad: {
        color: '#d6b47a',
        fontSize: 18,
        marginTop: 7
    },

    botonIniciar: {
        marginTop: 30,
        backgroundColor: '#d6b47a',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
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