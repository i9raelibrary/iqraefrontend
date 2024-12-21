var ctx3 = document.getElementById("chart-line-tasks").getContext("2d");

new Chart(ctx3, {
  type: "line",
  data: {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Tasks",
      tension: 0,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: "#43A047",
      pointBorderColor: "transparent",
      borderColor: "#43A047",
      backgroundColor: "transparent",
      fill: true,
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
      maxBarThickness: 6
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [4, 4],
          color: '#e5e5e5'
        },
        ticks: {
          display: true,
          padding: 10,
          color: '#737373',
          font: { size: 14, lineHeight: 2 }
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [4, 4]
        },
        ticks: {
          display: true,
          color: '#737373',
          padding: 10,
          font: { size: 14, lineHeight: 2 }
        }
      },
    },
  },
});
