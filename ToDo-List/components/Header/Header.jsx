import { Image, Text } from "react-native";
import { styles } from "./Header.style";
import logo from "../../assets/logo.png";
export function Header() {
  return (
    <>
      <Image style={styles.img} source={logo} resizeMode={"contain"} />
      <Text style={styles.subtitle}>You probably have something to do</Text>
    </>
  );
}
