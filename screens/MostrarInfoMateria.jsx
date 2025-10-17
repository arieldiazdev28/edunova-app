import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Alert,
	ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import api from "../api.js";
import { useAuth } from "../context/AuthContext.js";

const MostrarInfoMateria = ({ navigation, route, openDrawer }) => {
	const { user } = useAuth();
	const materiaParam = route.params?.materia || null;
	const [materia, setMateria] = useState(materiaParam);
	const [loading, setLoading] = useState(false);
	const [inscribir, setInscribir] = useState(false);
	// Recibir el estado de inscripción desde el Dashboard
	const [usuarioInscrito, setUsuarioInscrito] = useState(
		route.params?.usuarioInscrito || false
	);

	//Carga de informacion de cada materia por medio de su ID
	useEffect(() => {
		const load = async () => {
			if (!materia && route.params?.id) {
				setLoading(true);
				try {
					const result = await api.get(`/materias/${route.params.id}`);
					const fetched = result?.data ?? result?.materia ?? result ?? null;
					setMateria(fetched);
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


	// Verificar si el usuario ya está inscrito en esta materia
	useEffect(() => {
		const verificarInscripcion = async () => {
			if (user?.uid && materia?.idMateria) {
				try {
					// Obtener materias inscritas del usuario
					const { materias } = await api.get(`/mis_materias/${user.uid}`);
					// Verificar si esta materia está en la lista
					const estaInscrito = materias?.some(
						(m) => m.idMateria === materia.idMateria
					);
					setUsuarioInscrito(estaInscrito || false);
				} catch (error) {
					console.error("Error al verificar inscripción:", error);
					setUsuarioInscrito(false);
				}
			}
		};

		verificarInscripcion();
	}, [user?.uid, materia?.idMateria]);

	const handleInscribir = async () => {
		if (!materia) return;
		if (!user) {
			Alert.alert("Error", "Debes iniciar sesión para inscribirte.");
			return;
		}

		// Evitar reintentos si ya está inscrito según el estado local
		if (usuarioInscrito) {
			Alert.alert("Información", "Ya estás inscrito en esta materia.");
			return;
		}

		setInscribir(true);
		try {
			const idToSend = materia.idMateria ?? materia.id ?? materia.materiaId ?? null;
			if (!idToSend) {
				Alert.alert("Error", "No se encontró el identificador de la materia. No es posible inscribirse.");
				return;
			}

			console.log("Intentando inscribir usuario", user.uid, "en materia", idToSend);

			// Intentar endpoint que requiere usuario si tenemos user
			let result;
			try {
				result = await api.post("/inscribir_materia", { idMateria: idToSend, idUsuario: user.uid });
			} catch (err) {
				// Si devuelve 409, propaga para el catch exterior; si no, intentamos fallback a /inscripciones
				if (err?.response?.status === 409) throw err;
				console.warn("Fallo en /inscribir_materia, intentando /inscripciones:", err.message);
				result = await api.post("/inscripciones", { idMateria: idToSend });
			}

			console.log("Respuesta inscripcion:", result);
			setUsuarioInscrito(true);
			Alert.alert("Éxito", "Te has inscrito correctamente a la materia.", [
				{ text: "OK", onPress: () => navigation.navigate("Dashboard", { materiasActualizadas: true, materiaInscrita: idToSend }) },
			]);
		} catch (e) {
			console.error("Error al inscribir la materia:", e);
			const status = e?.response?.status ?? null;
			const respData = e?.response?.data ?? e?.responseText ?? null;

			if (status === 409) {
				Alert.alert("Información", "Ya estás inscrito en esta materia.");
				setUsuarioInscrito(true);
			} else if (status === 400 || status === 422) {
				Alert.alert("Error", (respData && (respData.message || JSON.stringify(respData))) || "Datos inválidos.");
			} else if (status >= 500) {
				Alert.alert("Error del servidor", "Ocurrió un problema en el servidor. Intenta más tarde.");
			} else {
				Alert.alert("Error", e.message || "No se pudo completar la inscripción.");
			}

			console.log("Detalle error inscripción - status:", status, "body:", respData);
		} finally {
			setInscribir(false);
		}
	};

	// Función para redirigir al contenido de la materia
	const handleAprender = async () => {
		navigation.navigate("ContenidoMateria", {
			materiaId: materia.idMateria,
			materiaTitulo: materia.titulo
		});
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
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="arrow-back-sharp" size={24} color="white" />
				</TouchableOpacity>
				<Text style={styles.title}>{materia.titulo}</Text>
				<View style={{ width: 50 }} />
			</View>
			<ScrollView contentContainerStyle={styles.content}>
				{/* <Header openDrawer={openDrawer} /> */}
				<Image
					source={
						materia.imagen
							? { uri: materia.imagen }
							: require("../assets/math.jpg")
					}
					style={styles.image}
				/>

				<Text style={styles.section}>Descripción</Text>
				<Text style={styles.text}>
					{materia.descripcion || "Sin descripción disponible."}
				</Text>

				<Text style={styles.section}>Código</Text>
				<Text style={styles.text}>
					{materia.idMateria ?? materia.id ?? "-"}
				</Text>




				<TouchableOpacity
					style={[
						styles.enrollButton,
						usuarioInscrito && styles.aprenderButton,
					]}
					onPress={usuarioInscrito ? handleAprender : handleInscribir}
					disabled={inscribir}
				>
					{inscribir ? (
						<ActivityIndicator color="#fff" />
					) : (
						<Text style={styles.enrollText}>
							{usuarioInscrito ? "Aprender" : "Inscribirme"}
						</Text>
					)}
				</TouchableOpacity>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);


	{/* <TouchableOpacity>
          {inscribir ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.enrollText}>
              {usuarioInscrito ? "Aprender" : "Inscribirme"}
            </Text>
          )}
        </TouchableOpacity>
         */}
};

export default MostrarInfoMateria;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: COLORS.darkBlue,
	},
	content: {
		padding: 16,
	},
	header: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingHorizontal: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.darkBlue,
	},
	title: {
		textAlign: "center",
		fontSize: 24,
		color: COLORS.white,
		fontWeight: "800",
		margin: 15,
	},
	image: {
		width: "100%",
		height: 180,
		borderRadius: 8,
		marginBottom: 12,
	},
	section: {
		fontFamily: "NunitoRegular",
		fontSize: 18,
		color: COLORS.primaryBlue,
		fontWeight: "700",
		marginTop: 8,
		marginBottom: 6,
	},
	text: {
		fontFamily: "NunitoRegular",
		fontSize: 18,
		color: COLORS.white,
		marginTop: 4,
		lineHeight: 20,
		textAlign: "justify",
	},
	enrollButton: {
		marginTop: 20,
		backgroundColor: COLORS.successGreen || "#10B981",
		paddingVertical: 14,
		borderRadius: 10,
		alignItems: "center",
	},
	aprenderButton: {
		backgroundColor: COLORS.primaryBlue || "#2196F3",
	},
	enrollText: {
		color: COLORS.white,
		fontWeight: "700",
		fontSize: 18,
	},
	noData: {
		color: COLORS.white,
	},
});