import React, { useRef, useEffect } from 'react';
import { Animated, Text, TouchableOpacity, Dimensions, StyleSheet, View, Image } from 'react-native';
import Logo from './Logo';

const { width } = Dimensions.get('window');

const subjects = ['Inicio', 'Catálogo', 'Materias inscritas', 'Materias aprobadas', 'Cerrar sesión'];

const OffcanvasMenu = ({ visible, onClose, onNavigate }) => {
    const slideAnim = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <>
            {visible && (
                <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1} />
            )}

            <Animated.View
                style={[
                    styles.menuContainer,
                    { transform: [{ translateX: slideAnim }] },
                ]}
            >
                <View style={styles.offcanvasHeader}>
                    <Text style={styles.menuTitle}>
                        <Logo />
                    </Text>
                    <TouchableOpacity onPress={onClose}>
                        <Image style={styles.closeButton} source={require("../assets/close.png")} />
                    </TouchableOpacity>
                </View>

                {subjects.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => {
                            onNavigate(item);
                            onClose();
                        }}
                    >
                        <View style={styles.offcanvasItem}>
                            <Text style={styles.menuText}>
                                {item}
                            </Text>
                            <Image style={styles.nextArrowButton} source={require("../assets/nextArrow.png")}></Image>
                        </View>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 1
    },
    menuContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: width * 0.7,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
        zIndex: 2,
        elevation: 10,
    },
    offcanvasHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    offcanvasItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    menuTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    menuText: {
        fontSize: 18,
        fontFamily: "Nunito"
    },
    closeButton: {
        height: 25,
        width: 25,
    },
    nextArrowButton: {
        height: 15,
        width: 15,
    }
});

export default OffcanvasMenu;