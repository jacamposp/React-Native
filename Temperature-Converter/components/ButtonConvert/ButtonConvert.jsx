import { Text, TouchableOpacity } from "react-native";
import { styles } from "./ButtonConvert.style";
export function ButtonConvert({ unit, onPress }) {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonTxt}>Convert to {unit}</Text>
      </TouchableOpacity>
    </>
  );
}
