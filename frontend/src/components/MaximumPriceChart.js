// src/components/MaximumPriceChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Scatter, ScatterChart } from 'recharts';

function MaximumPriceChart({ curveData, maxPriceData, predictedPoint }) {
  
  // Prepare combined data for chart
  const combinedData = [
    ...maxPriceData,
    ...(predictedPoint ? predictedPoint : [{"Distance": 0, "Price":0}])
  ].sort((a, b) => parseFloat(a.Distance) - parseFloat(b.Distance));

  // Add color property to each point for visualization
  const coloredData = combinedData.map(point => ({
    ...point,
    color: point.Price === predictedPoint[0].Price ? 'blue' : 'red'
  }));


  
  const formatXAxis = (tickItem) => {
    return tickItem.toFixed(2); // Round to 2 decimal places.
  };

  const formatTooltipValue = (value) => {
    return value.toFixed(2); // Round to two decimal places
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const distanceValue = payload[0].payload.Distance;
      const priceValue = payload[0].payload.Price;
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: 'white', // Set background color
          border: '1px solid #ccc', // add a border
          borderRadius: '4px', // rounded corners
          padding: '10px', // Add padding for better spacing
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)' // Optional: shadow for depth
        }}>
          <p>{`Distance: ${parseFloat(distanceValue).toFixed(2)}`}</p>
          <p>{`Price: $${parseFloat(priceValue).toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      {predictedPoint[0].Price !==0 && (
        <div className="chart2-container">
          <div className='chart'>

            
            {/* Line Chart for Curve Data */}
            <LineChart width={600} height={400} data={curveData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="Distance" tickFormatter={formatXAxis}/>
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid strokeDasharray="3 3" />
              
              {/* Black curve representing the prediction model */}
              <Line type="monotone" dataKey="Price" stroke="black" dot={false} />
              
              
              
            </LineChart>
          </div>
          
          <div className='chart'>
            {/* Scatter Chart for Combined Data */}
            <ScatterChart width={600} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Distance" name="Distance" />
              <YAxis dataKey="Price" name="Price" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Line type="monotone" data={curveData} stroke="black" dot={false} />
              <Scatter 
                name="Combined Data" 
                data={coloredData} 
                shape={(props) => (
                  <circle cx={props.cx} cy={props.cy} r={props.color === 'blue' ? 8 : 4} fill={props.color} />
                )}
              />
            </ScatterChart>
          </div>
          
        </div>
      ) }
    </>
    
  );
}

export default MaximumPriceChart; 