import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useWeather } from "../../Context/WeatherContext";

function Search() {

    const {
        search,
        setSearch,
        loadOptions,
        handleOnSearchChange
    } = useWeather();

    // Mode
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light')

    // Change Input Search
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        handleOnSearchChange(searchData);
    }

    // Mode
    const handleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }
    document.body.style.backgroundColor = mode === 'light' ? '#dadada' : '#4b4b4b'

    useEffect(() => {
        localStorage.setItem('mode', mode);
    }, [mode])

    // inputValue === e.target.value
    // searchData === search

    return (
        <div>
            <div
                className={`mode ${mode === 'light' && 'bg-active'}`}
                onClick={handleMode}
            >
                <div className={`btn ${mode === 'light' && 'active'}`}></div>
            </div>
            <AsyncPaginate
                placeholder="Search for city"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
            />
        </div>
    )
}

export default React.memo(Search);