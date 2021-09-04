import React from 'react'
import './index.css'
function Card(props) {
    const {cash, type,currency,inrToUsd} = props;
    return (
        <div className = "card-wrapper">
            <div className = "card-header">
                {type}
            </div>
            <div style = {type === 'Income' ? {color : "green"} : {color : "red"}} className = "card-Body">
                <span style = {{fontSize : "small"}}>{currency === 'INR' ? 'Rs' : "$"}</span>{currency === 'INR' ? cash : inrToUsd(cash)}
            </div>
        </div>
    )
}

export default Card
