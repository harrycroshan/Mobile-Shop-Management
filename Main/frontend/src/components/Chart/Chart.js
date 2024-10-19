import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement, 
)

function Chart() {

  const {incomes, expenses} = useGlobalContext()

  const data ={
    labels: incomes.map((inc) => {
        const{date} = inc
        return dateFormat(date)
    }),
    datasets: [
        { 
            label:'Income',
            data:[
               ...incomes.map((income) =>{
                const {amount} = income
                return amount
               }) 
            ],
            backgroundColor:'cyan',
            borderColor:'cyan',
            tension: .2
        },
        { 
            label:'Expenses',
            data:[
               ...expenses.map((expense) =>{
                const {amount} = expense
                return amount
               }) 
            ],
            backgroundColor:'purple',
            borderColor:'purple',
            tension: .2
        }
    ]

  }  


  return (
    <ChartStyled>
        <Line  data={data}/>
    </ChartStyled>
  )
}

const ChartStyled = styled.div`


`;

export default Chart