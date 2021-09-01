import {useState,useEffect,useRef} from 'react'
import './App.css';
import Card from './components/card';
import HistoryList from './components/historyList';
import data from './data'
import ExpenseForm from './components/expenseForm';
function App() {
  const formToggleButton = useRef(null);
  const formMain = useRef(null);
  const [totalMoney, setTotalMoney] = useState(data.total);
  const [totalIncome, setTotalIncome] = useState(data.totalIncome);
  const [totalExpense, setTotalExpense] = useState(data.totalExpense);
  const [datalist, setDatalist] = useState(data.transactions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  

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
    let currAmount = parseInt(formMain.current['amount'].value);
    let currentTotal = totalMoney;
    if(formMain.current['transType'].value === 'income'){
      currentTotal += currAmount;
      setTotalIncome(totalIncome + currAmount);
    }
    else if(formMain.current['transType'].value === 'expense'){
      currentTotal -= currAmount;
      setTotalExpense(totalExpense + currAmount);
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
    setTotalMoney(currentTotal);
    const newDataList = [...datalist];
    newDataList.push(newData);
    setDatalist(newDataList);
    formMain.current.reset();
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
            <span style = {{fontSize :"x-large",fontWeight : "bold"}}>Rs {totalMoney}</span>
          </div>
          <button ref = {formToggleButton} className = "add-exp" onClick = {()=>{setIsFormOpen(!isFormOpen)}}>
            {isFormOpen ? <span>X</span> : <span>Add</span>}
          </button>
      </div>
      {isFormOpen ? <ExpenseForm allRef = {{formMain}} formSubmitHandler = {onFormSubmitHandler}/>:null}
      <div className = "exp-display">
        <Card type = "Expense" cash = {totalExpense} />
        <Card type = "Income" cash = {totalIncome} />
      </div>
      <div className = "history-wrapper">
        <h3>History</h3>
        <div className = "history-search">
          <input className = "search-input" placeholder = "search"></input>
        </div>
        <div className = "history-list">
          <HistoryList dataList = {datalist}/>
        </div>
      </div>
    </div>
  );
}

export default App;
