import React, { useEffect ,useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { search } from '../../utils/icons';


function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()
    const [editableExpense, setEditableExpense] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() =>{
        getExpenses()
    }, [])

    const handleEditClick = (Expense) => {
        setEditableExpense(Expense);  
      };

    const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    };

    const filteredExpenses = expenses.filter((income) =>
    income.invoiceid.toLowerCase().includes(searchTerm.toLowerCase()) || 
    income.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <div class="input-group">
                    </div>
                <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                    <ExpenseForm editableExpense={editableExpense} setEditableExpense={setEditableExpense} />
                    </div>
                    <div className="incomes">
                        <div className="search-bar">
                        <p>{search}</p>
                        <input
                            type="text"
                            placeholder="Search by Invoice ID or Email" 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        </div>

                        {filteredExpenses.map((income) => {
                            const {_id, invoiceid, amount, date, category, email, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                invoiceid={invoiceid} 
                                email={email} 
                                amount={amount} 
                                date={date}
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                                handleEditClick={handleEditClick}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000000;
        border: 2px solid #8a2be2;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-cyan);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
    .search-bar{
    flex:1;
    gap: 2rem;
    background: #000000;
    border: 2px solid #8a2be2;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    margin-bottom: 1rem;
    margin-left:50rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    p{
        width:50px;
        height: 50px;
        margin-left:1rem;
        border-radius: 20px;
        background: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size:2rem;
            color: var(--color-cyan);
        }
    }
    input, textarea, select{
            font-family: inherit;
            font-size: inherit;
            width: 100%;       
            border: 0px solid #8a2be2;
            border-radius: 20px;
            padding: .9rem 1rem;
            background: #000000;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            color: rgba(138,43,226,1);
            &::placeholder{
                color: var(--color-cyan); 
            }
        }
    }   


    
`;

export default Expenses