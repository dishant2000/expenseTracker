import React from 'react'
import './index.css'
function HistoryList(props) {
    const {dataList} = props
    return (
        <table className = "dataTable">
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
                                    <span>{transaction.amount}</span>
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
