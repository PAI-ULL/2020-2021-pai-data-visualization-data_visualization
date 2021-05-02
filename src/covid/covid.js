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
 * @description This script shows an example of creating a bar chart en
 * chart.js for the presentation "Data Visualization". The bar chart
 * will be implemented using canvas and represents the daily covid
 * cases from the week 16/04/2021 to 23/04/2021.
 */
'use strict'

/**
 * @class
 * @description This script shows an example of creating a bar chart en
 * chart.js for the presentation "Data Visualization". The bar chart
 * will be implemented using canvas and represents the daily covid
 * cases from the week 16/04/2021 to 23/04/2021.
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