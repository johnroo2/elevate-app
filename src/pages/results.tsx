import { Chart, ChartItem, registerables } from "chart.js";
import { useEffect, useRef, useState } from "react";

Chart.register(...registerables)

export default function Results({displayData, setDisplayData}:any){
    if(!displayData){
        return <></>
    }

    let {label, probs} = displayData

    label = label.map((item:string) => {
        if(item === "suprise"){return "Surprise"}
        return item.charAt(0).toUpperCase() + item.slice(1)
    })

    const probsClone = [...probs]
    const primary = label[probs.indexOf(probsClone.sort()[5])]
    const secondary = label[probs.indexOf(probsClone.sort()[4])]

    const data = {
        labels: label,
        datasets: [{
          backgroundColor: '#6DBAE0A0',
          borderRadius: 5,
          data: probs,
        }],
    };

    const chartRef = useRef<any>(null);

    useEffect(() => {
        const createChart = () => {
            if (document.getElementById('points-chart')) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                chartRef.current = new Chart(document.getElementById('points-chart') as ChartItem, {
                    type: 'bar',
                    data: data,
                    options: {
                        scales: {
                            x: {
                                ticks: {
                                    font: {
                                        size: 16, weight: 700
                                    },
                                },
                            },
                            y: {
                                ticks: {
                                    count: 6,
                                    font: {
                                        size: 16, weight: 700,
                                    },
                                },
                                beginAtZero: true,
                                max: 1
                            },
                        },
                        plugins: {
                            legend: {
                              display: false
                            },
                            tooltip: {
                                callbacks: {
                                  title: function (context) {
                                      return context[0].label
                                  },
                                  label: function (context) {
                                      return (Number(context.parsed.y) * 100).toFixed(1) + "%";
                                  }
                                },
                                displayColors:false
                              }
                        },
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    },      
                });
            }
        }
        createChart()
    }, [data])

    return (
        <div className="relative flex flex-col gap-8 w-screen h-screen items-center justify-center pl-[20%] pr-[10%]">
            <a href="/" className="absolute top-6 left-6 bg-sky-600 hover:bg-sky-500 text-white rounded-md px-12
            py-[0.35rem] text-xl font-medium transition-all cursor-pointer">
                Home
            </a>
            <div className="flex flex-col self-start gap-2" data-aos="fade-up">
                <div className="text-[2.75rem] font-bold text-black ">
                    Primary Emotion Detected: {primary}
                </div>    
                <div className="text-3xl font-medium text-black ">
                    Secondary Emotion Detected: {secondary}
                </div>   
            </div>
            <a className="mt-[-1.5rem] text-2xl font-normal hover:underline hover:text-sky-700 transition self-start underline"
            href="/info" data-aos="fade-up">
                How does my transformer model work?
            </a>
            <div className="w-[60vw] self-start">
                <canvas id="points-chart" className="width-lockfull 
                bg-sky-50 p-8 pb-4 rounded-md" data-aos="fade-up"/> 
            </div>
        </div>
    )
}