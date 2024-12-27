/**
 * @file utils.js
 * @description Содержит вспомогательные функции, используемые в различных частях приложения.
 */

export function clear(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

export function saveFormData(data) {
  localStorage.setItem('formData', JSON.stringify(data));
}

export function getFormData() {
  const data = localStorage.getItem('formData');
  return data ? JSON.parse(data) : null;
}

export async function filterRecipes(ingredients, recipes) {
  return recipes.filter(recipe => {
    return ingredients.every(ingredient =>
      recipe.ingredients.some(recipeIngredient =>
        recipeIngredient.name.toLowerCase().includes(ingredient.name.toLowerCase())
      )
    );
  });
}

export function saveCurrentFormData() {
  const formData = Array.from(document.querySelectorAll('form')).map(form => ({
      id: form.id,
      name: form.querySelector('.input-ing').value,
      amount: form.querySelector('.input-ing--int').value
  }));
  saveFormData(formData);
  console.log('Current form data saved:', formData);
}

  
