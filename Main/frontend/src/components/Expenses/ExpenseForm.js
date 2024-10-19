import React, { useState , useEffect} from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';


function ExpenseForm( {editableExpense, setEditableExpense}) {
    const {addExpense, updateExpense, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        invoiceid: '',
        amount: '',
        date: '',
        category: '',
        email: '',
    })

    useEffect(() =>{
        if(editableExpense){
            setInputState({
                invoiceid: editableExpense.invoiceid,
                amount: editableExpense.amount,
                date: editableExpense.date,
                category: editableExpense.category,
                email: editableExpense.email,
              });
        }
      },[editableExpense] );

    const { invoiceid, amount, date, category,email } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (editableExpense) {
            updateExpense(editableExpense.id, inputState);  
            setEditableExpense(null);  
          } 
        else {
            addExpense(inputState);  
          }
        setInputState({
            invoiceid: '',
            amount: '',
            date: '',
            category: '',
            email: '',
        })
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={invoiceid}
                    name={'invoiceid'} 
                    placeholder="Invoice ID"
                    onChange={handleInput('invoiceid')}
                />
            </div>
            <div className="input-control">
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    <option value="Employee">Employee Salary</option>
                    <option value="Supplier">Supplier Payment</option>
                    <option value="Transport">Transport fee</option>
                    <option value="Loan">Bank Loans</option>
                    <option value="Insuarance">Insuarance Payment</option>
                    <option value="HouseRent">Housing Payments</option>  
                    <option value="Event">Events</option>  
                    <option value="Other">Other</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea name="email" value={email} placeholder='Add The Email' id="email" cols="30" rows="4" onChange={handleInput('email')}></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={editableExpense ? 'Update' : 'Add'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-purple'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}


const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #8a2be2;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(138,43,226,1);
        &::placeholder{
            color: rgba(138,43,226,1);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(138,43,226,1);
            &:focus, &:active{
                color: rgba(138,43,226,1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-cyan) !important;
            }
        }
    }
`;
export default ExpenseForm