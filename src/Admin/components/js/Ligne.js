var ctx2 = document.getElementById("chart-line").getContext("2d");

new Chart(ctx2, {
  type: "line",
  data: {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    datasets: [{
      label: "Sales",
      tension: 0,
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: "#43A047",
      pointBorderColor: "transparent",
      borderColor: "#43A047",
      backgroundColor: "transparent",
      fill: true,
      data: [120, 230, 130, 440, 250, 360, 270, 180, 90, 300, 310, 220],
      maxBarThickness: 6
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: function(context) {
            const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return fullMonths[context[0].dataIndex];
          }
        }
      }
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
