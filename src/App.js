import {useState,useEffect,useRef} from 'react'
import './App.css';
import Card from './components/card';
import HistoryList from './components/historyList';
import database from './data'
import ExpenseForm from './components/expenseForm';
import jsPDF from 'jspdf';
import BarChart from './components/barChart';
import CurrencySelector from './components/currencySelect';
const s = JSON.stringify(database);
const data = JSON.parse(s);
function App() {
  const formToggleButton = useRef(null);
  const formMain = useRef(null);
  const searchBar = useRef(null);
  const dataTable = useRef(null);
  const [totalMoney, setTotalMoney] = useState(data.total);
  const [totalIncome, setTotalIncome] = useState(data.totalIncome);
  const [totalExpense, setTotalExpense] = useState(data.totalExpense);
  const [datalist, setDatalist] = useState(data.transactions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const getTodayDate = ()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }
  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    let currCurrency = formMain.current["currencySelect"].value;
    let currAmount = currCurrency === 'INR' ? parseInt(formMain.current['amount'].value) : usdToInr(parseInt(formMain.current['amount'].value));
    let currentTotal = totalMoney;
    if(formMain.current['transType'].value === 'income'){
      currentTotal += currAmount;
      
    }
    else if(formMain.current['transType'].value === 'expense'){
      currentTotal -= currAmount;
      
    }
    else{
      return;
    }
    
    const newData = {
      title : formMain.current['title'].value,
      date : getTodayDate(),
      amount : currAmount,
      type : formMain.current['transType'].value
    }
    const newDataList = [...datalist];
    newDataList.push(newData);
    data.totalExpense = totalExpense + currAmount;
    data.totalIncome = totalIncome + currAmount;
    data.total = currentTotal;
    data.transactions = [...newDataList];
    setTotalIncome(totalIncome + currAmount);
    setTotalExpense(totalExpense + currAmount);
    setTotalMoney(currentTotal);
    setDatalist(newDataList);
    formMain.current.reset();
  }
  const searchHandler = (e)=>{
    e.preventDefault();
    let searchStr = searchBar.current.value;

    let newList = data.transactions.filter(item => item.title.includes(searchStr));
    setDatalist(newList);
  }
  const exportHandler = ()=>{
    console.log(dataTable.current);
    const doc = new jsPDF('p', 'pt','a4',true);
    doc.html(dataTable.current,{
      callback : function(doc){
        doc.save("my-expense.pdf");
      },
      margin : [10,10,10,10]
    });
  }
  const inrToUsd = (cash)=>{
    cash = parseInt(cash);
    return parseInt(cash/72);
  }
  const usdToInr = (cash)=>{
    cash = parseInt(cash);
    return parseInt(cash*72);
  }
  useEffect(() => {
  }, [])
  return (
    <div className = "main-wrapper">
      {/* header */}
      <h1 className = "header-wrapper">  
        Expense Tracker
      </h1>
      {/* Balance section */}
      <div className = "balance-wrapper"> 
          <div className = "curr-balance">
            <span style = {{fontSize : "smaller",fontWeight : "500"}}>YOUR BALANCE</span><br/>
            <span style = {{fontSize :"x-large",fontWeight : "bold",margin : "0 10px"}}>{currency === 'INR' ? 'Rs' : "$"} {currency === 'INR' ? totalMoney : inrToUsd(totalMoney)}</span>
            <CurrencySelector setCurrency = {setCurrency}/>
          </div>
          <button ref = {formToggleButton} className = "add-exp" onClick = {()=>{setIsFormOpen(!isFormOpen)}}>
            {isFormOpen ? <span>X</span> : <span>Add</span>}
          </button>
      </div>
      {isFormOpen ? <ExpenseForm allRef = {{formMain}} formSubmitHandler = {onFormSubmitHandler}/>:null}
      {/*income and expense cards section */}
      <div className = "exp-display">
        <Card type = "Expense" cash = {totalExpense} currency = {currency} inrToUsd = {inrToUsd}/>
        <Card type = "Income" cash = {totalIncome} currency = {currency} inrToUsd = {inrToUsd}/>
      </div>
      {/*bar chart*/}
      <div>
        <BarChart datalist = {datalist} currency = {currency} inrToUsd = {inrToUsd}/>
      </div>
      {/*history panel*/}
      <div className = "history-wrapper">
        <div style = {{display : "flex", width : "100%",justifyContent : "space-between", alignItems : "center"}}>
        <h3>History</h3>
        <button onClick = {exportHandler} style = {{backgroundColor : "black", color : "white", borderRadius : "5px", cursor : "pointer"}}>export</button>
        </div>
        <div className = "history-search">
          <input ref = {searchBar} onChange = {searchHandler} className = "search-input" placeholder = "search"></input>
        </div>
        <div className = "history-list">
          <HistoryList tableref = {dataTable} dataList = {datalist} currency = {currency} inrToUsd = {inrToUsd}/>
        </div>
      </div>
    </div>
  );
}

export default App;
