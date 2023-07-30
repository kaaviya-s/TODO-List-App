import {FaTrashAlt} from 'react-icons/fa';
import {React} from "react";
import "./Right.css"

const Right=({items,handleCheck,handleDelete,search,setSearch,fetchError})=>{
    return <>
        <div className="searchSection">
                    <form className="searchForm" onSubmit={(e)=>{e.preventDefault()}}>
                        <input 
                            className="search" 
                            type="text" 
                            placeholder="Search Here"
                            required
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        >
                        </input>
                        <button 
                            className="btn btn-primary"
                        >Search</button>
                    </form>
                </div>    
                
                <div className="content" 
                style={(items.length)?
                    {background:'rgba(0,0,0,0) url("ToDoList/todolist/src/sleep1.png")',backgroundBlendMode:'multiply'}
                    :{background:'rgba(0,0,0,0.5) url("ToDoList/todolist/src/sleep1.png")',backgroundBlendMode:'hard-light'}}
                >
                        
                    {items.map((item) => (
                        <div key={item.id}>
                            <li key={item.id}>
                                <input 
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={()=>{handleCheck(item.id)}}
                                >

                                </input>
                                <p 
                                    style={(item.checked)?{textDecoration:'line-through'}:null}
                                    onDoubleClick={()=>{handleCheck(item.id)}}
                                >
                                    {item.text}
                                </p>
                                <p className=" btn btn-danger icon">
                                    <FaTrashAlt 
                                        role="button" 
                                        tabIndex="0" 
                                        onClick={()=>{handleDelete(item.id)}}
                                        aria-label={`Delete ${item.text}`}
                                    />
                                </p>
                            </li>
                        </div>
                                
                    ))}
                </div>
    </>
}

export default Right;