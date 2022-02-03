import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { dataContext } from "../index.js";

const Navbar = (props) => {
  const name = ["Nature", "Architecture", "Fashion"];

  const { data, setData } = useContext(dataContext);
  const chose = (category, i) => {
    setData({ page: 1, category: category, loading: true });
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>Photo Sharing App</Text>

      {/* Array Map Function for render multiple component and onPress => change color */}
      {name.map((category, i) => (
        <TouchableOpacity
          style={[styles.link]}
          key={i}
          onPress={() => {
            chose(category, i);
          }}
        >
          <Text
            style={[
              styles.linkText,
              { color: data.category === category ? "#ffffff" : "#ffffff5f" },
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default React.memo(Navbar);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
  },
  title: {
    marginRight: 20,
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  link: {
    marginHorizontal: 20,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
