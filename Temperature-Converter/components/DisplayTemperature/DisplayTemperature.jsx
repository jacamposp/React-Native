import { Text, TextInput, View } from "react-native";
import { styles } from "./DisplayTemperature.style";

export function DisplayTemperature({ temperature, unit }) {
  return (
    <>
      <Text style={styles.temperatureText}>
        {temperature} {unit}
      </Text>
    </>
  );
}
