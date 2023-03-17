const meals = document.querySelector(".meals");

const getRandomMeal = async () => {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  console.log(randomMeal);

  addMeal(randomMeal, true);
};
getRandomMeal();

const getMealById = async (id) => {
  const meal = await fetch(
    "www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
};

const getMealBySearch = async (term) => {
  const meals = await fetch(
    "www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
};

const sliced = (text) => {
  const finalText = text.split(" ").slice(0, 90).join(" ");
  return finalText + "...";
};

const addMeal = (mealData, random = false) => {
  // default value of random is false
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
  <div class="meal-header">
    ${
      random
        ? `<span class="random">
    Random Recipe
  </span>`
        : ""
    }
    <img src=${mealData.strMealThumb} alt="${mealData.strMeal}">
  </div>
  <div class="meal-body">
    <h2>${mealData.strMeal}</h2>
    <button class="fav-btn"><i class="fa-regular fa-heart"></i></button>
    <h5 class="meal-body-des">MAIN INGREDIENTS:</h5>
    <ul>
      <li>${mealData.strIngredient1}</li>
      <li>${mealData.strIngredient2}</li>
      <li>${mealData.strIngredient3}</li>
      <li>${mealData.strIngredient4}</li>
    </ul>
    <p class="meal-body-des">${sliced(mealData.strInstructions)}</p>
  </div>
  `;

  meals.appendChild(meal);
};
