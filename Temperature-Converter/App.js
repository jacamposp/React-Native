import { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";

import { TextInputComponent } from "./components/TextInputComponent/TextInputComponent";
import { DisplayTemperature } from "./components/DisplayTemperature/DisplayTemperature";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert";

import {
  UNITS,
  convertTemperatureTo,
  getOppositeUnit,
  isIceTemperature,
} from "./utils/temperature";

import { styles } from "./App.style";

import hotBG from "./assets/hot.png";
import coldBG from "./assets/cold.png";

export default function App() {
  const [inputValue, setInputValue] = useState(0);
  const [currentUnit, setCurrentUnit] = useState("°C");
  const [currentBackground, setCurrentBackground] = useState(coldBG);
  const oppositeUnit = getOppositeUnit(currentUnit);

  useEffect(() => {
    const isCold = isIceTemperature(inputValue, currentUnit);
    setCurrentBackground(isCold ? coldBG : hotBG);
  }, [inputValue, currentUnit]);

  return (
    <ImageBackground style={styles.backgroundImg} source={currentBackground}>
      <SafeAreaView style={styles.root}>
        <View style={styles.workspace}>
          <DisplayTemperature
            unit={oppositeUnit}
            temperature={convertTemperatureTo(inputValue, oppositeUnit).toFixed(
              1
            )}
          />
          <TextInputComponent
            unit={currentUnit}
            onChange={setInputValue}
            defaultValue={0}
          />
          <ButtonConvert
            onPress={() => {
              setCurrentUnit(oppositeUnit);
            }}
            unit={currentUnit}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
