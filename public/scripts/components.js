/**
 * @file components.js
 * @description Содержит функции для создания и управления компонентами пользовательского интерфейса.
 */


export function createElements() {
  const elements = {
    body: document.querySelector('body'),
    main: document.createElement('main'),
    clearContainer: document.createElement('div'),
    clearNav: document.createElement('div'),
    buttonGo: document.createElement('button'),
    buttonBack: document.createElement('button'),
    imgGo: document.createElement('img'),
    imgBack: document.createElement('img'),
    gdigan: document.createElement('img'),
    startButton: document.createElement('button'),
    settings: document.createElement('button'),
    nav: document.createElement('nav'),
    footer: document.createElement('footer'),
    aboutTxt: document.createElement('p'),
    telegram: document.createElement('img'),
    git: document.createElement('img'),
    labelIng: document.createElement('label'),
    ingPlus: document.createElement('button'),
    buttonBack_S: document.createElement('button'),
  };
  return elements;
}
//нужно все созданные элементы в DOM дереве перенести сюда(все не получится есть те которые стоит создать локально)
