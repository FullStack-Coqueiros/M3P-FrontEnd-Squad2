import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";



const DashboardCard = ({ estatisticas }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const newCtx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(newCtx, {
      type: "bar",
      data: {
        labels: estatisticas.map((item) => item.titulo),
        datasets: [
          {
            label: "Gráfico de estatísticas",
            backgroundColor: estatisticas.map((item) => item.color || "rgba(192, 171, 75, 0.2)"),
            borderColor: ["black"], 
            borderWidth: 1.0,
            data: estatisticas.map((item) => item.quantidade),
          },
          
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            precision: 0,
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad',
        },
      },
    });
  }, [estatisticas]);

  return (
    <div className="dashboard-card">
      <canvas ref={canvasRef} id={`${estatisticas[0].titulo}-chart`}></canvas>
    </div>
  );
};

export default DashboardCard;
