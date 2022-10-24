import React from 'react';
const style = {
    li:{
        display: 'flex',
        border: '1px solid rgb(186,178,178)',
        borderRadius: '5px',
        marginBottom: '10px',
        alignText: 'center',
        padding: '4px',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    buttonRemove: {
        
    }

}
function Element(prop){

    let elem;
    if(prop.item.isEdit){
        elem = <input 
        placeholder='Write your goal...' 
        value={prop.item.value} 
        autoFocus={prop.item.isEdit?true:false}
        onChange={event => prop.onChangeValue(prop.item.id, event)}
        />
    } else {
        elem = <span className={prop.item.completed?'completedTask':''}>{prop.item.value}</span>
    }

    return <li 
            style={style.li}>
        <span>

        <input style={{marginRight:'10px'}} disabled={prop.item.isEdit?true:false} type='checkbox' checked={prop.item.completed?true:false} onChange={ ()=> prop.changeCompleted(prop.item.id)}/>
        {elem}

        </span>
        <span>
        <button 
        className='saveChangeButton'
        style={{
            backgroundColor: prop.item.isEdit?'#34ee13':'#13e6ee', 
            border: 'none'
            }}
            disabled={prop.item.completed?true:false}
            onClick={() => prop.changeEditModeByClick(prop.item.id)}
            >
            {prop.item.isEdit?'Save':'Change'}
        </button>
        <button 
            style={style.buttonRemove}
            className='removeButton'
            onClick={() => prop.removeLi(prop.item.id)}>
        &times;
        </button>
            </span>
            </li>
}
export default Element