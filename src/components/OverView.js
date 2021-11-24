import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudIcon from "@mui/icons-material/Cloud";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import CloudQueueOutlinedIcon from "@mui/icons-material/CloudQueueOutlined";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Footer from "./Footer";
import HeaderImg from "../assets/images/weatherAppHeader.png";

const OverView = (cityWeather) => {
  const history = useHistory();
  const city = cityWeather.history.location.state.city;
  console.log(city);
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const goTo = (cityWeather) => {
    history.push("./");
  };

  return (
    <div>
      <div className="appBody"></div>
      <img className="headerImg" src={HeaderImg} />

      <div className="appTitle">
        <CloudIcon className="appTitleIcon" />
        Weather App
      </div>
      <div className="OverViewWeatherCard">
        <div className="OverViewCard-Body">
          <div
            className="overViewCard-top"
            style={{ backgroundColor: `${getRandomColor()}` }}
          >
            <div id="backIcon">
              {" "}
              <ArrowBackIcon id="backIcon" onClick={() => goTo()} />
            </div>
            <div className="country">
              {city.name}, {city.sys.country}
            </div>
            <div className="dateTime">
              {moment().format("LT")}, {moment().format("ll").split(",", 1)}
            </div>

            <div className="overViewCard-Flex">
              <div className="description-OvFlex">
                <CloudQueueOutlinedIcon className="descIconOv" />
                <div className="description-Ov">
                  {city.weather[0].description}
                </div>
              </div>

              <div class="vl"></div>

              <div className="overViewCardFlex-Left">
                <div className="temp-OV">
                  {Math.round(city.main.temp)}&deg;C
                </div>
                <div className="temp_min-OV">
                  Temp Min: {Math.round(city.main.temp_min)}&deg;C
                </div>
                <div className="temp_max-OV">
                  Temp Max: {Math.round(city.main.temp_max)}&deg;C
                </div>
              </div>
            </div>
          </div>

          <div className="overViewCard-bottom">
            <div>
              <div>
                Pressure -
                <font className="cardBottomBody">{city.main.pressure}hPa</font>
              </div>
              <div>
                Humidity -
                <font className="cardBottomBody">{city.main.humidity}%</font>
              </div>
              <div>
                Visibility -{" "}
                <font className="cardBottomBody">
                  {city.visibility / 1000}km
                </font>
              </div>
            </div>
            <div class="vl2"></div>
            <div className="windDetails">
              <NavigationOutlinedIcon className="navIcon" />
              <div>
                {city.wind.speed}m/s {city.wind.deg} Degree{" "}
              </div>
            </div>
            <div class="vl2"></div>
            <div>
              <div>
                Sunrise-
                <font className="cardBottomBody">
                  {new Date(city.sys.sunrise * 1000).toLocaleTimeString(
                    "en-IN"
                  )}
                </font>
              </div>
              <div>
                Sunset-
                <font className="cardBottomBody">
                  {new Date(city.sys.sunset * 1000).toLocaleTimeString("en-IN")}
                </font>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};
export default OverView;
