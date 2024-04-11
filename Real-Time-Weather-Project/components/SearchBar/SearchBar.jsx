import { TextInput } from "react-native";
import { styles } from "./SearchBar.style.js";

export function SearchBar({ onSubmit }) {
  return (
    <TextInput
      onSubmitEditing={(e) => onSubmit(e.nativeEvent.text)}
      style={styles.input}
      placeholder="Type a city... Ex: Madrid"
    />
  );
}
