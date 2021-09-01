import React from 'react'
import './index.css'
function Card(props) {
    const {cash, type} = props;
    return (
        <div className = "card-wrapper">
            <div className = "card-header">
                {type}
            </div>
            <div style = {type === 'Income' ? {color : "green"} : {color : "red"}} className = "card-Body">
                <span style = {{fontSize : "small"}}>Rs</span>{cash}
            </div>
        </div>
    )
}

export default Card
