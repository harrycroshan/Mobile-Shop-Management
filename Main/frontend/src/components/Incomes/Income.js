import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { type } from '@testing-library/user-event/dist/type';
import { search } from '../../utils/icons';

function Income() {
  const {addIncome, incomes, getIncomes, deleteIncome, totalIncome} = useGlobalContext()
  const [editableIncome, setEditableIncome] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getIncomes()
  },[])


  const handleEditClick = (income) => {
    setEditableIncome(income);  
  };



  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredIncomes = incomes.filter((income) =>
    income.invoiceid.toLowerCase().includes(searchTerm.toLowerCase()) || 
    income.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className='total-income'>Total Income: <span>${totalIncome()}</span> </h2>
        <div className='income-content'>
          <div className='form-container'>
            <Form editableIncome={editableIncome} setEditableIncome={setEditableIncome} />
          </div>  

              <div className='incomes'>
                <div className="search-bar">
                <p>{search}</p>
                <input
                  type="text"
                  placeholder="Search by Invoice ID or Email" 
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {filteredIncomes.map((income) =>{
               const {_id, invoiceid, amount, date, category, email,type } = income;
               return  <IncomeItem
               key={_id}
               id={_id} 
               invoiceid={invoiceid} 
               email={email} 
               amount={amount} 
               type={type}
               date={date} 
               category={category} 
               indicatorColor="var(--color-green)"
               deleteItem={deleteIncome}
               handleEditClick={handleEditClick}
               
               />
              })}
          </div>
          
        </div>
        
        </InnerLayout>
    </IncomeStyled>
  )
}

const IncomeStyled = styled.div`
display: flex;
overflow: auto;
.income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
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


export default Income;