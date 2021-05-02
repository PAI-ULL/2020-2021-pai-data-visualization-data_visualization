/**
 * Universidad de La Laguna
 * Excuela Superior de Ingeniería Informática
 * Grado en Ingeniería Informática
 * Asignatura: PROGRAMACIÓN DE APLICACIONES INTERACTIVAS (PAI)
 * Curso: 3º
 * Práctica: Práctica 10. Camino Aleatorio.
 * @author alu0101016733
 * @email alu0101016733@ull.edu.es
 * @date 27/04/2021
 * @file grid.js
 * @link https://codedraken.github.io/canvas-coords/
 * @brief module representing a grid
 * @fileoverview
 */


export class Coin {
  #canvas = document.createElement('canvas'); /** canvas html element*/
  #context = this.#canvas.getContext('2d'); /** we are using 2d canvas */
  #chart = undefined;
  #lastUpdateTime = 0;
  #updateInterval = 0.05;
  #sinIncrement = 0.07;
  #sinIncrementData = [];

  #data = this.defineData();

  #config = {
    type: 'line',
    options: {
      animation: {
        x: {
          duration: 1000 * this.#updateInterval,
          easing: 'linear'
        },
        y: {
          duration: 0
        }
      }
    },
    data: this.#data,
  };



  /**
   * The constructor receives a HTML DOM element and a number that defines
   * the spacing between the lines.
   * @param {htmlDOMElement} containerElement container element for canvas
   * @param {number} gridSpacing soacing between lines
   */
  constructor(containerElement, gridSpacing = 20) {
    const containerElementSize = containerElement.getBoundingClientRect();
    this.#canvas.width = parseInt(containerElementSize.width);
    this.#canvas.height = parseInt(containerElementSize.height);
    containerElement.appendChild(this.#canvas);
    this.#chart = new Chart (this.#context,this.#config)
    this.#updateOverTime();
    // this.#chart = new Chart (this.#context,
    //   {
    //     type: 'scatter',
    //     data: this.defineData(),
    //     options: {
    //       scales: {
    //         x: {
    //           type: 'linear',
    //           position: 'bottom'
    //         }
    //       }
    //     }
    //   }
    //   );
  }

  defineData() {
    
    let dataArray = [];
    let labelF = [];
    for (let i = 0; i < 101; i++) {
      this.#sinIncrementData.push(i * this.#sinIncrement)
      dataArray.push(Math.sin(i * this.#sinIncrement));
      labelF.push(i);
    }
    const dfd = {
    labels: labelF,
    datasets: [{
        label: 'My First Dataset',
        data: dataArray,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
    };
    return dfd;
  }

  #randomModify() {
    this.#sinIncrementData.shift();
    let lastElement = this.#sinIncrementData[this.#sinIncrementData.length - 1];
    this.#sinIncrementData.push(lastElement+this.#sinIncrement);
    this.#chart.data.datasets[0].data.shift();
    this.#chart.data.datasets[0].data.push(Math.sin(lastElement+this.#sinIncrement))
    this.#chart.update();
  }

  /**
   * @private
   * updateOverTime simulates the animation by getting the current time
   * @param {*} now receives time from requestAnimationFrame
   */
  #updateOverTime(now = 0) {
    if ((now - this.#lastUpdateTime) >= (this.#updateInterval * 1000)) {
      this.#lastUpdateTime = now;
      this.#randomModify();
    }
    requestAnimationFrame((now) => this.#updateOverTime(now));
  }
};
