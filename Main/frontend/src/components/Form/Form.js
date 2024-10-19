import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';


function Form({ editableIncome, setEditableIncome }) {
  
  const {addIncome, updateIncome, error, setError } = useGlobalContext()
  const [inputState, setInputState]  = useState({
    invoiceid: '',
    amount: '',
    date: '',
    category: '',
    email: '',

  })

  useEffect(() =>{  
    if(editableIncome){
        setInputState({
            invoiceid: editableIncome.invoiceid  ,
            amount: editableIncome.amount,
            date: editableIncome.date,
            category: editableIncome.category,
            email: editableIncome.email,
          });
    }
  },[editableIncome] );

  const { invoiceid, amount, date, category, email } = inputState;

  const handleInput = name => e => {
      setInputState({...inputState, [name]: e.target.value})
      setError('')
  } 

  const handleSubmit = e =>{
        e.preventDefault()
        if (editableIncome) {
            updateIncome(editableIncome.id, inputState);  
            setEditableIncome(null);  
          } 
        else {
            addIncome(inputState);  
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
    <FormStyled onSubmit={handleSubmit}>
         {error && <p className='error'>{error}</p>}
        <div className='input-control'>
            <input 
            type='text'
            value={invoiceid}
            name={'invoiceid'}
            placeholder='Invoice ID'
            onChange={handleInput('invoiceid')}
            />
        </div>
        <div className="input-control">
                <input value={amount}  
                    type="text" 
                    name={'amount'} 
                    placeholder={'Payment Amount'}
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
                <option value=""  disabled >Select Option</option>
                <option value="Android">Android Device</option>
                <option value="Pc">Desktop PC </option>
                <option value="Tablet">Tablet PC</option>
                <option value="Apple">Apple Device</option>
                <option value="Accessories">Mobile Accessories</option>
                <option value="Technician">Technician Charges</option>  
                <option value="Warranty">Additional Warranty</option>  
                <option value="Other">Other</option>  
            </select>
        </div>
        <div className="input-control">
                <textarea name="email" value={email} placeholder='Add A Email' id="email" cols="30" rows="4" onChange={handleInput('email')}></textarea>
            </div>
        <div className="submit-btn">
            <Button
            name={editableIncome ? 'Update' : 'Add'}
            icon={plus}
            bPad={'.8rem 1.6rem'}
            bRad={'30px'}
            bg={'var(--color-purple'}
            color={'#fff'}
            />
        </div>
    </FormStyled>
  )
}

const FormStyled = styled.form`
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

export default Form