import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, elements } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import subjects from '../utils/interfaces';
import { colorSegundary } from './sharedstyles';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);
interface StudyPieChartProps {
  StudyCycle: subjects[];
}

const PieContainer = styled.div`
  width: 300px;
  margin: auto;
`
export  default function StudyPieChart({StudyCycle}: StudyPieChartProps) { 
  
  const data = {
    labels: ['Horas Estudadas', 'Total de Horas'],
    datasets: [
      {
        label: '# of hours',
        data: [StudyCycle.reduce((accumulator,element) => accumulator + element.CompletedHours, 0) , StudyCycle.reduce((accumulator,element) => accumulator + element.levelHours, 0) - StudyCycle.reduce((accumulator,element) => accumulator + element.CompletedHours, 0) ],
        backgroundColor: [
          colorSegundary.titleColor,
          colorSegundary.sideColor
        ],
        borderWidth: 1,
      },
    ],
  };
  return( 
    <PieContainer>
      <Pie data={data} />
    </PieContainer>
  )
}