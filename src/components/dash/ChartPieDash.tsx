import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const options: ApexOptions = {
    chart: {
        foreColor: "#fff",
    },


    legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'right',
        horizontalAlign: 'center', 
        floating: false,
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 700,
        formatter: undefined,
        inverseOrder: false,
        width: undefined,
        height: undefined,
        tooltipHoverFormatter: undefined,
        customLegendItems: [],
        offsetX: 0,
        offsetY: 10,
        labels: {
            colors: undefined,
            useSeriesColors: false
        },
        markers: {
            size: 7,
            shape: undefined,
            strokeWidth: 0,
            fillColors: undefined,
            customHTML: undefined,
            onClick: undefined,
            offsetX: -10,
            offsetY: 0
        },
        itemMargin: {
            horizontal: 0,
            vertical: 10
        },
        onItemClick: {
            toggleDataSeries: true
        },
        onItemHover: {
            highlightDataSeries: true
        },
    },
    

    xaxis: {    
        type: 'datetime',
        axisBorder: {
            color: "#fff"
        },
        axisTicks: {
            color: "#fff"
        },
        categories: [
            '2021-03-18T00:00:00.000Z',
            '2021-03-19T00:00:00.000Z',
            '2021-03-20T00:00:00.000Z',
            '2021-03-21T00:00:00.000Z',
            '2021-03-22T00:00:00.000Z',
        ]
    },

    series: [44, 55, 13, 33],
    
    stroke: {
        show: false,
    },   

    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],  
    dataLabels: {
        enabled: false,
    },

    fill: {
        colors: ['#39db7d','#ffeb39','#fd3b75','#56cbec'],
        opacity: 1,
    },

    plotOptions: {
        pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: "#"
              },
              value: {
                show: true,
                fontSize: '38px',
                fontFamily: 'sans-serif',
                fontWeight: 600,
                color: '#fff'
              },
              total: {
                show: true,
                fontSize: '18px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                color: '#758694'
              }
            }
          }
        }
    }
}

function ChartPieDash() {
    
    const [chartState, setChartState] = useState<boolean>(false)

    useEffect(() => {
        setChartState(true)
    }, [])

  return (
    <div className='-ml-16 mt-3'>
        { chartState && <Chart type={'donut'} width={430} height={220} series={options.series} options={options} />}
    </div>
  )
}

export default ChartPieDash