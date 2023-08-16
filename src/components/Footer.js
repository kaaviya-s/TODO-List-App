import React, { useEffect, useState } from 'react';
import "./Footer.css"

const Footer = ({data,setData,wholeData,handleDelete}) => {
    const originalData=wholeData;
    const [count,setCount]=useState(null);
    let filteredFalseData, filteredTrueData;
    
    useEffect(()=>{
        const isDataAvailable =originalData.length > 0;
        filteredFalseData= isDataAvailable ? originalData.filter((task)=>task.checked === false) : [];
        filteredTrueData= isDataAvailable ? originalData.filter((task)=>task.checked === true) : [];
        setCount(filteredFalseData.length);
    },[data]);

    const handleData=(e)=>{
        const classValue=e.target.className;
        if(classValue === 'all'){
            setData(originalData);
        }
        else if(classValue === 'activeButton'){
            setData(filteredFalseData);
        }
        else if(classValue === 'completed' ){
            console.log("true",filteredTrueData);
            setData(filteredTrueData);
        }
        else if(classValue === "last"){
            filteredTrueData.map((task)=>{
                handleDelete(task.id);
            })
            setData(data);
        }
    }

    return (
    <div className='footer'>
        
        <div className='itemLengthDisplay'>
            {(data.length) ? (
                <p> {count} Tasks left</p>
            ):(<p>No Tasks left</p>)}
        </div>
        <div className='centerButtons'>
            <button className='all' onClick={handleData} > All</button>
            <button className='activeButton' onClick={handleData}>Active</button>
            <button className='completed' onClick={handleData}>Completed</button>
        </div>
        <div className='lastButton'>
            <button className="last" onClick={handleData}> Clear Completed</button>
        </div>

    </div>
  )
}

export default Footer