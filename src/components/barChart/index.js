import React,{useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import './index.css'
function BarChart(props) {
    const {datalist} = props;
    const [income,setIncome] = useState([]);
    const [expense,setExpense] = useState([]);
    useEffect(() => {
        extractData();
    }, [props])
    const extractData = ()=>{
        let today = new Date();
        let currentYear = parseInt(today.getFullYear());
        let expenseData = [];
        let incomeData = [];
        for(let i = 0 ; i < 12; i++){
            expenseData[i] = 0;
            incomeData[i] = 0;
        }
        datalist.forEach(item => {
            let temp = item.date.split('/');
            let tmonth = parseInt(temp[1]);
            let tyear = parseInt(temp[2]);
            if(item.type === 'income' && tyear === currentYear){
                incomeData[tmonth - 1] += parseInt(item.amount);
            }
            else if(item.type === 'expense' && tyear === currentYear){
                expenseData[tmonth - 1] += parseInt(item.amount);
            }
        })
        setIncome(incomeData);
        setExpense(expenseData);
    }
    const data = {
        labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets : [
            {
                label : "expenses",
                data : expense,
                backgroundColor: "#FF616D",
            },
            {
                label : "income",
                // data : [2000,8590,5780,2450,3560,1560,2400,5200,6700,1540,5000,2000],
                data : income,
                backgroundColor: "#66DE93"
            }
        ]
    }
    const options =  {
        responsive:true,
        animation:{
            duration:0
        },
        scales: {
          x:{
              stacked : true
          },
          y:{
              stacked:true
          }
        }
      }
    return (
        <div>
            <Bar data = {data} options = {options}/>
        </div>
    )
}

export default BarChart
