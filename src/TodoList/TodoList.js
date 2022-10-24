import React, {useState} from 'react';
import uuid from 'react-uuid'
import Element from './element';
import './css.css'

 const style = {
		divStyle:{
		border: '0.5px solid rgb(228,217,217)',
		padding: '30px',
		borderRadius: '15px',
		backgroundColor: 'rgb(245, 235, 235)',
		minWidth:'310px'
		},
		addButton:{
			border: 'none',
			backgroundColor:'#34ee13',
			borderRadius: '10px',
			padding: '7px',
			marginTop: '15px',
			
		}
		
	}

export default function TodoList(){
   
	const arr = ['Connect weathers API', 'Connect google maps API', 'Create ToDo List'];
	let res = arr.map( item => {
		return {
			id:uuid(),
			completed: true,
			value: item,
			isEdit: false
		}
	})
	const [li, setLi] = useState(res);

	function changeCompleted(id){
		setLi(li.map( item => {
			if( item.id === id){
				item.completed = !item.completed
			}
			return item
		}))
	}

	function changeEditModeByClick(id){
		setLi( li.map( item => {
			if(item.id === id){
				item.isEdit = !item.isEdit
			}
			return item
		}))
	};
	function addNewLi(){
		setLi( [...li, {
			id:uuid(),
			completed: false,
			value: '',
			isEdit: true
		}])
	}
	function changeValue(id,event){
		setLi(li.map( item => {
			if(item.id === id){
				item.value = event.target.value
			}
			return item
		}))
	};
	function removeLi(id){
		setLi(li.filter( item => item.id !== id))
	}
		function countTask(){
			let count = 0;
			for(let key of li){
				if(!key.completed && key.value){
					count++
				}
			}
			return count
		}
	const result = li.map( item => <Element
		key={item.id} 
		item={item}
		changeEditModeByClick={changeEditModeByClick} 
		changeCompleted={changeCompleted}
		onChangeValue={changeValue}
		removeLi={removeLi}/>)
        
        
        
        return<div>
		
		<div style={{margin:'0 auto', width:'300px',minWidth:'290px', padding:'1px 7px', backgroundColor:'rgb(245, 235, 235)', borderRadius:'20px',border: '0.5px solid rgb(228,217,217)',marginBottom:'10px'}}>
			<h1>You daily task book</h1>
		</div>
		
		<div style={style.divStyle}>
		{li.length?result:<p>You dont have a task...</p>}
		<div style={{display:'flex', justifyContent:'space-between'}}>
			<button className='addButton' style={style.addButton} onClick={addNewLi}>Add new task</button>
			<div>{li.every(item => item.completed === true) && li.length !==0?<p>You are good boy :)</p>:li.length === 0?<p></p>:<p>You have to do {countTask()} task</p>}</div>
			</div>
	    </div>
		
		</div>

}