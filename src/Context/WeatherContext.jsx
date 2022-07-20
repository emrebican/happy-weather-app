import { createContext, useState, useContext } from "react";
import axios from 'axios';
import {
    GEO_API_URL,
    geoApiOptions,
    WEATHER_API_URL,
    WEATHER_API_KEY
} from '../Components/api';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {

    // Search State
    const [search, setSearch] = useState(null);
    // Weather States
    const [currentWeather, setCurrentWeather] = useState([]);
    const [weekWeather, setWeekWeather] = useState([]);

    // Fetch City Lat & Lon
    const loadOptions = (inputValue) => {
        return axios(`${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => {
                return {
                    options: response.data.data.map(city => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.country} / ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(error => console.log(error));
    }

    // Fetch Weather
    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        // Current Weather
        axios(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
            .then(res => setCurrentWeather({ city: searchData.label, ...res.data }))

        // Week Weather
        axios(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
            .then(res => setWeekWeather({ city: searchData.label, ...res.data }))
    }

    const values = {
        search,
        setSearch,
        loadOptions,
        handleOnSearchChange,
        current: currentWeather,
        week: weekWeather
    }

    return (
        <WeatherContext.Provider value={values}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => useContext(WeatherContext);