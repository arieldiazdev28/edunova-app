//Importando hooks, componentes nativos de React y recursos
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
//Importando librerías para la navegación
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Importando conexión a Firebase
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import { AuthProvider, useAuth } from "./context/AuthContext";

//Importando componentes personalizados
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Dashboard from "./screens/Dashboard";
import CatalogoMaterias from "./screens/CatalogoMaterias";
import CompletePerfil from "./screens/CompletePerfil";

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

/* Función que configura la navegación al Dashboard */
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="CatalogoMaterias"
        component={CatalogoMaterias}
      />
    </InsideStack.Navigator>
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

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
