import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

Chart.defaults.color = "#fff";

export default function ChartData(props) {
    const today = props.datatoday
    const tomorrow = props.datatomorrow
    const [hover, setHover] = useState(false);
    const chartRef = useRef(null)

    useEffect(() => {
      const chart = chartRef.current
      const time = new Date()
      if(chart != undefined){
        switch (hover){
          case false:
            const tooltip = chart.tooltip
            chart.setActiveElements([
              {
                datasetIndex: 0,
                index: time.getHours(),
              }
            ]);
            tooltip.setActiveElements([
              {
                datasetIndex: 0,
                index: time.getHours(),
              }
            ]);
            break;
          case true:
            const tooltip2 = chart.tooltip
            chart.setActiveElements([]);
            tooltip2.setActiveElements([]);
            break;
          chart.update()
        }
        const tooltip = chart.tooltip
        chart.setActiveElements([
          {
            datasetIndex: 0,
            index: time.getHours(),
          }
        ]);
        tooltip.setActiveElements([
          {
            datasetIndex: 0,
            index: time.getHours(),
          }
        ]);
        chart.update()
      }
    }, [hover, new Date().getHours])

    
    const handleEnter = () => {
      setHover(true)
    }

    const handleLeave = () => {
      setHover(false)
    }

    const options = {
        responsive: true,
        scaleFontColor: "#fff",
        aspectRatio: 1,
        scales: {
          y: {
            suggestedMin: 0,
          }
        },
        plugins: {
          legend: {
            position: 'top',
            color: '#fff',
            maxWidth: 1000,
            align: 'center'
          },
          title: {
            display: true,
            text: 'SPOT Pricing for today and tomorrow',
            color: '#fff',
          },
        },
      };

    var labels = []
    var dataToday= []
    var dataTomorrow= []
    for (var i = 0; i < today.length; i++) {
        labels.push(i + ":00");
        dataToday.push(Math.round(today[i].PriceWithTax * 10000) / 100);
        if(tomorrow != null && tomorrow != undefined && tomorrow.length != 0 && !tomorrow.isEmpty){
            //console.log(tomorrow)
            var text = 0
            try{
              text = tomorrow[i].PriceWithTax
            }
            catch (err){
              //console.log(err)
            }
            if(text != 0) {
              dataTomorrow.push(Math.round(text * 10000) / 100);
            }
        }
    }

    const data = {
        labels: labels,
        color: '#fff',
        datasets: [
          {
            label: 'Today',
            data: dataToday,
            backgroundColor: 'rgba(255, 99, 132, 0.9)',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10,
            borderColor: 'rgba(255, 99, 132, 0.5)',
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
          {
            label: 'Tomorrow',
            data: dataTomorrow,
            backgroundColor: 'rgba(53, 162, 235, 0.9)',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10,
            borderColor: 'rgba(53, 162, 235, 0.5)',
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
        ],
      };

    return (
      <Line ref={chartRef} onMouseEnter={() => handleEnter()} onMouseLeave={() => handleLeave()} id='chart-wrapper' options={options} data={data} />
    );
}
