import React from 'react'
import './index.css'
function HistoryList(props) {
    const {tableref, dataList,currency,inrToUsd} = props
    return (
        <table ref = {tableref} className = "dataTable">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataList.map((transaction,idx)=>{
                        return(
                            <tr key = {idx}>
                                <td>{transaction.title}</td>
                                <td>{transaction.date}</td>
                                <td style = {transaction.type === 'income' ? {borderRight : "5px green solid"} : {borderRight : "5px red solid"}}>
                                    <span>{currency === 'INR' ? transaction.amount : inrToUsd(transaction.amount)}</span>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default HistoryList
