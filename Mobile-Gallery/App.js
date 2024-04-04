import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";

import { styles } from "./App.style";

export default function App() {
  const [imageURIList, setImageURIList] = useState([]);

  async function pickImage() {
    const image = await launchImageLibraryAsync();
    if (image.canceled) {
      alert("No image selected");
    } else {
      setImageURIList([...imageURIList, image.assets[0].uri]);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>My favorite pictures</Text>
        <View style={styles.body}>
          <ScrollView>
            {imageURIList.map((uri, i) => (
              <Image style={styles.image} key={uri + i} source={{ uri }} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Text style={styles.btnTxt}>Add picture</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
