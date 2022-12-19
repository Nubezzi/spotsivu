import React from 'react';
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
import {Line } from 'react-chartjs-2';

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

    const options = {
        responsive: true,
        scaleFontColor: "#fff",
        aspectRatio: 3/2,
        maxWidth: 1000,
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
        dataToday.push(today[i].PriceWithTax);
        if(tomorrow != null){
            dataTomorrow.push(tomorrow[i].PriceWithTax);
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

    return <Line id='chart-wrapper' options={options} data={data} />;
}
