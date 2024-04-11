import { View } from "react-native";

import { Txt } from "../../components/Txt/Txt";
import { MeteoBasic } from "../../components/MeteoBasic/MeteoBasic";
import { MeteoAdvanced } from "../../components/MeteoAdvanced/MeteoAdvanced";

import { styles } from "./Home.style";
import { getWeatherInterpretation } from "../../utils/weather-utils";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export function Home({ weather, city, onSubmitSearch }) {
  const currentWeather = weather.current_weather;
  const dailyWeather = weather.daily;
  const currentInterpratation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  return (
    <>
      <View style={styles.meteo_basic}>
        <MeteoBasic
          weather={dailyWeather}
          city={city}
          interpretation={currentInterpratation}
          temperature={Math.round(weather.current_weather.temperature)}
        />
      </View>
      <View style={styles.searchbar_container}>
        <SearchBar onSubmit={onSubmitSearch} />
      </View>
      <View style={styles.meteo_advanced}>
        <MeteoAdvanced
          sunrise={dailyWeather.sunrise[0].split("T")[1]}
          sunset={dailyWeather.sunset[0].split("T")[1]}
          windspeed={currentWeather.windspeed}
        />
      </View>
    </>
  );
}
