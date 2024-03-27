import { Text, TouchableOpacity } from "react-native";
import { styles } from "./ButtonAdd.style";

export function ButtonAdd({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.txt}>+ New Todo</Text>
    </TouchableOpacity>
  );
}
