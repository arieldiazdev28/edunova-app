import { View, StyleSheet } from "react-native";
import Logo from "../components/Logo";

const Header = () => {
    return (
        <View style={styles.header}>
            <Logo fontSize={30}></Logo>
        </View>
    );
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    }
})
export default Header;