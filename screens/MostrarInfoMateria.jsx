import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles.js";
import Footer from "../components/Footer.jsx";
import api from "../api.js"; //API en uso

const MostrarInfoMateria = ({ route, navigation }) => {
    const materiaParam = route.params?.materia || null;
    const [materia, setMateria] = useState(materiaParam);
    const [loading, setLoading] = useState(false);
    const [inscribir, setInscribir] = useState(false);

    //Carga de informacion de cada materia por medio de su ID
    useEffect(() => {
        const load = async () => {
            if (!materia && route.params?.id) {
                setLoading(true);
                try {
                    const result = await api.get(`/materias/${route.params.id}`);
                    setMateria(result.data);
                } catch (e) {
                    console.error(`Error al cargar la materia: ${e}`);
                    Alert.alert("Error", "No se pudieron cargar los datos.")
                } finally {
                    setLoading(false);
                }
            }
        };
        load();
    }, []);

    const handleInscribir = async () => {
        if (!materia) return;
        setInscribir(true);
        try {
            const result = await api.post("/inscripciones", { idMateria: materia.idMateria });
            if (result.status === 200 || result.status === 201) {
                Alert.alert("Éxito", "Te has inscrito correctamente a la materia.");
                navigation.goBack(); //Se actualiza el estado global
            }
            else {
                Alert.alert("Error", "No es posible inscribirse a esta materia en este momento. Por favor, inténtelo más tarde.");
            }
        } catch (e) {
            console.error(`Error al inscribir la materia: ${e}`);
        } finally {
            setInscribir(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primaryBlue} />
            </SafeAreaView>
        );
    }
    if (!materia) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.noData}>Datos de la materia no disponibles</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{materia.titulo}</Text>

                {/** Si tienes ruta de imagen en materia, úsala; si no, imagen por defecto */}
                <Image
                    source={materia.imagen ? { uri: materia.imagen } : require("../assets/math.jpg")}
                    style={styles.image}
                />

                <Text style={styles.section}>Descripción</Text>
                <Text style={styles.text}>{materia.descripcion || "Sin descripción disponible."}</Text>

                <Text style={styles.section}>Código</Text>
                <Text style={styles.text}>{materia.idMateria ?? materia.id ?? "-"}</Text>

                <TouchableOpacity
                    style={styles.enrollButton}
                    onPress={handleInscribir}
                    disabled={inscribir}
                >
                    {inscribir ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.enrollText}>Inscribirme</Text>
                    )}
                </TouchableOpacity>
                <Footer/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.darkBlue
    },
    content: {
        padding: 16
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.darkBlue
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        color: COLORS.white,
        fontWeight: "800",
        margin: 15
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 8,
        marginBottom: 12
    },
    section: {
        fontFamily: "NunitoRegular",
        fontSize: 18,
        color: COLORS.primaryBlue,
        fontWeight: "700",
        marginTop: 8,
        marginBottom: 6
    },
    text: {
        fontFamily: "NunitoRegular",
        fontSize: 18,
        color: COLORS.white,
        marginTop: 4,
        lineHeight: 20,
        textAlign: "justify"
    },
    enrollButton: {
        marginTop: 20,
        backgroundColor: COLORS.successGreen || "#10B981",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    enrollText: {
        color: COLORS.white,
        fontWeight: "700",
        fontSize: 18
    },
    noData: {
        color: COLORS.white
    },
});

export default MostrarInfoMateria;