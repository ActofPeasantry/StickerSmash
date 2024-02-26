import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, Text } from "react-native";

import ImageViewer from "./components/ImageViewer/ImageViewer";
import Button from "./components/Button/Button";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  let x = 1;
  console.log("app executed");
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
