/**
 * @file App.js
 * @description Основной файл приложения, инициализирующий и управляющий всеми компонентами.
 */

import { createElements } from './components.js';
import { stage1, stage2, stage3, stage4, settingsStage, showInstructions } from './stages.js';

import { navigation, navigationCreate } from './navigation.js';
import { getCurrentStage, updateStage, saveIngredients } from './api.js';
import { clear, getFormData } from './utils.js';

const elements = createElements();

async function clearBlock() {
  clear(elements.main);
  clear(elements.footer);
  elements.clearContainer = document.createElement('div');
  elements.clearContainer.classList.add('clear-container');
  elements.main.append(elements.clearContainer);
}

export async function update(){
  let currentStage =  await getCurrentStage();

  clear(elements.clearNav)
  await clearBlock();

  render(currentStage)
}

export async function render() {
  let currentStage =  await getCurrentStage();
  // Проверяем, есть ли сохраненная стадия в localStorage
const savedStage = localStorage.getItem('currentStage');
  if (savedStage) {
    currentStage = parseInt(savedStage, 10);
    // Обновляем стадию на сервере
    await updateStage(currentStage);
  }
  console.log(currentStage);

  switch (currentStage) {
    case 1:
      localStorage.removeItem('formData');
      localStorage.removeItem('selectedRecipe');
      stage1(elements);
      break;
    case 2:
      const savedData = getFormData();
      await stage2(elements, savedData);
      await navigationCreate(elements);
      break;
    case 3:
      await stage3(elements);
      break;
    case 4:
      await stage4(elements);
      clear(elements.clearNav)
      elements.clearNav.append(elements.buttonBack);
      break;
    case 0:
      await settingsStage(elements);
      break;
    default:
      alert('Неизвестная стадия');
      updateStage(1)
      clear(elements.clearNav)
      await stage1(elements);
  }
}

elements.startButton.addEventListener('click',async function(){
  const currentStage = await getCurrentStage();
  await updateStage(currentStage + 1)
  update()
});
elements.ingPlus.addEventListener('click', async () => {
    await stage2(elements);
});

elements.buttonBack.addEventListener('click', async () => {
  const currentStage = await getCurrentStage()
  await updateStage(currentStage - 1)
  await update()
});

elements.buttonGo.addEventListener('click', async () => {
  const currentStage = await getCurrentStage();
  await updateStage(currentStage + 1)
  update()
  if (currentStage === 2) {
    const ingredients = getFormData(); // Получаем данные из формы
    if (!ingredients || ingredients.length === 0 || ingredients.every(ing => !ing.name && !ing.amount)) {
      // Показываем сообщение об ошибке, если ингредиенты не введены
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Пожалуйста, введите хотя бы один ингредиент.';
      errorMessage.style.color = 'red';
      errorMessage.style.marginTop = '10px';

      // Удаляем предыдущее сообщение об ошибке, если оно есть
      const existingError = elements.clearContainer.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }

      errorMessage.classList.add('error-message');
      elements.clearContainer.appendChild(errorMessage);
      return; // Прерываем выполнение функции, чтобы не переходить к следующему этапу
    }
        await saveIngredients(ingredients);
  }

});

elements.settings.addEventListener('click', async () => {
  await updateStage(0);
  await render()
  
});

// кнопка возврата в настройках
elements.buttonBack_S.addEventListener('click', () => {
  updateStage(1)
  update()
}); 

elements.git.addEventListener('click',function(){
  setTimeout(function(){window.location.href='https://github.com/Englif';}, 100)
})

elements.telegram.addEventListener('click', function(){
  setTimeout(function(){window.location.href='https:/t.me/praga98';}, 100)
})

// Инициализация приложения
// Добавьте функцию для сохранения текущей стадии

navigation(elements)
updateStage(1)
window.addEventListener('load',update)