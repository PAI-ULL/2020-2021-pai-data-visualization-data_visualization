/**
 * Universidad: La Laguna
 * Titulación: Grado en ingeniería informática
 * Asignatura: Programación de aplicaciones interactivas
 * Proyecto: Presentación Data Visualization
 * @author Aarón José Cabrera Martín
 * Email institucional: aaron.jose.cabrera.martin.13@ull.edu.es - alu0101101019
 * @author Thaddaus Haase
 * Email institucional: thaddaus.haase.32@ull.edu.es - alu0101101019
 * @since 01/05/2021
 * @link https://www.rtve.es/noticias/20210428/mapa-del-coronavirus-espana/2004681.shtml
 * @description Este script fue diseñado para ser el ejemplo de como hacer un
 * diagrama de barras en chart.js para la presentación "Data Visualization" de
 * la asignatura Programación de aplicaciones interactivas. Este script
 * incrusta un diagrama de barras en el html que lo carge. El diagrama de
 * barras representa los casos de coronavirus diarios en España en la semana
 * del 16/04/2021 al 23/04/2021
 */
'use strict'

/*const CTX = document.getElementById('myChart').getContext('2d');
document.getElementById('myChart').width = document.documentElement.clientWidth;
document.getElementById('myChart').height = document.documentElement.clientHeight;

const myChart = new Chart(CTX, {
  type: 'bar',
  data: {
    labels: ['16 april', '18 april', '19 april', '20 april', '21 april', '22 april', '23 april'],
    datasets: [{
      label: 'New cases of COVID-19',
      data: [5087, 27725, 5113, 3776, 8258, 9868, 5461],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
        'rgba(255, 159, 104, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 159, 104, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});*/

/**
 * @class
 * @description Esta clase fue diseñada para ser el ejemplo de como hacer un
 * diagrama de barras en chart.js para la presentación "Data Visualization" de
 * la asignatura Programación de aplicaciones interactivas. Este script
 * incrusta un diagrama de barras en el html que lo carge. El diagrama de
 * barras representa los casos de coronavirus diarios en España en la semana
 * del 16/04/2021 al 23/04/2021
 */
export class CovidBarChart {
  #canvas = document.createElement('canvas'); /** canvas html element*/
  #context = this.#canvas.getContext('2d'); /** we are using 2d canvas */
  #chart = undefined; /** Holds new Chart we will create in constructor */
  #CHART_CONFIG = { /** Holds all configuration needed by chart.js */
    type: 'bar',
    data: {
      labels: ['16 april', '18 april', '19 april', '20 april', '21 april', '22 april', '23 april'],
      datasets: [{
        label: 'New cases of COVID-19',
        data: [5087, 27725, 5113, 3776, 8258, 9868, 5461],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 159, 104, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 104, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  /**
  * The constructor receives a HTML DOM element to know where to place the
  * canvas element created in #canvas
  * @param {htmlDOMElement} containerElement container element for canvas
  * @public
  */
  constructor(containerElement) {
    const containerElementSize = containerElement.getBoundingClientRect();
    this.#canvas.width = parseInt(containerElementSize.width);
    this.#canvas.height = parseInt(containerElementSize.height);
    containerElement.appendChild(this.#canvas);
    this.#chart = new Chart(this.#context, this.#CHART_CONFIG);
  }
}