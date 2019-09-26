import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const Bar = ({ labelData, bmiData }) => {
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";

  const chartRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');
    let gradient = myChartRef.createLinearGradient(63, 81, 181, 700);
    gradient.addColorStop(0, '#929dd9');
    gradient.addColorStop(1, '#172b4d');
    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'BMI',
            data: bmiData,
            backgroundColor: gradient,
            borderColor: '#3F51B5',
            pointRadius: 6,
            pointHoverRadius: 8,
            pointHoverBorderColor: 'white',
            pointHoverBorderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              gridLines: {
                display: false,
                color: 'white'
              },
              ticks: {
                fontColor: 'white',
                fontSize: 16
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'BMI'
              },
              gridLines: {
                display: false,
                color: 'white'
              },
              ticks: {
                fontColor: 'white',
                fontSize: 16
              }
            }
          ]
        },
        tooltips: {
          titleFontSize: 13,
          bodyFontSize: 13
        }
      }
    });
  });

  return (
    <>
      <canvas
        id="myChart"
        ref={chartRef}
        style={{
          display: bmiData !== undefined ? 'block' : 'none'
        }}
      />
    </>
  );
};

export default Bar;
