import { Text, useWindowDimensions } from "react-native";
import { styles } from "./Txt.style";

const IPHONE_11_RATIO = 0.0011160714285714285;

export function Txt({ children, style, ...restProps }) {
  const fontSize = style?.fontSize || styles.txt.fontSize;
  const { height } = useWindowDimensions();
  return (
    <Text
      style={[
        styles.txt,
        style,
        { fontSize: Math.round(fontSize * IPHONE_11_RATIO * height) }, // make font responsive
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
}
