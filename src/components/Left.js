import React from "react";
import "./Left.css";
import { useRef } from "react";

const Left=({handleSubmit,newItem,setNewItem})=>{
    const inputRef=useRef();
    return <>
    
        <form className="addForm" onSubmit={handleSubmit}>
            <input 
                autoFocus 
                type="text" 
                ref={inputRef}
                placeholder="What needs to be done?" 
                required
                value={newItem}
                onChange={(e)=>setNewItem(e.target.value)}
            >

            </input>
            <button className="btn btn-primary" onClick={()=>{inputRef.current.focus()}}>Create Task</button>  
        </form>
            
        
            
    </>
}

export default Left