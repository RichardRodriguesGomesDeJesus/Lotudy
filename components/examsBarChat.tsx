import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { colorSegundary } from "./sharedstyles";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarContainer = styled.div`
  margin: auto; 
  
  @media screen and (min-width: 0){
    height:auto;
    width: calc(100vw - 1rem);  
   
  };
  @media screen and (min-width: 768px ){
    height:auto;
    width: calc(100vw - 1rem);  
  };
  @media screen and (min-width: 1024px  ){
    height:auto;
    width: calc(50vw - 1rem);  
  };
  
`

export default function ExamsBarChart({examList}) {
  console.log(examList)
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
});

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
        labels: examList.map((e)=>e.title),
        datasets: [
            {
                label: 'erros',
                data: examList.map((e)=>e.mistakes) ,
                borderColor: colorSegundary.error,
                backgroundColor: colorSegundary.error,
              }, 
              {
                label: 'acertos',
                data: examList.map((e)=>e.correctAnswers),
                borderColor: colorSegundary.sideColor,
                backgroundColor: colorSegundary.sideColor,
              },
        ]
    })
    setChartOptions({
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Revenue'
            }
        },
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true
    })
  }, [])

  return (
    <>
      <BarContainer>
        <Bar data={chartData} options={chartOptions} />
      </BarContainer>
    </>
  );
}
