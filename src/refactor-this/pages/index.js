import { StyleSheet, View } from "react-native";
import React, { createContext, useState } from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Footer from "./components/Footer";

export const dataContext = createContext();

const index = (props) => {
  const [data, setData] = useState({
    page: 1,
    category: "Nature",
    loading: true,
  });

  return (
    <dataContext.Provider value={{ data, setData }}>
      <View style={styles.container}>
        {/* Navbar Component */}
        <Navbar />

        {/* Body Component */}
        <Body />

        {/* Footer Componnet */}
        <Footer />
      </View>
    </dataContext.Provider>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#121212",
  },
});
