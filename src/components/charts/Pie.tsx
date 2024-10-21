import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

type PieChartData = {
    value: number;
    name: string
}

// Optional: Define colors for each slice
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomPieChart = ({data}: {data: PieChartData[]}) => {

  return (
    <>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            innerRadius={100}
            outerRadius={160}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"  // Key to extract value for slices
            >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <CustomLegend data={data} />
    </>
  );
};

export default CustomPieChart;

const CustomLegend = ({ data }:{data: PieChartData[]}) => {
    const total = data.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <div
            className='flex items-center flex-wrap gap-14 gap-y-4 px-4'
        >
            {
                data.map((entry, index) => {
                    return (
                        <div
                            key={`legend-${index}`}
                            className='flex items-center gap-6 m-2'  
                        >
                            {/* Color indicator */}
                            <div className='flex items-center'>
                                <div
                                    className={`w-4 h-4 rounded-full border mr-2 cursor-default`}
                                    style={{
                                        backgroundColor: COLORS[index % COLORS.length]
                                    }}
                                />
                                <span>{entry.name}</span>
                            </div>
                            {/* Display Value */}
                            <span>{(entry.value / total * 100).toFixed(2).replaceAll('.00', '')}%</span>
                        </div>
                    )
                })
            }
        </div>
    )
};

