import React from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";

  const style = {
    input: {
      width: '99.5%',
      minWidth:'310px',
      border: '2px solid #ccc',
      margin: '0',
      padding: '0'

    }
  }

  export function Autocomplete({isLoaded, onSelect}){
    const {
        ready,
        value,
        init,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
          initOnMount: false,
          debounce: 300
      });
      const ref = useOnclickOutside(() => {
        clearSuggestions();
      });
    
      const handleInput = (e) => {
        setValue(e.target.value);
      };
    
      const handleSelect =
        ({ description }) =>
        () => {
          setValue(description, false);
          clearSuggestions();
    
          getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            console.log("📍 Coordinates: ", { lat, lng });
            onSelect({ lat, lng })
          });
        };
    
      const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li key={place_id} onClick={handleSelect(suggestion)}>
              <strong>{main_text}</strong> <small>{secondary_text}</small>
            </li>
          );
        });

        React.useEffect(() => {
            if(isLoaded){
                init()
            }
        },[isLoaded, init])

        return <div ref={ref}>
            <input 
                style={style.input}
                type='text'  
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where are you going?"/>
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>


  }