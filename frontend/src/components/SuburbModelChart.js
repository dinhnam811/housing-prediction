// src/components/SuburbModelChart.js
import React from 'react';
import { Scatter } from 'react-chartjs-2';

function SuburbModelChart({ chartData }) {
  
   return (
     <div className="chart-container">
       
       <Scatter data={chartData} options={{
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
           title: {
             display: true,
             text: 'Clustering of Housing based on Land Size and Price',
             font: {
               size: 24,
               weight: 'bold',
             },
           },
           legend: {
             display: true,
             position: 'top',
           },
         },
         scales: {
           xAxes: [{
             title: { display: true, text: 'Price' }
           }],
           yAxes: [{
             title: { display: true, text: 'Landsize' }
           }]
         }
       }} />
     </div>
   );
}

export default SuburbModelChart;