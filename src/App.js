import { useEffect, useState, useRef } from "react";
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [suggestion, setSuggestion] = useState("A thick jacket and gloves");
  let isFetched = useRef(false);

  const fetchWeather = async () => {
    try {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=45.575&longitude=-122.851&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=1&timezone=America%2FLos_Angeles'
      const res = await fetch(url)
      const searchData = await res.json()
      console.log(searchData);
      setCurrentWeather(searchData)
      console.log('here');
    } catch(error) {
      console.log('eeehh, problem on line something above me!');
    }
  }

  useEffect(() => {
    if (currentWeather) {
      console.log(currentWeather.hourly.temperature_2m[0])
    }
  }, [currentWeather]);

  useEffect(() => {
    if(isFetched.current === false) {
      fetchWeather()
      console.log('fetched weather');
      isFetched.current = true
    } else {
      console.log('already fetched weather');
    }
  }, []);

  const handlePreferenceChange = (event) => {
    const value = event.target.value;

    if (value === "1") {
      setSuggestion("A thick jacket and gloves");
    } else if (value === "2") {
      setSuggestion("Light clothing and sunglasses");
    }
  };

  // enter your name to store your info.
  // enter the clothes you posses so the program can tell you what to do. 
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchWeather}>Refresh weather</button>
        <p>Weather: {currentWeather?.hourly?.temperature_2m?.[0] ?? "Loading..."}</p>
        <div>
          <p>Tell us what clothes you have:</p>
          <div>
            <input type="checkbox" id="Winter-coat" name="Winter coat" value="Winter coat" />
            <label htmlFor="Winter-coat">Winter coat</label><br/>
            <input type="checkbox" id="Jacket" name="Jacket" value="Jacket" />
            <label htmlFor="Jacket">Jacket</label><br/>
          </div>
              {/* select optiuons and give them data that identifies them as 1st layer/coat/shirt ect. */}
          {/* Coat slot
              pants slot
              shirt slot
              1st layer?
              2ndlayer?
              3rd layer? */}
        </div>

        <label htmlFor="custom-select">Would you rather be more:</label>
        <div className="custom-select" style={{width: "200px"}}>
          <select onChange={handlePreferenceChange}>
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
