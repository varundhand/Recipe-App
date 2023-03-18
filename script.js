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
// Usually when an async function is called, we use await.
// But, since we are assignig it to a new variable. We skipped `await`
getRandomMeal();
fetchFavMeals();

async function getMealById(id) {
  console.log({ id });
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  console.log(respData);
  const meal = respData.meals[0];
  return meal;
}

const getMealBySearch = async (term) => {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
};

const sliced = (text, words) => {
  const finalText = text.split(" ").slice(0, words).join(" ");
  return finalText + "...";
};

const addMeal = (mealData, random = false) => {
  console.log("here =>", mealData);
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
    <p class="meal-body-des">${sliced(mealData.strInstructions, 90)}</p>
  </div>
  `;

  meals.appendChild(meal);

  const LikeButton = meal.querySelector(".fav-btn > i");

  LikeButton.addEventListener("click", () => {
    console.log(LikeButton);
    if (LikeButton.classList.contains("fa-solid")) {
      removeMealsFromLS(mealData.idMeal);
    } else {
      addMealToLS(mealData.idMeal);
    }
    LikeButton.classList.toggle("fa-regular");
    LikeButton.classList.toggle("fa-solid");
    // console.log("me", { mealData });
    // const mealId = mealData.idMeal;
    // // Update UI
    // addMealToLS(mealId);
  });
};

function getMealsFromLS() {
  const mealids = JSON.parse(localStorage.getItem("mealids"));
  console.log(mealids);
  return mealids === null ? [] : mealids;
}

const addMealToLS = (addedId) => {
  const mealids = getMealsFromLS();

  localStorage.setItem("mealids", JSON.stringify([...mealids, addedId])); // [...] is the spread operator which adds individual items of an array
};

const removeMealsFromLS = (removedId) => {
  const mealids = getMealsFromLS();
  localStorage.setItem(
    "mealids",
    JSON.stringify(mealids.filter((id) => id !== removedId))
  );
};

//! Gets all the favourite meals to be rendered at top
async function fetchFavMeals() {
  const mealids = getMealsFromLS();

  const meals = [];

  for (let i = 0; i < mealids.length; i++) {
    // we cant use forEach method because we need to await each one of them
    const mealid = mealids[i];
    const meal = await getMealById(mealid); // since it returns a promise we need to await it
    console.log(meal);
    meals.push(meal);
  }

  // Add to UI
  //! my way

  meals.forEach((meal, index) => {
    const liTag = document.createElement("li");
    console.log(meal);
    liTag.innerHTML = `
    <img src="${meal.strMealThumb}" alt=""><span>${meal.strMeal}</span>
    `;

    const ulGetter = document.querySelector(".fav-meals");
    ulGetter.append(liTag);
  });
}

// [1,2,3]

// fetch (meal = 3)
