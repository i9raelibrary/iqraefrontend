var ctx = document.getElementById("chart-bars").getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [{
      label: "Views",
      tension: 0.4,
      borderWidth: 0,
      borderRadius: 4,
      borderSkipped: false,
      backgroundColor: "#43A047",
      data: [50, 45, 22, 28, 50, 60, 76],
      barThickness: 'flex'
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
          color: '#737373',
          padding: 10,
          font: { size: 12, lineHeight: 2 }
        }
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderDash: [5, 5]
        },
        ticks: {
          display: true,
          color: '#737373',
          padding: 10,
          font: { size: 12, lineHeight: 2 }
        }
      },
    },
  },
});
