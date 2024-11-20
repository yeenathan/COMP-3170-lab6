import { useState } from 'react'
import './App.css'

const ALL_COUNTRIES = await fetch("https://restcountries.com/v3.1/all").then(resp => resp.json());

function Countries({data}) {
  return(
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem"}}>
      {
        data.map((country) => {
          return <Country country={country}/>
        }) 
      }
    </div>
  )
}

function Country({country}) {
  return(
    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
      <div style={{height: "100%", display: "flex", justifyContent:"center"}}>
        <img style={{maxWidth: "100%", height: "auto", alignSelf: "center"}} src={country.flags.svg}/>
      </div>
      <div style={{marginTop: ".5rem", marginBottom: ".5rem"}}>
        <h2>{country.name.common}</h2>
        <h4>{country.name.official}</h4>
      </div>
      <div>
        <p>Capital: {country.capital && country.capital[0] || "None"}</p>
        <p>Population: {country.population}</p>
        <div style={{display: "flex", flexDirection: "row", gap: ".4rem"}}>
          <p>Continents:</p>
          {country.continents.map((continent) => (<p>{continent}</p>))}
        </div>
        <p>Subregion: {country.subregion || "None"}</p>
        <p>Population: {country.population}</p>
        <p>Area: {country.area}</p>
      </div>
    </div>
  )
}

function App() {
  const [continent, setContinent] = useState("All");
  const [subregion, setSubregion] = useState("All");
  const [data, setData] = useState(ALL_COUNTRIES);

  const [isAlphabetical, setAlphabetical] = useState(false);
  const [population, setPopulation] = useState(false);
  const [area, setArea] = useState(false);

  function handleFilterContinent(e) {
    setSubregion("All")
    setContinent(e.target.value);
    console.log("Continent:", continent);
    if (e.target.value === "All") {
      setData(ALL_COUNTRIES);
      return;
    }
    setData(() => (
      ALL_COUNTRIES.filter((country) => {
        for (let continent of country.continents) {
          return continent === e.target.value;
        }
      })
    ))
  }

  function handleFilterRegion(e) {
    setContinent("All")
    setSubregion(e.target.value);
    console.log("Subregion", e.target.value);
    if (e.target.value === "All") {
      setData(ALL_COUNTRIES);
      return;
    }
    setData(() => (
      ALL_COUNTRIES.filter((country) => {
        return country.subregion === e.target.value;
      })
    ))
  }

  function handleAlphabetical(e) {
    setAlphabetical(e.target.checked);
    setPopulation(false);
    setArea(false);
  }

  function handlePopulation(e) {
    setPopulation(e.target.checked);
    setAlphabetical(false);
    setArea(false);
  }

  function handleArea(e) {
    setArea(e.target.checked);
    setPopulation(false);
    setAlphabetical(false);
  }

  function getData() {
    const _TOP_X_NUMBER = 10;
    if (isAlphabetical) {
      return [...data].sort((a, b) => {
        return a.name.common < b.name.common;
      })
    }
    else if (population) {
      return [...data].sort((a, b) => {
        return a.population < b.population;
      }).slice(0, _TOP_X_NUMBER);
    }
    else if (area) {
      return [...data].sort((a, b) => {
        return a.area < b.area;
      }).slice(0, _TOP_X_NUMBER);
    }
    else {
      return data;
    }
  }
  
  return (
    <div style={{display: "flex", gap: ".8rem", flexDirection: "column"}}>
      <div style={{display: "flex", flexDirection: "row", gap: "2rem"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
          <p style={{marginBottom: ".4rem"}}>Rank by</p>
          <div style={{display: "flex", gap: ".2rem"}}>
            <input type='checkbox' name='alphabetical' checked={isAlphabetical} onChange={handleAlphabetical}/>
            <label htmlFor="alphabetical">Alphabetical (All)</label>
          </div>
          <div style={{display: "flex", gap: ".2rem"}}>
            <input type='checkbox' name='population' checked={population} onChange={handlePopulation}/>
            <label htmlFor="top10">Top 10 Population</label>
          </div>
          <div style={{display: "flex", gap: ".2rem"}}>
            <input type='checkbox' name='area' checked={area} onChange={handleArea}/>
            <label htmlFor="top10">Top 10 Area</label>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start", gap: ".4rem"}}>
          <p>Filters</p>
          <div>
            <select value={continent} onChange={handleFilterContinent}>
              <option value={"All"}>Continent</option>
              <option value={"North America"}>North America</option>
              <option value={"Europe"}>Europe</option>
              <option value={"Asia"}>Asia</option>
              <option value={"Oceania"}>Oceania</option>
              <option value={"South America"}>South America</option>
              <option value={"Africa"}>Africa</option>
              <option value={"Antarctica"}>Antarctica</option>
            </select>

            <select value={subregion} onChange={handleFilterRegion}>
              <option value={"All"}>Subregion</option>
              <option value="Western Africa">Western Africa</option>
              <option value="Eastern Africa">Eastern Africa</option>
              <option value="Southern Africa">Southern Africa</option>
              <option value="Northern Africa">Northern Africa</option>
              <option value="Middle Africa">Middle Africa</option>

              <option value="Eastern Asia">Eastern Asia</option>
              <option value="South-Eastern Asia">South-Eastern Asia</option>
              <option value="Southern Asia">Southern Asia</option>
              <option value="Central Asia">Central Asia</option>
              <option value="Western Asia">Western Asia</option>

              <option value="Western Europe">Western Europe</option>
              <option value="Central Europe">Central Europe</option>
              <option value="Southern Europe">Southern Europe</option>
              <option value="Eastern Europe">Eastern Europe</option>
              <option value="Northern Europe">Northern Europe</option>
              <option value="Southwest Europe">Southwest Europe</option>

              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Central America">Central America</option>

              <option value="Polynesia">Polynesia</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Melanesia">Melanesia</option>
              <option value="Australia and New Zealand">Australia and New Zealand</option>
            </select>
          </div>
          <button onClick={() => {
              setData(ALL_COUNTRIES);
              setContinent("All");
              setSubregion("All");
              setAlphabetical(false);
              setPopulation(false);
              setAlphabetical(false);
            }}>Clear</button>
        </div>
      </div>
      <Countries data={getData()}/>
    </div>
  )
}

export default App
