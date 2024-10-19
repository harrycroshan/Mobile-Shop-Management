import React from 'react'
import styled from 'styled-components'
import{ dateFormat } from '../../utils/dateFormat'
import {calender,comment, dollar, trash,  edit, android, pc, tablet, apple, accs, tecfee, warranty, others, emp, supplier, transport, house ,loan, ins, event } from '../../utils/icons';
import Button from '../Button/Button';

function IncomeItem({
    id,
    invoiceid,
    amount,
    date,
    category,
    email,
    deleteItem,
    indicatorColor,
    type,
    handleEditClick 
}) {


    const categoryIcon = () => {
        switch(category){
            case 'Android':
                return android;
            case 'Pc':
                return pc;
            case 'Tablet':
                return tablet;
            case 'Apple':
                return apple;
            case 'Accessories':
                return accs;
            case 'Technician':
                return tecfee;
            case 'Warranty':
                return warranty;
            case 'Other':
                return others;
            default:
                return ''
        }

    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'Employee':
                return emp
            case 'Supplier':
                return supplier;
            case 'Transport':
                return transport;
            case 'Loan':
                return loan;
            case 'Insuarance':
                return ins;
            case 'HouseRent':
                return house;
            case 'Event':
                return event;
            case 'Other':
                return others;
            default:
                return ''
        }
    }  
  return (
    <IncomeItemStyled indicator={indicatorColor}>
        <div className='icon'>
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
        </div>
        <div className='content'>
            <h5>{invoiceid}</h5>
            <div className='inner-content'>
                <div className='text'>
                    <p>{dollar}{amount}</p>
                    <p>{calender} {dateFormat(date)}</p>
                    <p>
                        {comment}
                        {email}
                    </p>
                </div>
                <div className="btn-con">
                <Button
                    icon={edit}
                    bPad={'1rem'}
                    bRad={'50%'}
                    bg={'var(--color-cyan'}
                    color={'#000000'}
                    iColor={'#000000'}
                    hColor={'var(--color-green)'}
                    onClick={() => handleEditClick({ id, invoiceid, amount, date, category, email })}
                />    
                <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--color-cyan'}
                            color={'#000000'}
                            iColor={'#000000'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                />
                </div>
            </div>
        </div>
    </IncomeItemStyled>
  )
}

const IncomeItemStyled = styled.div`
    background: #000000;
    border: 2px solid #8a2be2;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #00FFFF;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #8a2be2;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--color-cyan);
                    opacity: 0.8;
                }
            }
        }
            
        .btn-con{
        display: flex;
        justify-content: space-between;
        opacity: 0.8;
        gap: 1rem;
        align-items: top;
        margin-bottom: 1.5rem;
        
        }
    }

`;

export default IncomeItem