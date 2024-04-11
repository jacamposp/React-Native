import { View } from "react-native";
import {
  StyledContainer,
  StyledValue,
  styles,
  StyledLabel,
} from "./MeteoAdvanced.style.js";
import { Txt } from "../Txt/Txt.jsx";

export function MeteoAdvanced({ sunrise, sunset, windspeed }) {
  return (
    <View style={styles.container}>
      <StyledContainer>
        <StyledLabel>{sunrise}</StyledLabel>
        <StyledValue>Sunrise</StyledValue>
      </StyledContainer>
      <StyledContainer>
        <StyledLabel>{sunset}</StyledLabel>
        <StyledValue>Sunset</StyledValue>
      </StyledContainer>
      <StyledContainer>
        <StyledLabel>{windspeed} km/h</StyledLabel>
        <StyledValue>Windspeed</StyledValue>
      </StyledContainer>
    </View>
  );
}
