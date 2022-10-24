import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Autocomplete } from './AutoComplete';

const API_KEY = process.env.REACT_APP_API_KEY_MAPS


const containerStyle = {
  width: '100%',
  // minWidth:'310px',
  height: '50vh'
};

const defaultCenter = {
  lat: 50.450129,
  lng: 30.5239758
};

const libraries = ['places']

function Map() {

  const [center, setCenter] = React.useState(defaultCenter)

  const defaultOptions = {
    panControl: true,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    fullscreenControl: false
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })

  const mapRef = React.useRef(undefined)

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current(undefined)
  }, [])
  
  const onPlaceSelect = React.useCallback((coordinates) => {
    setCenter(coordinates)
  },[],)

  return isLoaded ? <div>

      <div style={{display:'flex', flexDirection:'column'}}>
      <Autocomplete 
        isLoaded={isLoaded}  
        onSelect={onPlaceSelect}/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
      </GoogleMap>
      </div>
      
      </div> : <div><h2>Loading maps...</h2></div>
}

export default React.memo(Map)