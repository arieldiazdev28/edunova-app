import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import api from "../api.js";
import { View, ActivityIndicator } from "react-native";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const checkProfileStatus = async (uid) => {
    try {
      const data = await api.get(`/usuarios/status/${uid}`);

      if (data && data.profile_complete === true) {
        setProfileData(data.profile_data);
        setIsProfileComplete(true);
      } else {
        setProfileData(null);
        setIsProfileComplete(false);
      }
    } catch (error) {
      console.error("Error verificando el perfil: ", error);
      setProfileData(null);
      setIsProfileComplete(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      FIREBASE_AUTH,
      async (firebaseUser) => {
        setUser(firebaseUser);

        if (firebaseUser) {
          await checkProfileStatus(firebaseUser.uid);
        } else {
          setIsProfileComplete(false);
        }

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Función de Logout
  const logout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const value = {
    user,
    loading,
    isProfileComplete,
    profileData,
    setIsProfileComplete,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
