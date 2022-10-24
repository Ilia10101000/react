import React from'react';

const style = {
    th:{
        display: 'block',
        fontSize:'13px'
    },
    td:{
        textAlign: 'center'
    },
    dataTemp:{
        fontSize:'40px', 
        marginRight: '20px',
    },
    dataMainTempInfo:{
        display: 'flex', 
        flexDirection: 'column', 
        marginBottom: '10px'
    },
    thBody:{
        display: 'flex', 
        backgroundColor: 'rgba(0,0,255,0.1)', 
        borderRadius: '7px', 
        justifyContent: 'space-between'
    }
};

function normalizeTime(timesTemp){
    let time = timesTemp
    let date = new Date();
    date.setTime(+time);
    let normalTime = date.getHours() + ':' + date.getMinutes() +':' + date.getSeconds()
    return normalTime
}

function WeatherInfo(data){
  
  return <div>
        <div style={{display:'flex'}}>
            
            <div style={style.dataMainTempInfo}>
                <div style={style.dataTemp}>{Math.round(data.data.temp)} °C</div>
                <div>Feels like {Math.round(data.data.feelsLike)} °С</div>
            </div>
            <div>
                <table>
                    <tbody style={{...style.thBody,width:'120%',position:'relative',top:'10px',left:'5px'}}>
                        <tr>
                            <th style={style.th}>Sun rise</th>
                            <td>{normalizeTime(data.data.sunRise)}</td>
                        </tr>
                        <tr>
                            <th style={style.th}>Sun set</th>
                            <td style={style.td}>{normalizeTime(data.data.sunSet)}</td>
                        </tr>
                        <tr>
                            <th style={style.th}>Temp max</th>
                            <td style={style.td}>{Math.round(data.data.tempMax)} °С</td>
                        </tr>
                        <tr>
                            <th style={style.th}>Temp min</th>
                            <td>{Math.floor(data.data.tempMin)} °С</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <table style={{width:'50%'}}>
            <tbody style={style.thBody}>
                <tr>
                    <th style={style.th}>Gust</th>
                    <td>{data.data.wind.gust?`${data.data.wind.gust} m/s`:'---'}</td>
                </tr>
                <tr>
                    <th style={style.th}>Pressure</th>
                    <td>{data.data.pressure}</td>
                </tr>
                <tr>
                    <th style={style.th}>Humidity</th>
                    <td>{data.data.humidity}%</td>
                </tr>
            </tbody>
        </table>
        <div style={{marginTop:'7px'}}>Data was obtained from <a target='_blank' href='https://openweathermap.org/' className='aDiv'>openweathermap.org</a></div>
    </div>
}
export default WeatherInfo