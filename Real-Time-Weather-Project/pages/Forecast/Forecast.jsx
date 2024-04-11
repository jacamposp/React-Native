import { styles } from "./Forecast.style.js";
import { Txt } from "../../components/Txt/Txt.jsx";
import { useRoute } from "@react-navigation/native";
import { Header } from "../../components/Header/Header.jsx";
import { ForecastListItem } from "../../components/ForecastListItem/ForecastListItem.jsx";
import { View } from "react-native";
import { DAYS, getWeatherInterpretation } from "../../utils/weather-utils.js";

export function Forecast({}) {
  const { params } = useRoute();

  const forecastList = (
    <View style={{ marginTop: 50 }}>
      {params.time.map((time, index) => {
        const weathercode = params.weathercode[index];
        const image = getWeatherInterpretation(weathercode).image;
        const temperature = params.temperature_2m_max[index];
        const date = new Date(time);
        const dayOfTheWeek = DAYS[date.getDay()];
        const formatedDate = date.toLocaleDateString("default", {
          day: "numeric",
          month: "numeric",
        });

        return (
          <ForecastListItem
            key={time}
            image={image}
            day={dayOfTheWeek}
            date={formatedDate}
            temperature={temperature.toFixed(0)}
          />
        );
      })}
    </View>
  );

  return (
    <>
      <Header city={params.city} />
      {/* <ForecastListItem
        image={require("../../assets/clouds.png")}
        day={"MON"}
        date={"03/11"}
        temperature={3}
      /> */}
      {forecastList}
    </>
  );
}
