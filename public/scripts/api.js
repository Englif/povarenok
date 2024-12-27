export async function saveIngredients(ingredients) {
  const response = await fetch('/api/ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredients),
  });
  return response.json();
}

export async function SearchIngredients(ingredients) {
  const response = await fetch('/api/ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredients),
  });
  return response.json();
}

export async function getRec(rec) {
  const response = await fetch('/api/rec', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rec),
  });
  return response.json();
}

export function updateStage(stage) {
  localStorage.setItem('currentStage', stage.toString());
  return stage;
}
export function getCurrentStage() {
  const savedStage = localStorage.getItem('currentStage');
  return savedStage ? parseInt(savedStage) : 1;
}

export async function getRecipes() {
  const response = await fetch('/api/recipes');
  return response.json();
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

  export function selectRecipe(recipe) {
    localStorage.setItem('selectedRecipe', JSON.stringify(recipe));
  }
