import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import ImageViewer from "./components/ImageViewer/ImageViewer";
import Button from "./components/Button/Button";
import IconButton from "./components/Button/IconButton";
import CircleButton from "./components/Button/CircleButton";
import EmojiPicker from "./components/Emoji/EmojiPicker";
import EmojiList from "./components/Emoji/EmojiList";
import EmojiSticker from "./components/Emoji/EmojiSticker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  // Select Image
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

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
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = async () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {};

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
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
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>

        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
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
