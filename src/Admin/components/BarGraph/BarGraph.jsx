import React, { useEffect, useState } from 'react';
import {useFetchBarGraphDataQuery} from '../../../services/AdminApi';
import Chart from 'chart.js/auto';


  const BarGraph = () => {

    const {data: barStatistics, isFetching} = useFetchBarGraphDataQuery();
    const [Values, SetValues] = useState([]);
    const [Days, setDays] = useState([]);

    useEffect(() => {
      if (barStatistics && barStatistics.success) {
        const data = barStatistics.last7DaysCommands;
        const values = data.map((item) => item.count);
        const days = data.map((item)=> item.day.slice(0,3).toUpperCase());
        SetValues(values);
        setDays(days);
      }
    }, [barStatistics]);

    useEffect(() => {
      // getBarGraph();

      const data = {
        labels: Days, // Labels pour les barres
        datasets: [
          {
            label: 'Performance',
            data: Values, // Valeurs des barres
            backgroundColor: '#109f00', // Couleur de fond des barres
            borderRadius: 5, // Ajout d'un rayon de bordure pour arrondir les coins des barres
          },
        ],
      };
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Désactiver la légende
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.raw; // Afficher la valeur dans l'infobulle
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              drawOnChartArea: false, // Masque les lignes de la grille verticales
            },
          },
          y: {
            beginAtZero: true, // Commencer l'axe Y à zéro
            max: Math.max(...data.datasets[0].data) + Math.max(...data.datasets[0].data) * 0.20,
            grid: {
              drawOnChartArea: true, // Afficher les lignes de la grille
              drawTicks: false, // Optionnel : pour ne pas afficher les "ticks" sur l'axe Y
            },
            ticks: {
              stepSize: Math.max(...data.datasets[0].data) / 3, // Modifier l'intervalle entre les ticks
            },
          },
        },
      };
  
      // Récupérer le contexte du canvas
      const ctx = document.getElementById('chart-bars').getContext('2d');
      // Vérifier si un graphique existe déjà et le détruire
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
  
      // Créer un nouveau graphique
      const chartInstance = new Chart(ctx, {
        type: 'bar', // Définir le type de graphique comme un graphique à barres
        data: data, // Données à afficher
        options: options, // Options de personnalisation
      });
  
      // Sauvegarder l'instance du graphique dans une variable globale pour la détruire plus tard
      window.chartInstance = chartInstance;
  
      // Cleanup au démontage du composant
      return () => {
        if (window.chartInstance) {
          window.chartInstance.destroy();
        }
      };
    }, [Values]);
  
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h6 className="mb-0">Commandes's Statistics</h6>
            <p className="text-sm">Last Campaign Performance</p>
            <div className="pe-2">
              <div className="chart">
                <canvas id="chart-bars" className="chart-canvas" height="170"></canvas>
              </div>
            </div>
            <hr className="dark horizontal" />
            <div className="d-flex">
              <i className="material-symbols-rounded text-sm my-auto me-1">schedule</i>
              <p className="mb-0 text-sm">Statistics 7 days ago</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default BarGraph;
