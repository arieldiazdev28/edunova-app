import { View, FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import { COLORS } from "../styles.js";

const Carousel = ({ items, keyField }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item[keyField]}
        renderItem={({ item }) => <Card subject={item} />}
        contentContainerStyle={styles.subjectCarousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    marginBottom: 10,
  },
  subjectCarousel: {
    paddingHorizontal: 10,
  },
});

export default Carousel;
