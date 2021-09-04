import React from 'react'
import CurrencySelector from '../currencySelect';
import './index.css'
function ExpenseForm(props) {
    const {formSubmitHandler,allRef} = props;
    return (
        <div className = "form-wrapper">
            <form ref = {allRef.formMain} className = "expenseform" onSubmit = {formSubmitHandler}>
                <input  name = "amount" type = "number" placeholder = "amount" required/>
                <CurrencySelector/>
                <br/>
                <input  name = "title" type = "text" placeholder = "title" required/><br/>
                <div>
                <input  type = "radio" name = "transType" value = "expense" required defaultChecked/>
                <label>Expense</label>
                <input  type = "radio" name = "transType" value = "income" required/>
                <label>Income</label>
                </div>
                <button type = "submit">Add Transaction</button>
            </form>
        </div>
    )
}

export default ExpenseForm
