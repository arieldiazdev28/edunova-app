import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Logo from "../components/Logo";

const Header = ({onMenuPress}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onMenuPress}>
                <Image style={styles.optionsImage} source={require("../assets/bars.png")}></Image>
            </TouchableOpacity>
            <View style={styles.header}>
                <Logo fontSize={35}></Logo>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 30
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    optionsImage: {
        height: 15,
        width: 24,
        marginLeft: 20,
    }
})
export default Header;