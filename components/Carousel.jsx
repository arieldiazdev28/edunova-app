import { View, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import { COLORS } from "../styles.js";


//Array de prueba
const subjects = [
    { id: "1", title: "Álgebra Lineal", image: require("../assets/science.png") },
    { id: "2", title: "Matemáticas", image: require("../assets/math.png") },
];
const SubjectsCarousel = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={subjects}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Card
                        subjectName={item.title}
                        imageSource={item.image}
                    />
                )}
                contentContainerStyle={styles.subjectCarousel}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 10,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25
    },
    subjectCarousel: {
        paddingHorizontal: 10
    }
});

export default SubjectsCarousel;