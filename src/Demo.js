import React, {useState, useEffect} from 'react';
import Card from './Card'



/*************************************************************************
this was to test our back end 
***************************************************************************/

function Demo() {

    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);

    const fetchData = async () => {
        const response = await fetch("https://y9k91gzue2.execute-api.us-east-2.amazonaws.com/dev/users");
        const res = await response.json();        
        setData(res)    
    }   

    useEffect(() => {
        fetchData();
    },[])
    let cards
    if(data) {
        console.log(data)
        cards = data.map(i => {
            return <Card 
                key={i.id}
                firstName={i.firstname}
                lastName={i.lastname}
            />
        })
    }
    
    return (
        <div>       
            { cards}
        </div>
       
    )
}

export default Demo;