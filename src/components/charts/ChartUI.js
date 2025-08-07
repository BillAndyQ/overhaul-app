"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Card from '../card/Card';

// 👇 Importa dinámicamente ReactApexChart con SSR desactivado
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartUI = () => {
  const [chartData] = useState({
    series: [{
      name: 'Inflation',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => `${val}%`,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: { enabled: true }
      },
      yaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: false,
          formatter: (val) => `${val}%`
        }
      },
      title: {
        text: 'Monthly Inflation in Argentina, 2002',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: { color: '#444' }
      }
    }
  });

  return (
    <div id="chart" className='w-full'>
        <Card>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </Card>
    </div>
  );
};

export default ChartUI;
