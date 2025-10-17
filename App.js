//Importando hooks, componentes nativos de React y recursos
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
//Importando librerías para la navegación
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider, useAuth } from "./context/AuthContext";

//Importando componentes personalizados
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import CatalogoMaterias from "./screens/CatalogoMaterias";
import MateriasInscritas from "./screens/MateriasInscritas";
import MateriasAprobadas from "./screens/MateriasAprobadas";
import CompletePerfil from "./screens/CompletePerfil";
import CustomDrawer from "./components/CustomDrawer";
import MostrarInfoMateria from "./screens/MostrarInfoMateria";
import ContenidoMateria from "./screens/ContenidoMateria";
import Logo from "./components/Logo";
import { COLORS } from "./styles";
import DetalleClase from "./screens/DetalleClase";

const AppStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

/* Función que renderiza la pantalla de bienvenida y configura
  la navegación a las pantallas de Login y Sign Up
*/
function AuthLayout() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="CompletePerfil"
        component={CompletePerfil}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
}

/* Función que configura la navegación al Dashboard con menú personalizado */
function InsideLayout() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("Dashboard");
  const navigationRef = React.useRef(null);

  return (
    <>
      <InsideStack.Navigator
        screenOptions={({ navigation, route }) => {
          // Guardar la referencia de navegación
          navigationRef.current = navigation;
          return {}; // <- IMPORTANTE: devolver un objeto válido
        }}
      >
        <InsideStack.Screen
          name="Dashboard"
          options={{ headerShown: false }}>
          {(props) => (
            <Dashboard
              {...props}
              openDrawer={() => setDrawerVisible(true)}
              setCurrentScreen={setCurrentScreen}
            />
          )}
        </InsideStack.Screen>
        <InsideStack.Screen
          name="CatalogoMaterias"
          options={{ headerShown: false }}>
          {(props) => (
            <CatalogoMaterias
              {...props}
              openDrawer={() => setDrawerVisible(true)}
            />
          )}
        </InsideStack.Screen>
        <InsideStack.Screen
          name="MateriasAprobadas"
          options={{ headerShown: false }}>
          {(props) => (
            <MateriasAprobadas
              {...props}
              openDrawer={() => setDrawerVisible(true)}
            />
          )}
        </InsideStack.Screen>

        <InsideStack.Screen
          name="MateriasInscritas"
          component={MateriasInscritas}
          options={{ headerShown: true }}
        />
        <InsideStack.Screen
          name="MostrarInfoMateria"
          options={{ headerShown: false }}>
          {(props) => (
            <MostrarInfoMateria
              {...props}
              openDrawer={() => setDrawerVisible(true)}
            />
          )}
        </InsideStack.Screen>
        <InsideStack.Screen
          name="ContenidoMateria"
          component={ContenidoMateria}
          options={{ headerShown: false }}
        />
        <InsideStack.Screen
          name="DetalleClase"
          component={DetalleClase}
          options={{ headerShown: false }}
        />

      </InsideStack.Navigator>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigationRef.current}
        currentScreen={currentScreen}
      />
    </>
  );
}

function RootNavigator() {
  const { user, loading, isProfileComplete } = useAuth();
  //Importando fuentes desde la carpeta fonts
  const [fontsLoaded] = useFonts({
    // Fuente: Montserrat
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    //Fuente: Nunito
    NunitoBold: require("./assets/fonts/Nunito-Bold.ttf"),
    NunitoSemiBold: require("./assets/fonts/Nunito-SemiBold.ttf"),
    NunitoMedium: require("./assets/fonts/Nunito-Medium.ttf"),
    NunitoRegular: require("./assets/fonts/Nunito-Regular.ttf"),
  });

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AppStack.Navigator>
      {user && isProfileComplete ? (
        <AppStack.Screen
          name="InsideLayout"
          component={InsideLayout}
          options={{ headerShown: false }}
        />
      ) : user && !isProfileComplete ? (
        <AppStack.Screen
          name="AuthLayout"
          component={AuthLayout}
          options={{
            headerShown: false,
            initialParams: { screen: "CompletePerfil" },
          }}
        />
      ) : (
        <AppStack.Screen
          name="AuthLayout"
          component={AuthLayout}
          options={{ headerShown: false }}
        />
      )}
    </AppStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    marginLeft: 15,
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
