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
 * @description contains basic js for the index.html file
 */

'use strict';

import { Sinusoid } from './sinusoid.js';

let sinusoid = new Sinusoid(document.getElementById('canvasContainer'));