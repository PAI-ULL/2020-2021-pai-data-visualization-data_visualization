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
 * @link https://en.wikipedia.org/wiki/Sine_wave
 * @description The sinusoid. A sine wave or sinusoid is a mathematical curve
 * that describes a smooth periodic oscillation. A sine wave is a continuous
 * wave. It is named after the function sine, of which it is the graph.
 */


export class Sinusoid {
  #canvas = document.createElement('canvas'); /** canvas html element*/
  #context = this.#canvas.getContext('2d'); /** we are using 2d canvas */
  #chart = undefined; /** Holds new Chart we will create in constructor */
  #lastUpdateTime = 0; /** Always contains last time charts was updated */
  #UPDATE_INTERVAL = 0.05; /** Time between each update */
  #SIN_INCREMENT = 0.07; /** Increment for sin wave calculation */
  #CHART_NUMBER_OF_POINTS = 100; /** Points in chart */
  #sinIncrementData = []; /** Array containg information for each point */

  #data = this.#defineData(); /** Data to be displayed in chart */

  #config = { /** Chart configuration */
    type: 'line',
    options: {
      animation: {
        x: {
          duration: 1000 * this.#UPDATE_INTERVAL,
          easing: 'linear'
        },
        y: {
          duration: 0
        }
      },
      scales: {
        y: {
          type: 'linear',
          suggestedMax: 1.0,
          suggestedMin: -1.0
        }
      }
    },
    data: this.#data,
  };



  /**
   * The constructor receives a HTML DOM element to know where to place the
   * canvas element created in #canvas
   * @param {htmlDOMElement} containerElement container element for canvas
   */
  constructor(containerElement) {
    const containerElementSize = containerElement.getBoundingClientRect();
    this.#canvas.width = parseInt(containerElementSize.width);
    this.#canvas.height = parseInt(containerElementSize.height);
    containerElement.appendChild(this.#canvas);
    this.#chart = new Chart(this.#context, this.#config);
    this.#updateOverTime();
  }

  /**
   * @private
   * Defines de data to start with, in this case it will calculate the
   * sine wave to draw depending on the #CHART_NUMBER_OF_POINTS and
   * #SIN_INCREMENT values
   */
  #defineData() {
    let dataArray = [];
    let labelValues = [];
    for (let i = 0; i < this.#CHART_NUMBER_OF_POINTS; i++) {
      this.#sinIncrementData.push(i * this.#SIN_INCREMENT)
      dataArray.push(Math.sin(i * this.#SIN_INCREMENT));
      labelValues.push(i);
    }
    const sinusoidData = {
      labels: labelValues,
      datasets: [{
        label: 'Sinusoid',
        data: dataArray,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1 /** bezier curve tension */
      }]
    };
    return sinusoidData;
  }

  /**
   * @private
   * This function has the job of updating the label on the X axis, fixing the
   * length of decimals to 2 to prevent changing behavior of the chart
   */
  #getUpdatedLabels() {
    let labels = [];
    for (let i = 0; i < this.#sinIncrementData.length; i++) {
      //labels.push(this.#sinIncrementData[i]);
      labels.push(this.#sinIncrementData[i].toFixed(2));
    }
    return labels;
  }

  /**
   * @private
   * This function controls the shown points by removing the first element
   * and pushing the next element into the data vecto to always show the
   * exact number of points defined by #CHART_NUMBER_OF_POINTS
   */
  #shiftToNextPosition() {
    this.#sinIncrementData.shift();
    let lastElement = this.#sinIncrementData[
      this.#sinIncrementData.length - 1];
    this.#sinIncrementData.push(lastElement + this.#SIN_INCREMENT);
    this.#chart.data.datasets[0].data.shift();
    this.#chart.data.datasets[0].data.push(
      Math.sin(lastElement + this.#SIN_INCREMENT));
    this.#chart.data.labels = this.#getUpdatedLabels();
    this.#chart.update();
  }

  /**
   * @private
   * updateOverTime simulates the animation by getting the current time
   * @param {*} now receives time from requestAnimationFrame
   */
  #updateOverTime(now = 0) {
    if ((now - this.#lastUpdateTime) >= (this.#UPDATE_INTERVAL * 1000)) {
      this.#lastUpdateTime = now;
      this.#shiftToNextPosition();
    }
    requestAnimationFrame((now) => this.#updateOverTime(now));
  }
};
