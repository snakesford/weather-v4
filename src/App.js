import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const suggestion = 'Pants and a winter coat'

  const fetchWeather = async () => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=45.575&longitude=-122.851&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=1&timezone=America%2FLos_Angeles'
    const res = await fetch(url)
    const searchData = await res.json()
    console.log(searchData);
    setCurrentWeather(searchData)
    console.log('here');
  }

  useEffect(() => {
    if (currentWeather) {
      console.log(currentWeather.hourly.temperature_2m[0])
    }
  }, [currentWeather]);

  useEffect(() => {

    fetchWeather()

  }, []);
  // enter your name to store your info.
  // enter the clothes you posses so the program can tell you what to do. 
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchWeather}>fetch weather</button>
        <p>Weather: {currentWeather?.hourly?.temperature_2m?.[0] ?? "Loading..."}</p>
        

        <label htmlFor="custom-select">Would you rather be more:</label>
        <div className="custom-select" style={{width: "200px"}}>
          <select>
            <option value="1">Hot</option>
            <option value="2">Cold</option>
          </select>
        </div>

        <p>Based off you selection we suggest: {suggestion }</p>
        
      </header>
    </div>
  );
}

export default App;
