import React, { useEffect, useState } from 'react'
import {FlatList,ImageBackground,StyleSheet,Text,View} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../service/supabase'

export default function RankingScreen() {
    const [ranking, setRanking] = useState<any[]>([])
    useEffect(() => {
        cargarRanking()
    }, [])

    async function cargarRanking() {
        const { data, error } = await supabase
            .from('partidas')
            .select('*')
        if (error) {
            console.log('Error al cargar ranking:', error)
            return
        }
        if (!data) {
            return
        }

        // =====================================
        // OBTENER MEJOR RESULTADO POR USUARIO
        // =====================================
        const mejores: any = {}

        data.forEach((partida: any) => {
            const anterior = mejores[partida.usuario]

            // Primera partida encontrada
            if (!anterior) {
                mejores[partida.usuario] = partida
                return
            }

            // Alcanzó un nivel superior
            if (partida.nivel > anterior.nivel) {
                mejores[partida.usuario] = partida
                return
            }

            // Mismo nivel pero mejor tiempo
            if (
                partida.nivel === anterior.nivel &&
                partida.tiempo < anterior.tiempo
            ) {
                mejores[partida.usuario] = partida
            }
        })

        const lista = Object.values(mejores)

        // =====================================
        // ORDENAR RANKING
        // =====================================
        lista.sort((a: any, b: any) => {
            // Primero mayor nivel
            if (a.nivel !== b.nivel) {
                return b.nivel - a.nivel
            }
            // Después menor tiempo
            return a.tiempo - b.tiempo
        })
        setRanking(lista)
    }

    function formatearTiempo(segundos: number) {
        const minutos =
            Math.floor(segundos / 60)
        const segundosRestantes =
            segundos % 60
        return `${String(minutos).padStart(
            2,
            '0'
        )}:${String(segundosRestantes).padStart(
            2,
            '0'
        )}`
    }

    function obtenerMedalla(posicion: number) {
        if (posicion === 0) return '🥇'
        if (posicion === 1) return '🥈'
        if (posicion === 2) return '🥉'
        return `${posicion + 1}`
    }

    return (

        <ImageBackground
            source={require('../assets/images/fondo-home.png')}
            style={styles.fondo}
            resizeMode="cover"
        >
            <View style={styles.overlay}>

                <View style={styles.encabezado}>
                    <Ionicons
                        name="trophy"
                        size={35}
                        color="#d6b47a"
                    />

                    <Text style={styles.titulo}>
                        RANKING
                    </Text>

                    <Text style={styles.subtitulo}>
                        Mejores aventureros
                    </Text>
                </View>

                <View style={styles.cabeceraTabla}>
                    <Text style={styles.colTop}>
                        TOP
                    </Text>

                    <Text style={styles.colJugador}>
                        JUGADOR
                    </Text>

                    <Text style={styles.colPersonaje}>
                        PERSONAJE
                    </Text>

                    <Text style={styles.colNivel}>
                        NIVEL
                    </Text>

                    <Text style={styles.colTiempo}>
                        TIEMPO
                    </Text>
                </View>

                <FlatList
                    data={ranking}
                    keyExtractor={(item) =>
                        item.id.toString()
                    }

                    contentContainerStyle={
                        styles.lista
                    }

                    ListEmptyComponent={
                        <Text style={styles.sinPartidas}>
                            Todavía no hay partidas registradas
                        </Text>
                    }
                    renderItem={({ item, index }) => (
                        <View style={styles.tarjeta}>

                            <Text style={styles.colTop}>
                                {obtenerMedalla(index)}
                            </Text>

                            <Text
                                style={styles.colJugador}
                                numberOfLines={1}
                            >
                                {item.usuario}
                            </Text>

                            <Text
                                style={styles.colPersonaje}
                                numberOfLines={1}
                            >
                                {item.personaje}
                            </Text>

                            <Text style={styles.colNivel}>
                                {item.nivel}
                            </Text>

                            <Text style={styles.colTiempo}>
                                {formatearTiempo(item.tiempo)}
                            </Text>

                        </View>
                    )}
                />
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
        backgroundColor:'rgba(0,0,0,0.62)',
        paddingHorizontal: 12
    },

    encabezado: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 25
    },

    titulo: {
        color: '#f1ddaf',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
        letterSpacing: 2
    },

    subtitulo: {
        color: '#ffffff',
        fontSize: 14,
        marginTop: 4
    },

    cabeceraTabla: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#071019',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#594a35',
        borderRadius: 8,
        marginBottom: 7
    },

    lista: {
        paddingBottom: 25
    },

    tarjeta: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 65,
        backgroundColor: 'rgba(7,16,25,0.93)',
        borderWidth: 1,
        borderColor: '#594a35',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 8
    },

    colTop: {
        width: '12%',
        color: '#f1ddaf',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    colJugador: {
        width: '25%',
        color: '#ffffff',
        fontWeight: 'bold',
        paddingHorizontal: 3
    },

    colPersonaje: {
        width: '25%',
        color: '#d6b47a',
        textAlign: 'center'
    },

    colNivel: {
        width: '16%',
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    colTiempo: {
        width: '22%',
        color: '#f1ddaf',
        textAlign: 'center',
        fontWeight: 'bold'
    },

    sinPartidas: {
        color: '#cccccc',
        textAlign: 'center',
        marginTop: 60,
        fontSize: 16
    }
})