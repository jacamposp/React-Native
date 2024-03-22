import { Text, TextInput, View } from "react-native";
import { styles } from "./TextInputComponent.style";

export function TextInputComponent({ defaultValue, onChange, unit }) {
  return (
    <>
      <View style={styles.root}>
        <TextInput
          style={styles.input}
          maxLength={4}
          keyboardType="numeric"
          placeholder="Type your temperature"
          defaultValue={defaultValue.toString()}
          onChangeText={(text) => {
            onChange(text);
          }}
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </>
  );
}
