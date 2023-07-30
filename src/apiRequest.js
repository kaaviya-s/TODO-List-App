const apiRequest=async (url,optionsObject)=>{
    const errMsg=null;
    try{
        console.log(optionsObject);
        const response=await fetch(url,optionsObject);

        if(!response.ok){
            throw Error("Please reload the app");
        }

    }catch(err){
        errMsg=err.Message;
    }finally{
        return errMsg;
    }
}


export default apiRequest;