import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion"
import { useWeather } from "../../Context/WeatherContext"
import './weekly-weather.css'
import React, { useState, useEffect } from "react";

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function WeekWeather() {

  const { week } = useWeather();
  const [view, setView] = useState(false)

  const dayInAWeek = new Date().getDay();
  const forecastDays = weekDays.slice(dayInAWeek, weekDays.length).concat(weekDays.slice(0, dayInAWeek));

  useEffect(() => {
    if (week.list) {
      setTimeout(() => {
        setView(true)
      }, 1000)
    }
    setView(false)
  }, [week])

  console.log("week: ", week)

  return (
    view &&
    (
      <div>
        <label className="title">Daily</label>
        <Accordion allowZeroExpanded>
          {week.list.splice(0, 7).map((item, index) => (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      className="icon-small"
                      alt="weather" />
                    <label className="day">
                      {forecastDays[index]}
                    </label>
                    <label
                      className="description">
                      {item.weather[0].description}
                    </label>
                    <label
                      className="min-max">
                      {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-item">
                    <label>Feels like</label>
                    <label>{Math.round(item.main.feels_like)}°C</label>
                  </div>
                  <div className="daily-details-item">
                    <label>Wind Speed</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-item">
                    <label>Pressure</label>
                    <label>{item.pressure} hPa</label>
                  </div>
                  <div className="daily-details-item">
                    <label>Humidity</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-item">
                    <label>Clouds</label>
                    <label>{item.clouds.all}</label>
                  </div>
                  <div className="daily-details-item">
                    <label>Sea level</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>

          ))}
        </Accordion>
      </div>
    )
  )
}

export default React.memo(WeekWeather);
