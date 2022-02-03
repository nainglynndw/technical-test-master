import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { dataContext } from "../index.js";

const Footer = () => {
  const { data, setData } = useContext(dataContext);

  const pageUp = () => {
    setData({ ...data, page: data.page + 1, loading: true });
  };

  const pageDown = () => {
    if (data.page !== 1) {
      setData({ ...data, page: data.page - 1, loading: true });
    } else {
      alert("No More Data on Left Page");
    }
  };

  return (
    <View style={styles.footer}>
      {/* burron for page number decrement */}
      <TouchableOpacity
        style={styles.chevronContainer}
        onPress={() => {
          pageDown();
        }}
      >
        <Text style={styles.chevron}>{"<"}</Text>
      </TouchableOpacity>

      {/* burron for page number increment */}
      <TouchableOpacity
        style={styles.chevronContainer}
        onPress={() => {
          pageUp();
        }}
      >
        <Text style={styles.chevron}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  chevron: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
});
