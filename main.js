import movies from "./movie.js";

const movieContainer = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortBy = document.getElementById("sortBy");

function generator(movies) {
    if (!movieContainer) {
        console.error("movieContainer element not found!");
        return;
    }

    movieContainer.innerHTML = "";

    const limitedMovies = movies.slice(0, 20);

    limitedMovies.forEach(movie => {
        const cardd = document.createElement("div");
        cardd.classList.add("card");
        cardd.innerHTML = `
            <img src="img/1200x675mf.jpg.png" alt="${movie.Title}" class="card-image">
            <div class="card-content" data-name="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.imdb_rating} &nbsp; | &nbsp; ${movie.movie_year} &nbsp; | &nbsp; ${Math.floor(movie.runtime / 60)} hr ${movie.runtime % 60} min</p>
                <p>${movie.Categories}</p>
                <button class="card-button" onclick="alert('More info about ${movie.Title}')">More info</button>
            </div>
        `;
        movieContainer.appendChild(cardd);
    });
}

function searchProduct() {
    const searchValue = searchInput.value.toLowerCase().trim();
    
    const productList = Array.from(document.querySelectorAll('.card-content'));

    const filterProducts = productList.filter(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        return productName.includes(searchValue);
    });

    productList.forEach(product => product.closest('.card').style.display = 'none');

    filterProducts.forEach(product => product.closest('.card').style.display = '');
}

searchInput.addEventListener("input", searchProduct);

searchButton.addEventListener("click", searchProduct);

document.addEventListener("DOMContentLoaded", function() {
    generator(movies);
});

function sortMovies() {
    const sortValue = sortBy.value;

    if (sortValue === "all") {
        return;
    }

    let sortedMovies = [...movies];

    if (sortValue === "alphabeticalAsc") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortValue === "alphabeticalDesc") {
        sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sortValue === "weightAsc") {
        sortedMovies.sort((a, b) => a.runtime - b.runtime);
    } else if (sortValue === "weightDesc") {
        sortedMovies.sort((a, b) => b.runtime - a.runtime);
    }
}   

sortBy.addEventListener("change", sortMovies);


const filterType = document.getElementById("filterType");

function filterByCategory() {
    const selectedCategory = filterType.value.toLowerCase().trim();

    const filteredMovies = movies.filter(movie => {
        if (selectedCategory === "all") {
            return true;
        }
        return movie.Categories.toLowerCase().includes(selectedCategory);
    });

    generator(filteredMovies);
}

filterType.addEventListener("change", filterByCategory);

document.addEventListener("DOMContentLoaded", function() {
    generator(movies);
});

