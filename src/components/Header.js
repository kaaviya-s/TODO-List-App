import {React} from "react";
import "./Header.css";
import "./Left.css";
import Right from "./Right"
import Left from "./Left";

const Header=({handleCheck,handleDelete,handleSubmit,newItem,setNewItem,search,setSearch,items,fetchError,isLoading})=>{

    return <main>
        
        <div className="header text-center">
            <img src={require('D:/Extra/ReactJS/ToDoList/todolist/src/todo.png')} alt="todo"></img>
            <p>TODO-List</p>
            <hr></hr>
        </div>
        <div className="bottomContainer">
            <div className="left"> 
                <Left handleSubmit={handleSubmit} 
                    newItem={newItem} 
                    setNewItem={setNewItem} 
                    />
            </div>
            
            {isLoading && <p style={{color:"black" , display:'flex',justifyContent:"center",fontSize:"2rem", fontWeight:"bolder"}}>...Loading Tasks</p> }

            {!isLoading  && <div className="right">
                {fetchError && <p style={{color:"black" , display:'flex',justifyContent:"center",fontSize:"2rem"}}>{`Error:${fetchError}`}</p>}
                
                {(items.length)?(
                    <Right items={items} 
                        handleCheck={handleCheck} 
                        handleDelete={handleDelete}
                        search={search}
                        setSearch={setSearch} 
                        fetchError={fetchError}
                    />
                    ):(
                        
                    <div className="optional">
                        <img src={require('D:/Extra/ReactJS/ToDoList/todolist/src/sleep1.png')}  alt="Fresh"></img>
                    </div>
                )}

           </div>}
                
        </div>
        
        
    </main>
}

export default Header;