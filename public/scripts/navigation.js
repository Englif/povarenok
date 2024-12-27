/**
 * @file Navigation.js
 * @description Содержит функции для создания и управления навигацией в приложении.
 */

import { updateStage, getCurrentStage } from './api.js';
import { clear } from './utils.js';
import { update } from './App.js';


export function navigation(elements) {
  elements.nav.append(elements.clearNav)
  elements.clearNav.classList.add('clear-nav')

  elements.buttonGo.classList.add('go-button')
  
  elements.imgGo.setAttribute('alt', 'go')
  elements.imgGo.setAttribute('src', './img/arrow.svg')
  elements.buttonGo.append(elements.imgGo)

  elements.buttonBack.classList.add('back-button')
  
  elements.imgBack.setAttribute('alt', 'back')
  elements.imgBack.setAttribute('src', './img/arrow.svg')
  elements.imgBack.setAttribute('style', 'transform: rotate(180deg);')
  elements.buttonBack.append(elements.imgBack)
  
}

export async function navigationCreate(elements) {
  clear(elements.clearNav);
  elements.clearNav.append(elements.buttonBack);
  elements.clearNav.append(elements.buttonGo);
  elements.nav.append(elements.clearNav);
}
