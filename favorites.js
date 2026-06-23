const favoritesContainer =document.getElementById("favoritesContainer");

const favorites =JSON.parse(localStorage.getItem("favorites")) || [];

if(favorites.length === 0){
favoritesContainer.innerHTML =`

<h2 style="text-align:center;">

No Favorite Recipes Yet
</h2>
`;

}else{

favorites.forEach((meal,index)=>{

favoritesContainer.innerHTML +=`

<div class="food-card">

<img
src="${meal.strMealThumb}"
alt="${meal.strMeal}">

<div class="food-info">

<h3>
${meal.strMeal}
</h3>

<p>
${meal.strCategory}
</p>

<button
onclick="removeFavorite(${index})">

Remove

</button>

</div>

</div>
`;

});

}

function removeFavorite(index){

favorites.splice(index,1);

localStorage.setItem("favorites",JSON.stringify(favorites));

location.reload();

}
