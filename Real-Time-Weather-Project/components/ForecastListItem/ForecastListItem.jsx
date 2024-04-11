import { Image, View } from "react-native";
import { Txt } from "../Txt/Txt.jsx";
import { styles } from "./ForecastListItem.style.js";

export function ForecastListItem({ image, day, date, temperature }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Txt style={styles.day}>{day}</Txt>
      <Txt style={styles.date}>{date}</Txt>
      <Txt style={styles.temperature}>{temperature}°</Txt>
    </View>
  );
}
