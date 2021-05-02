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
 * @link https://archive.ics.uci.edu/ml/datasets/iris
 * @description This module implements the visualization of the Iris dataset
 * inside a Scatter-Plot with the chart.js library. Compares the three types
 * of iris flowers inside of the dataset, which are: (Setosa, Sersicolor,
 * Virginica)
 */

import { irisRawData } from "./irisData.js";

/**
 * @class
 * This module implements the visualization of the Iris dataset
 * inside a Scatter-Plot with the chart.js library. Compares the three types
 * of iris flowers inside of the dataset, which are: (Setosa, Sersicolor,
 * Virginica)
 */
export class Iris {
  #canvas = document.createElement('canvas'); /** canvas html element*/
  #context = this.#canvas.getContext('2d'); /** we are using 2d canvas */
  #chart = undefined; /** Holds new Chart we will create in constructor */
  #CHART_CONFIG = { /** Holds all configuration needed by chart.js */
    type: 'scatter',
    data: this.#defineIrisData(),
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };

  /**
   * @public
   * The constructor receives a HTML DOM element to know where to place the
   * canvas element created in #canvas
   * @param {htmlDOMElement} containerElement container element for canvas
   */
  constructor(containerElement) {
    const containerElementSize = containerElement.getBoundingClientRect();
    this.#canvas.width = parseInt(containerElementSize.width);
    this.#canvas.height = parseInt(containerElementSize.height);
    containerElement.appendChild(this.#canvas);
    this.#chart = new Chart (this.#context,this.#CHART_CONFIG);
  }

  /**
   * @private
   * #defineIrisData processes the raw data file and converts it into the
   * data object required from Chart.js to correctly display all information.
   */
  #defineIrisData() {
    let irisFlowerTypes = {
      'Setosa': {
        color: '#1f77b4',
        data: []
      },
      'Versicolor': {
        color: '#ff7f0e',
        data: []
      },
      'Virginica': {
        color: '#2ca02c',
        data: []
      }
    }
    for (let i = 0; i < irisRawData.length; i++) {
      const CURRENT_FLOWER = {
        x: parseFloat(irisRawData[i]["\"petal.length\""]),
        y: irisRawData[i]["\"petal.width\""]
      }
      irisFlowerTypes[irisRawData[i]["\"variety\""]].data.push(CURRENT_FLOWER);
    }
    let irisData = {
      datasets: [{
        label: 'Setosa',
        data: irisFlowerTypes['Setosa'].data,
        radius: 10,
        backgroundColor: irisFlowerTypes['Setosa'].color
      }, {
        label: 'Versicolor',
        data: irisFlowerTypes['Versicolor'].data,
        radius: 10,
        backgroundColor: irisFlowerTypes['Versicolor'].color
      }, {
        label: 'Virginica',
        data: irisFlowerTypes['Virginica'].data,
        radius: 10,
        backgroundColor: irisFlowerTypes['Virginica'].color
      }],
    };
    return irisData;
  }
};