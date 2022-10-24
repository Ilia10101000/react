import React from 'react';
import './App.css';
import TodoList from './TodoList/TodoList';
import WeatherInfoRender from './Weather/WeatherInfoRender';
import Map from './Map/Map';
import Footer from './Footer/Footer'
import HeaderDescription from './HeaderDescription/eaderDescription';


function App() {
    return (
      <div className="none">

      <React.Fragment>
      <HeaderDescription/>
      <div className='container'>
      
      <div className='leftSide'>
      <WeatherInfoRender/>
      <Map/>
      </div>
      
      <div className='rightSide'>
        <TodoList/>
        </div>
      
      </div>
      <Footer/>
      </React.Fragment>
      </div>
    );
}

export default App;
