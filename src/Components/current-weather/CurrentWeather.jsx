import './current-weather.css';
import React, { useState, useEffect } from 'react';
import { useWeather } from '../../Context/WeatherContext';
import Loading from '../loading/Loading';
import image from './image/weather_image.png'

const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
const dayInAWeek = new Date().getDay();

function CurrentWeather() {

    const { current } = useWeather();

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 700)
        setLoading(true)
    }, [current])

    const day = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    console.log(current)

    return (
        current.city ?
            loading ?
                <div className='current-weather'>
                    <div className='loading-container'>
                        <Loading />
                    </div>
                </div> :
                (
                    <div className='current-weather'>
                        <div className='top'>
                            <div>
                                <h2 className='city'>{current.city.slice(0, current.city.indexOf(String.fromCharCode(44)))}</h2>
                                <small className='city'>{current.city.slice(current.city.indexOf(String.fromCharCode(44)) + 1)}</small>
                                <p className='description'>{current.weather[0].description}</p>
                            </div>
                            <img
                                src={`icons/${current.weather[0].icon}.png`}
                                alt="weather"
                                className='weather-icon' />
                        </div>
                        <div className='bottom'>
                            <div className='details'>
                                <div className='parameter-row-details'>
                                    <span className='parameter-label detail'>Details</span>
                                    <hr />
                                </div>
                                <div className='parameter-row'>
                                    <span className='parameter-label'>Feels like</span>
                                    <span className='parameter-value'>{Math.round(current.main.feels_like)}°C</span>
                                </div>
                                <div className='parameter-row'>
                                    <span className='parameter-label'>Wind</span>
                                    <span className='parameter-value'>{current.wind.speed} m/s</span>
                                </div>
                                <div className='parameter-row'>
                                    <span className='parameter-label'>Humidity</span>
                                    <span className='parameter-value'>{current.main.humidity}%</span>
                                </div>
                                <div className='parameter-row'>
                                    <span className='parameter-label'>Pressure</span>
                                    <span className='parameter-value'>{current.main.pressure} hPa</span>
                                </div>
                            </div>
                            <div className='date-container'>
                                <p className='temprature'>{Math.round(current.main.temp)}°C</p>
                                <div>
                                    <small className='date'>{month} / {day} / {year}</small>
                                    <br />
                                    <small className='date'>{weekDays[dayInAWeek - 1]}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            :
            <div className='current-weather'>
                <div className='no-search'>
                    <div className='top-content'>
                        <span>
                            <h1><small>Welcome to</small> Happy Weather</h1>
                            <hr />
                        </span>
                        <h2>Please search a city...</h2>
                        <img className='main-image' src={image} alt="" />
                    </div>
                    <div className='bottom-content'>
                        <p>This app is powered by</p>
                        <h3>React</h3>
                    </div>
                </div>
            </div>
    )
}

export default React.memo(CurrentWeather);