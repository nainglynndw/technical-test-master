import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { dataContext } from "../index.js";
import FetchData from "../fetch/FetchData";
import axios from "axios";

const Body = () => {
  const { data, setData } = useContext(dataContext);
  const [image, setImage] = useState();

  const getData = async () => {
    const gg = await FetchData(data);
    setImage(gg);
    setData({ ...data, loading: false });
  };

  // fetch data from server whenever some props are changed
  useEffect(() => {
    getData();
  }, [data.page, data.category]);

  const renderItem = ({ item }) => {
    const downloadImage = async () => {
      const url = item.url;
      await axios({
        method: "GET",
        url: url,
        responseType: "arraybuffer",
      }).then((res) => {
        let blob = new Blob([res.data], { type: "image/jpg" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = item.name + ".jpg";
        link.click();
      });
    };

    return (
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => {
          downloadImage();
        }}
      >
        <Image
          source={{ uri: item.url }}
          style={styles.img}
          resizeMode="contain"
          resizeMethod="scale"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.body}>
      {data.loading ? (
        <View style={styles.modal}>
          <ActivityIndicator
            animating={data.loading}
            size="large"
            color="#000"
          />
          <Text style={styles.load}>Just a blink</Text>
        </View>
      ) : image && image.length > 0 ? (
        // flatlist instead of array map  for performance
        <FlatList
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          numColumns={3}
          data={image}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noData}>No Data Here !</Text>
        </View>
      )}
    </View>
  );
};

export default React.memo(Body);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "absolute",
    backgroundColor: "#eeeeeeaf",
    borderRadius: 20,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    marginHorizontal: 50,
    marginVertical: 10,
    width: 200,
    height: 300,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  load: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  noDataContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noData: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#eeeeee",
  },
});
