
//  search button 
const searchFood = () => {
    const searchFoodIteam = document.getElementById('inputField');
    const searchFoodIteamValue = searchFoodIteam.value;
    if (searchFoodIteamValue == '') {

        const div = document.getElementById("food-detail")
        div.innerHTML = `
        <h1 class="text-center">Enter food name</h1>
        `;
    }
    else {
        const div = document.getElementById("food-detail")
        div.textContent = '';
        searchFoodIteam.value = ''
        foodIist(searchFoodIteamValue)
    }

}

const foodIist = (inputValue) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFood(data.meals))
}

const displayFood = (foods) => {

    const displayFoodDiv = document.getElementById('result');
    displayFoodDiv.textContent = '';
    if (foods == null) {
        const displayFoodDiv = document.getElementById('result');
        displayFoodDiv.innerHTML = ` <h1> NO FOOD ABAVABILE</h1>`;
    }
    else {
        foods.forEach(food => {

            const div = document.createElement('div')
            div.innerHTML = `
        <div class="col">
         <div class="card">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${food.strMeal}</h5>
                <p class="card-text">${food.strInstructions.slice(0, 200)}.</p>
                <button onclick="foodDetail(${food.idMeal})" type="button" class="btn btn-outline-primary">DETAIL</button>
            </div>
         </div>
        </div>
   `;
            displayFoodDiv.appendChild(div)
        });
    }

}

const foodDetail = (foodId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}
    `;
    fetch(url)
        .then(res => res.json())
        .then(data => foodDetailsDisplay(data.meals[0]))
}
const foodDetailsDisplay = (singelFood) => {
    const singlefood = document.getElementById('food-detail');

    const div = document.createElement('div')

    div.innerHTML = `
    <div id="image" class="card  w-50  m-auto">
        <img  src="${singelFood.strMealThumb}"  class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${singelFood.strMeal}</h5>
        <p class="card-text">${singelFood.strInstructions.slice(0, 250)}</p>
        <a href="${singelFood.strYoutube}" target="_blank" class="btn btn-primary">Go somewhere</a>
    </div>
    </div>
    `;
    singlefood.appendChild(div)
}