import React, {useState, useEffect} from 'react';


function Demo() {

    const [data, setData] = useState();

    const fetchData = async () => {
        const response = await fetch("https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/users");
        const res = await response.json();        
        setData(res)    
    }   

    useEffect(() => {
        fetchData();
    },[])

    if(data) {
        console.log(data.body[4])
    }
    
    return (
        <h1>testing bro</h1>
    )
}

export default Demo;