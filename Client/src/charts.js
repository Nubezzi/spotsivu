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
  Legend,
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

    const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;

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
              console.log(err)
            }
            if(text != 0) {
              dataTomorrow.push(Math.round(text * 10000) / 100);
            }
        }
    }

    let width, height, gradient1, gradient2;

  function getGradient(ctx, chartArea, mathset) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (gradient1 && mathset == dataToday) return gradient1
    if (gradient2 && mathset == dataTomorrow) return gradient2
    if (mathset == dataToday && (!gradient1 || width !== chartWidth || height !== chartHeight)) {
      width = chartWidth;
      height = chartHeight;
      const max = Math.max.apply(Math, mathset)/100
      const actmax = max * (1/max)
      const min = Math.min.apply(Math, mathset)/100 * ( 1 / max)
      const avg = (actmax + min) / 2
      gradient1 = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient1.addColorStop(actmax, '#FF0000');
      gradient1.addColorStop(avg, '#FFE000');
      gradient1.addColorStop(min, '#00FF23');
      return gradient1
    }
    if(mathset == dataTomorrow && (!gradient2 || width !== chartWidth || height !== chartHeight)){
      if(dataTomorrow != undefined) return gradient1
      width = chartWidth;
      height = chartHeight;
      const max = Math.max.apply(Math, mathset)/100
      const actmax = max * (1/max)
      const min = Math.min.apply(Math, mathset)/100 * ( 1 / max)
      const avg = (actmax + min) / 2
      gradient2 = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient2.addColorStop(actmax, '#FF0000');
      gradient2.addColorStop(avg, '#FFE000');
      gradient2.addColorStop(min, '#00FF23');
      return gradient2
    }

  }
  

    const data = {
        labels: labels,
        color: '#fff',
        datasets: [
          {
            label: 'Today',
            data: dataToday,
            backgroundColor: '#0055FF',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10,
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            borderColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
      
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea, dataToday);
            },
          },
          {
            label: 'Tomorrow',
            data: dataTomorrow,
            backgroundColor: '#FF00FF',
            pointStyle: 'rectRot',
            pointRadius: 5,
            pointHoverRadius: 10,
            borderDash: [8,6],
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            borderColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
      
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea, dataTomorrow);
            },
          },
        ],
      };

    return (
      <Line ref={chartRef} onMouseEnter={() => handleEnter()} onMouseLeave={() => handleLeave()} id='chart-wrapper' options={options} data={data} />
    );
}
