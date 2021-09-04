import React from 'react'
import './index.css'
function CurrencySelector(props) {
    const {setCurrency} = props;
    const handleChangeReq = (e)=>{
        setCurrency(e.target.value);
    }
    return (
        <select onChange = {setCurrency ? handleChangeReq : null } name="currencySelect" className = "currency-select" defaultValue = "INR">
            <option value="INR">INR</option>
            <option value="USD">USD</option>
        </select>
    )
}

export default CurrencySelector
