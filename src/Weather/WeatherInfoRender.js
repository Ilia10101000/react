import React, {useState, useEffect} from 'react';
import WeatherInfo from './WeatherInfo';
import './css.css'

const API_KEY = process.env.REACT_APP_API_KEY_WEATHER;

let style = {
    mainDiv:{
    width: '90%',
    margin: '0 auto 10px auto',
    borderRadius: '10px', 
    padding: '10px', 
    color: 'white'
    },
    dataName:{
        marginBottom:'7px', 
        fontSize: '18px', 
        fontWeight: 'bold',
        textAlign: 'center'
    },
    nameInputDiv: {
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '7x'
    }
};
    

export default function WeatherInfoRender(){
    
    const [data, setData] = useState({
        name: undefined,
        temp:undefined,
        feelsLike: undefined,
        tempMax: undefined,
        tempMin: undefined,
        sunRise: undefined,
        sunSet: undefined,
        wind: undefined,
        pressure: undefined,
        humidity: undefined
    });

    async function getWeatherData(event){
        event.preventDefault()
   
        try{
        const city = event.target.elements.city.value;

        const fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${API_KEY}&units=metric`);
        
        const jsonData = await fetchData.json();
        
        setData({
            name: jsonData.name,
            temp:jsonData.main.temp,
            feelsLike: jsonData.main.feels_like,
            tempMax: jsonData.main.temp_max,
            tempMin: jsonData.main.temp_min,
            wind: jsonData.wind,
            sunRise: jsonData.sys.sunrise,
            sunSet: jsonData.sys.sunset,
            pressure: jsonData.main.pressure,
            humidity: jsonData.main.humidity
        })
    } catch (e){
        console.log(e.message)
    }
}; 
   
    useEffect(
        () => {
            async function f(){
    
                const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kiev&&appid=${API_KEY}&units=metric`);
                
                const jsonData = await data.json();
                setData({
                    name: jsonData.name,
                    temp:jsonData.main.temp,
                    feelsLike: jsonData.main.feels_like,
                    tempMax: jsonData.main.temp_max,
                    tempMin: jsonData.main.temp_min,
                    wind: jsonData.wind,
                    sunRise: jsonData.sys.sunrise,
                    sunSet: jsonData.sys.sunset,
                    pressure: jsonData.main.pressure,
                    humidity: jsonData.main.humidity
                })
            };
            f()
    
        }
        ,[])

    return <div className='mainDiv' style={style.mainDiv}>

             <div style={style.nameInputDiv}>
                {data.name?<div style={style.dataName}>Weather in {data.name} today</div>:<p>Check your internet connection!</p>}
                    
                    <div>
                        <form className='formInput' style={{display: 'flex'}} onSubmit={ (event) => getWeatherData(event)}>
                        <input className='inputText' type='text' placeholder='Type a city name...' name='city'/>
                        <input className='inputSubmit' type='submit' value='Find'/>
                        </form>
                    </div>
             </div>
             {data.name?<WeatherInfo data={data}/>:<p></p>}
           </div>

}