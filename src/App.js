import { React, useState } from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css";
import { useEffect } from "react";
import apiRequest from "./apiRequest";
import Footer from "./components/Footer";

const App=()=>{
  const API_URL="http://localhost:3500/items";
  const [wholeData,setWholeData]=useState([])
  const [data,setData]=useState([]);
  const [newItem,setNewItem]=useState('');
  const [search,setSearch]=useState('');
  const [fetchError,setFetchError]=useState(null);
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    const fetchItems=async ()=>{
      try{
        const response=await fetch(API_URL);
        if(!response.ok) throw Error("Data not received")
        const listItems= await response.json();
        setData(listItems);
        setWholeData(listItems);
        setFetchError(null);
      }catch(err){
        setFetchError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }

    setTimeout(()=>{
      (async ()=>{ await fetchItems()})();
    },2000);

  },[]);


  const additem=async (item)=>{
    const id=data.length ? data[data.length -1 ].id +1 :1;
    const addNewItem={id,checked:false,text:item};
    
    const listItems=[...data,addNewItem];
    setData(listItems);
    setWholeData(listItems);

    const postOptions={
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(addNewItem)
    }
    const result=await apiRequest(API_URL,postOptions);
    if(result){setFetchError(result);}
    window.location.reload();

  }
  

  const handleCheck=async (id)=>{
    const listItems=data.map((item)=>
      item.id === id ?{...item,checked:!item.checked}:item
    );
    setData(listItems);
    setWholeData(listItems);
    const myItem=listItems.filter((item)=>item.id ===id)
    const req_URL=`${API_URL}/${id}`  

    const updateOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const result=await apiRequest(req_URL,updateOptions);
    if(result){setFetchError(result);}
    window.location.reload()
  }


  const handleDelete=async (id)=>{
    const listData=data.filter((item)=>
      item.id !==id
    )
    setData(listData);
    setWholeData(listData);

    const deleteOptions={method:'DELETE'}

    const req_URL=`${API_URL}/${id}`
    const result=await apiRequest(req_URL,deleteOptions);
    if(result){setFetchError(result);}
    window.location.reload();

  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!newItem) return;
    additem(newItem);
    setNewItem('');
  }
  
  return <>
    <Header 
      items={data.filter((item)=>((item.text).toLowerCase()).includes(search.toLowerCase()))}      
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      newItem={newItem}
      setNewItem={setNewItem}
      search={search}
      setSearch={setSearch}
      fetchError={fetchError}
      isLoading={isLoading}
    >
    </Header>
    <Footer 
      data={data}
      setData={setData}
      wholeData={wholeData}
      handleDelete={handleDelete}
    />
  </>
}

export default App;