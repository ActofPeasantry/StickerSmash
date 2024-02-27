import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ImageViewer from "./components/ImageViewer/ImageViewer";
import Button from "./components/Button/Button";
import IconButton from "./components/Button/IconButton";
import CircleButton from "./components/Button/CircleButton";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  // Select Image
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    !result.canceled
      ? (() => {
          setSelectedImage(result.assets[0].uri);
          setShowAppOptions(true);
        })()
      : alert("You did not select any image");
  };

  const onReset = () => {
    setSelectedImage(null), setShowAppOptions(false);
  };
  const onAddSticker = () => {
    // we will implement this later
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton iconName="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              iconName="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => {
              setShowAppOptions(true);
            }}
          />
        </View>
      )}

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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
