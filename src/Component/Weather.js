import React, { useState } from 'react'
import find from "../Assets/search.png"
import cloud from "../Assets/cloud.png"
import "./Weather.css";
import humidity from "../Assets/humidity.png"
import wind from "../Assets/wind.png"
//import cloud from "../Assets/cloud.png"
import clear from "../Assets/clear.png"
import drizzle from "../Assets/drizzle.png"
import snow from "../Assets/snow.png"
import rain from "../Assets/rain.png"

function Weather() {

    const[wicon, setWicon] =useState(cloud);

    let api_key = "08ac05eb3be07f1fd1dce2ecb23664b2"
    
    const search = async () => {

        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "") {
            alert('Enter the City Name')
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

        let response = await fetch(url)
        let data = await response.json();
        const humidity =document.getElementsByClassName("humidity-percent")
        const wind =document.getElementsByClassName("wind-rate")
        const temperature =document.getElementsByClassName("weather-temp")
        const location =document.getElementsByClassName("weather-location")
         
        humidity[0].innerHTML=data.main.humidity +" % " ;
        wind[0].innerHTML=data.wind.speed +"km/hr";
        temperature[0].innerHTML=data.main.temp + "°c";
        location[0].innerHTML=data.name;

        if(data.weather[0].icon==="01d" ||data.weather[0].icon==="01n")
        {
            setWicon(clear);
        }
        else if (data.weather[0].icon==="02d" ||data.weather[0].icon==="02n")  
        {
             setWicon(cloud);
        }
        else if (data.weather[0].icon==="03d" ||data.weather[0].icon==="03n")  
        {
             setWicon(drizzle);
        }
        else if (data.weather[0].icon==="09d" ||data.weather[0].icon==="09n")  
        {
             setWicon(rain);
        }
        else if (data.weather[0].icon==="13d" ||data.weather[0].icon==="03n")  
        {
             setWicon(snow);
        }
         
        else 
        {
            setWicon(clear)
        }
    }


    return (
        <div className='container'>
            <div className='search-bar'>
                <input type='text' className='cityInput' placeholder='Search for cities' />

                <div className='search-icon' onClick={() => { search() }} >
                    <img src={find} alt='' />
                </div>
            </div>
            <div className='weather-image'>
                <img src={wicon} alt='' />
            </div>
            <div className='weather-temp'>24 ℃</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img className='icon' src={humidity} alt='' />
                    <div className='data'>
                        <div className='humidity-percent'>64</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img className='icon' src={wind} alt='' />
                    <div className='data'>
                        <div className='wind-rate'>18 km/hour</div>
                        <div className='text'>Wind speed</div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Weather