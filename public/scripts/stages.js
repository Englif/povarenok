/**
 * @file stages.js
 * @description Содержит функции для различных этапов приложения.
 */

import { getFormData, saveFormData, saveCurrentFormData, clear } from './utils.js';
import { filterRecipes, getRecipes,selectRecipe } from './api.js';
import { updateStage,getCurrentStage } from './api.js';
import { render, update } from './App.js';

export function stage1(elements) {
    elements.body.append(elements.main)
  
    elements.clearContainer.classList.add('clear-container')
    elements.main.append(elements.clearContainer)
    
    elements.gdigan.classList.add('gdigan')
    elements.gdigan.setAttribute('src','/img/dg.svg')
    elements.clearContainer.append(elements.gdigan)
    
    
    elements.startButton.classList.add('start-button')
    elements.startButton.textContent = 'начать готовку'
    elements.clearContainer.append(elements.startButton)
    
    elements.settings.classList.add('setings')
    elements.settings.textContent = 'настройки'
    elements.clearContainer.append(elements.settings)
  
    
    elements.body.append(elements.footer,elements.nav)
    
    elements.telegram.setAttribute('src','/img/telegram.svg')
    elements.git.setAttribute('src','/img/git.svg')
    
    elements.aboutUs = document.createElement('div')
    elements.aboutUs.classList.add('about')
    elements.aboutUs.append(elements.git,elements.telegram)
    
    
    elements.aboutTxt.textContent = 'о нас'
    elements.aboutTxt.setAttribute('style','font-size: 20px;')
    
    elements.footer.append(elements.aboutTxt,elements.aboutUs)
    
  }

export async function stage2(elements, savedData = null) {
  let stage2IdField = 1
    const ingBlock = document.createElement('form');
    ingBlock.setAttribute('style', 'display: flex; align-items: center');
    ingBlock.setAttribute('id', `ing-${stage2IdField}`);

    // Создание поля ввода для ингредиента
    const inputIng = document.createElement('input');
    inputIng.classList.add('input-ing');
    inputIng.setAttribute('name', `ing-${stage2IdField}`);
    ingBlock.append(inputIng);

    // Создание поля ввода для количества
    const inputIngInt = document.createElement('input');
    inputIngInt.classList.add('input-ing--int');
    inputIngInt.setAttribute('type', 'number');
    inputIngInt.setAttribute('name', `amount-${stage2IdField}`);

    ingBlock.append(inputIngInt);
    elements.clearContainer.append(ingBlock);

    // Если есть сохраненные данные, заполняем поля
    if (savedData) {
      inputIng.value = savedData.name || '';
      inputIngInt.value = savedData.amount || '';
    }


    elements.ingPlus.textContent = '+';
    elements.ingPlus.classList.add('ing-plus');
    elements.clearContainer.append(elements.ingPlus);

    // Сохраняем данные при изменении
    inputIng.addEventListener('change', saveCurrentFormData);
    inputIngInt.addEventListener('change', saveCurrentFormData);
}

export async function stage3(elements) {
  const savedIngredients = getFormData();
    if (savedIngredients && savedIngredients.length > 0) { 
      // Получаем рецепты и фильтруем их
      const recipes = await getRecipes();
      const filteredRecipes = await filterRecipes(savedIngredients, recipes);
  
      // Отображаем найденные рецепты
      const recipesTitle = document.createElement('h2');
      recipesTitle.textContent = 'Найденные рецепты:';
      recipesTitle.classList.add('recipes-title');
      elements.clearContainer.appendChild(recipesTitle);
  
      if (filteredRecipes.length > 0) {
        const recipesList = document.createElement('ul');
        recipesList.classList.add('recipes-list');
  
        filteredRecipes.forEach(recipe => {
          const recipeItem = document.createElement('li');
          recipeItem.textContent = recipe.name;
          recipeItem.classList.add('recipe-item');
          const recipeConteiner = document.createElement('div');
          recipeConteiner.classList.add('recipe-container');
          const ButtonSubmit = document.createElement('button');
          const imgSubmit = document.createElement('img');
          ButtonSubmit.classList.add('go-button')
          imgSubmit.setAttribute('alt', 'go')
          imgSubmit.setAttribute('src', './img/arrow.svg')
          ButtonSubmit.addEventListener('click', () => {
            const currentStage = getCurrentStage()
            selectRecipe(recipe)
            updateStage(currentStage + 1)
            update()
          });
          ButtonSubmit.append(imgSubmit);
          recipeConteiner.append(recipeItem);
          recipeConteiner.appendChild(ButtonSubmit)
          recipesList.appendChild(recipeConteiner);
        });
  
        elements.clearContainer.appendChild(recipesList);
      } else {
        const noRecipesMessage = document.createElement('p');
        noRecipesMessage.textContent = 'К сожалению, рецептов с данными ингредиентами не найдено.';
        noRecipesMessage.classList.add('no-recipes-message');
        elements.aboutTxt.appendChild(noRecipesMessage);
        elements.clearNav.append(elements.buttonBack);
      }
    } else {
      const noIngredientsMessage = document.createElement('p');
      noIngredientsMessage.textContent = 'Ингредиенты не найдены. Вернитесь на предыдущий шаг и добавьте ингредиенты.';
      noIngredientsMessage.classList.add('no-ingredients-message');
      elements.clearContainer.appendChild(noIngredientsMessage);
      elements.clearNav.append(elements.buttonBack);
    }
    elements.clearNav.append(elements.buttonBack);
  }

export async function stage4(elements) {
  const selectedRecipe = JSON.parse(localStorage.getItem('selectedRecipe'));
    if (selectedRecipe) {
      showInstructions(elements,selectedRecipe);
    } else {
      const noRecipeMessage = document.createElement('p');
      noRecipeMessage.textContent = 'Рецепт не выбран. Вернитесь на предыдущий шаг и выберите рецепт.';
      noRecipeMessage.classList.add('no-recipe-message');
      elements.clearContainer.appendChild(noRecipeMessage);
    }
    
  }
  export function showInstructions(elements, recipe) {
    clear(elements.clearContainer);
    const instructionsContainer = document.createElement('div');
    instructionsContainer.classList.add('recipe-instructions');
  
    const title = document.createElement('h3');
    title.textContent = `Инструкции для "${recipe.name}"`;
    instructionsContainer.appendChild(title);
  
    const instructionsList = document.createElement('ol');
    recipe.instructions.forEach(instruction => {
      const listItem = document.createElement('li');
      listItem.textContent = instruction;
      instructionsList.appendChild(listItem);
    });
  
    instructionsContainer.appendChild(instructionsList);
    elements.clearContainer.appendChild(instructionsContainer);
  }

export async function settingsStage(elements) {
  clear(elements.clearContainer);
  clear(elements.footer);

  const settingsTitle = document.createElement('h2');
  settingsTitle.textContent = 'Настройки';
  settingsTitle.classList.add('settings-title');
  elements.clearContainer.appendChild(settingsTitle);

  const settingsList = document.createElement('ul');
  settingsList.classList.add('settings-list');

  const settingsItems = [
    { name: 'Тема', options: ['Светлая', 'Темная'] },
    { name: 'Язык', options: ['Русский', 'English'] },
    { name: 'Уведомления', options: ['Вкл', 'Выкл'] }
  ];

  settingsItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('settings-item');

    const itemName = document.createElement('span');
    itemName.textContent = item.name;
    listItem.appendChild(itemName);

    const select = document.createElement('select');
    item.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.textContent = option;
      optionElement.value = option.toLowerCase();
      select.appendChild(optionElement);
    });

    select.addEventListener('change', (e) => {
      console.log(`${item.name} изменено на: ${e.target.value}`);
      // Здесь можно добавить логику для сохранения настроек
    });

    listItem.appendChild(select);
    settingsList.appendChild(listItem);
  });

  elements.clearContainer.appendChild(settingsList);

  elements.buttonBack_S.textContent = 'Назад';
  elements.buttonBack_S.classList.add('back-button')
  elements.clearNav.appendChild(elements.buttonBack_S);
}
