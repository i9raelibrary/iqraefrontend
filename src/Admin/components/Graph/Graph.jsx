import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DashboardGraph = ({ graphName, Desc, arr, arr2 }) => {
  const lineCanvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!lineCanvasRef.current) {
      console.error('Canvas element not found');
      return;
    }

    // Détruire l'ancien graphique s'il existe déjà
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const ctx = lineCanvasRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Ajustez les coordonnées selon vos besoins
    gradient.addColorStop(0, 'rgba(14, 134, 1, 0.5)'); // Couleur de début
    gradient.addColorStop(1, 'rgba(13, 100, 0, 0)');   // Couleur de fin, transparente

    // Données pour le graphique linéaire
    const lineData = {
      labels: arr,
      datasets: [
        {
          label: 'Sales Performance',
          data: arr2,
          borderColor: '#0e8601',
          backgroundColor: gradient,
          fill: true,
          tension: 0,
        },
      ],
    };

    const lineOptions = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.raw}`;
            },
          },
        },
      },
      scales: {
        x: { grid: { drawOnChartArea: false } },
        y: { beginAtZero: true, max: Math.max(...lineData.datasets[0].data) + 10 },
      },
    };

    // Créer l'instance du graphique
    chartInstanceRef.current = new Chart(lineCanvasRef.current, {
      type: 'line',
      data: lineData,
      options: lineOptions,
    });

    // Cleanup au démontage du composant
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [arr, arr2]);

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="mb-0">{graphName}</h6>
        <p className="text-sm">
          {Desc}
        </p>
        <div className="pe-2">
          <div className="chart">
            <canvas ref={lineCanvasRef} className="chart-canvas" height="170"></canvas>
          </div>
        </div>
        <hr className="dark horizontal" />
        <div className="d-flex">
          <i className="material-symbols-rounded text-sm my-auto me-1">schedule</i>
          <p className="mb-0 text-sm">Statistics 7 days ago</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
