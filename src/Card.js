import React from 'react' 

function Card(props) {


    if(props) {
        console.log(props)
    }
    return (
        <div className="card-container">
            <h4>{props.firstName}</h4>
            <h4>{props.lastName}</h4>
        </div>
    )
}

export default Card