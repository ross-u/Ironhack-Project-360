

const baseURL = 'http://localhost:3007'
const canvas = document.querySelector('canvas')

window.addEventListener('load', () => {
  printSocialChart()
})
  
function printSocialChart () {
  axios.get(`${baseURL}/results`)
  .then((response) => {
    const social = document.getElementById('socialChart').getContext('2d')
    var socialChart = new Chart(social, {
    type: 'bar',
    data: {
        labels: [1, 2, 3, 4],
        datasets: [{
          label: "SOCIAL",
          data: response.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  })
}

