import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, elements } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import subjects from '../utils/interfaces';
import { colors } from './sharedstyles';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);
interface PieChartProps {
  StudyCycle: subjects[];
}

const PieContainer = styled.div`
  width: 320px;
  margin: auto;
`
export  default function PieChart({StudyCycle}: PieChartProps) { 
  
  const data = {
    labels: ['Hours Studied', 'Total Hours'],
    datasets: [
      {
        label: '# of hours',
        data: [StudyCycle.reduce((accumulator,element) => accumulator + element.CompletedHours, 0) , StudyCycle.reduce((accumulator,element) => accumulator + element.levelHours, 0) - StudyCycle.reduce((accumulator,element) => accumulator + element.CompletedHours, 0) ],
        backgroundColor: [
          colors.titleColor,
          colors.sideColor
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