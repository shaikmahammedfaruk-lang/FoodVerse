const BASE_URL ="https://www.themealdb.com/api/json/v1/1/";

const specialDish =document.getElementById("specialDish");

const categoriesContainer =document.getElementById("categoriesContainer");

const menuContainer =document.getElementById("menuContainer");

const cuisineContainer =document.getElementById("cuisineContainer");

const chefRecommendation =document.getElementById("chefRecommendation");

const searchBtn =document.getElementById("searchBtn");

const searchInput =document.getElementById("searchInput");

const modal =document.getElementById("recipeModal");

const modalBody =document.getElementById("modalBody");

const closeModal =document.getElementById("closeModal");

/* ==========================
   TODAY'S SPECIAL
========================== */

async function getSpecialDish(){

    const response =await fetch(BASE_URL + "random.php");

    const data =await response.json();

    const meal =data.meals[0];specialDish.innerHTML =`
    <div class="special-card">

        <img src="${meal.strMealThumb}">

        <div class="special-card-content">

            <h3>${meal.strMeal}</h3>

            <p>
            ${meal.strCategory}
            </p>

            <button
            onclick="showRecipe('${meal.idMeal}')">
            View Recipe
            </button>

        </div>

    </div>
    `;
}
/* ==========================
   CATEGORIES
========================== */

async function getCategories(){

    const response = await fetch(BASE_URL + "categories.php");

    const data =await response.json();

    categoriesContainer.innerHTML = "";

    data.categories.forEach(category => {categoriesContainer.innerHTML +=`
        <div
        class="category-card"
        onclick="loadCategory('${category.strCategory}')">

        <h3>
        ${category.strCategory}
        </h3>

        </div>
        `;
    });

}
/* ==========================
   MENU
========================== */

async function loadCategory(category){

    const response =
    await fetch(BASE_URL +`filter.php?c=${category}`);

    const data =await response.json();
    displayMenu(data.meals);

}

function displayMenu(meals){

    menuContainer.innerHTML = "";

    meals.slice(0,12).forEach(meal=>{

        const price =Math.floor(Math.random()*20)+10;menuContainer.innerHTML += `
        <div class="food-card">

            <img
            src="${meal.strMealThumb}">

            <div class="food-info">

                <h3>
                ${meal.strMeal}
                </h3>

                <p>
                $${price}
                </p>

                <button
                onclick="showRecipe('${meal.idMeal}')">

                View Recipe

                </button>

                <button
                onclick="addFavorite('${meal.idMeal}')">

                Favorite

                </button>

            </div>

        </div>
        `;
    });

}

/* ==========================
   SEARCH
========================== */

async function searchFood(){

    const term =searchInput.value;

    if(term==="") return;

    const response =
    await fetch( BASE_URL +`search.php?s=${term}`);

    const data =await response.json();

    if(!data.meals){

        menuContainer.innerHTML =
        "<h2>No Food Found</h2>";

        return;
    }

    displayMenu(data.meals);

}

searchBtn.addEventListener("click",searchFood);

searchInput.addEventListener("keypress",(e)=>{
if(e.key==="Enter"){searchFood();}
}
);

/* ==========================
   CUISINES
========================== */
async function getCuisines(){

    const response =await fetch(BASE_URL +"list.php?a=list");

    const data =await response.json();

    data.meals.forEach(area=>{cuisineContainer.innerHTML += `
        <div class="cuisine-item">

        ${area.strArea}

        </div>
        `;

    });

}

/* ==========================
   CHEF RECOMMENDATION
========================== */
async function getChefRecommendation(){

    const response =await fetch(
        BASE_URL +"random.php");

    const data =await response.json();

    const meal =data.meals[0];
    chefRecommendation.innerHTML =`
    <div class="chef-card">

        <img src="${meal.strMealThumb}">

        <div class="food-info">

            <h3>
            ${meal.strMeal}
            </h3>

            <button
            onclick="showRecipe('${meal.idMeal}')">

            View Recipe

            </button>

        </div>

    </div>
    `;
}

/* ==========================
   RECIPE MODAL
========================== */
async function showRecipe(id){

    const response =await fetch(BASE_URL +`lookup.php?i=${id}`);

    const data =await response.json();

    const meal =data.meals[0];

    modal.style.display ="block";modalBody.innerHTML =`
    <h2>${meal.strMeal}</h2>

    <img
    src="${meal.strMealThumb}"
    width="100%">

    <br><br>

    <p>
    ${meal.strInstructions}
    </p>

    <br>

    <a
    href="${meal.strYoutube}"
    target="_blank">

    Watch Recipe Video
    </a>
    `;
}

closeModal.onclick = ()=>{

modal.style.display ="none";

};

window.onclick = (e)=>{

if(e.target===modal){modal.style.display ="none";

}

};

/* ==========================
   FAVORITES
========================== */
async function addFavorite(id){

    const response =await fetch(BASE_URL +`lookup.php?i=${id}`);

    const data =await response.json();

    const meal = data.meals[0];

    let favorites =JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.push(meal);

    localStorage.setItem("favorites",JSON.stringify(favorites));

    alert("Added To Favorites");
}

/* ==========================
   RESERVATION
========================== */
document.getElementById("reservationForm").addEventListener("submit",function(e){e.preventDefault();

alert("Table Reserved Successfully");
this.reset();

}
);

/* ==========================
   INITIAL LOAD
========================== */

getSpecialDish();

getCategories();

getCuisines();

getChefRecommendation();

loadCategory("Seafood");