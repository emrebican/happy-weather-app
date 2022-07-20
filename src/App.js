import Search from "./Components/search/Search";
import CurrentWeather from "./Components/current-weather/CurrentWeather";
import WeekWeather from "./Components/weekly-weather/WeekWeather";

import { WeatherProvider } from "./Context/WeatherContext";

function App() {

  return (
    <div className="container">
      <WeatherProvider>
        <Search />
        <CurrentWeather />
        <WeekWeather />
      </WeatherProvider>
    </div>
  );
}

export default App;
