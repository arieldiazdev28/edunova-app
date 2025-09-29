import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../styles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "../components/Logo";
import Divider from "../components/Divider.jsx";

const Footer = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Divider />
            <View style={styles.footer}>
                <Logo fontColor={COLORS.white}/>
            </View>
            <View styles={styles.footerView}>
                <Text style={styles.footerTextOne}>Educación de calidad, accesible y gratuita para formar a profesionales del mañana</Text>
                <Text style={styles.footerTextTwo}>© Todos los derechos reservados</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    footer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    footerTextOne: {
        color: COLORS.white,
        textAlign: "center",
        margin: 20,
        fontFamily: "NunitoRegular"
    },
    footerTextTwo: {
        color: COLORS.white,
        textAlign: "center",
        marginBottom: 40,
        fontSize: 12,
        fontStyle: "italic",
        fontFamily: "NunitoRegular"
    }
});
export default Footer;