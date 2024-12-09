// show a specific page
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function initializePages() {
   
    document.getElementById('index-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPage('index-page');
    });

    document.getElementById('caught-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPage('caught-page');
        loadCaughtPokemon(); // load caught Pokémon right when caught page is shown
    });

    // show the index page first by default
    showPage('index-page');
}

// show the pages when the window loads
window.onload = initializePages;

// load Pokémon in the gallery page
document.addEventListener('DOMContentLoaded', function() {
    const pokemonContainer = document.getElementById('pokemon-container');
    loadPokemons(1, 20); // Initially load 20 Pokémon

    // load Pokémon when scrolling or clicking "Load More" button
    async function loadPokemons(start = 1, end = 20) {
        for (let i = start; i <= end; i++) {
            const data = await fetchPokemonData(i);
            const pokemonCard = createPokemonCard(i, data);
            pokemonContainer.appendChild(pokemonCard);
        }
    }

    // get Pokémon data from the API
    async function fetchPokemonData(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
    }

    // Create a Pokémon card with a link to the details page (? ... never worked)
    function createPokemonCard(id, data) {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const pokemonLink = document.createElement('a');
        pokemonLink.href = 'details.html'; // link to the details page (not functional)
        pokemonLink.classList.add('pokemon-link');

        const pokemonName = document.createElement('div');
        pokemonName.classList.add('pokemon-name');
        const pokemonTitle = document.createElement('h3');
        pokemonTitle.textContent = `${id.toString().padStart(3, '0')} - ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
        pokemonName.appendChild(pokemonTitle);

        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.alt = `Image of ${data.name}`;

        pokemonLink.appendChild(pokemonName);
        pokemonLink.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonLink);

        return pokemonCard;
    }

    // Load More Button for Gallery Page
    document.querySelector('.load-more').addEventListener('click', function() {
        const currentCount = pokemonContainer.children.length;
        loadPokemons(currentCount + 1, currentCount + 20); // loads more Pokémon
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const caughtContainer = document.getElementById('caught-pokemon-container');
    const loadMoreButton = document.getElementById('caught-load-more'); 

    let loadedPokemons = 0;
    const maxPokemons = 45; // shows only 45 pokemon to make it realistic

    // load the first batch of 20 caught Pokémon
    loadRandomPokemons(20);

    loadMoreButton.addEventListener('click', function() {
        // Check if there are more Pokémon to load
        if (loadedPokemons < maxPokemons) {
            const remainingPokemons = Math.min(20, maxPokemons - loadedPokemons);
            loadRandomPokemons(remainingPokemons);
        }
    });

    // load random Pokémon marked as caught
    async function loadRandomPokemons(count) {
        const randomPokemonIds = getRandomPokemonIds(count); // get random Pokémon IDs

        for (const id of randomPokemonIds) {
            const data = await fetchPokemonData(id);
            const pokemonCard = createCaughtPokemonCard(id, data);
            caughtContainer.appendChild(pokemonCard);
            loadedPokemons++; 
        }

        // disable the Load More button once we reach the max (45)
        if (loadedPokemons >= maxPokemons) {
            loadMoreButton.disabled = true;
            loadMoreButton.textContent = "No More Caught Pokémon";
        }
    }

    // get Pokémon data from the API
    async function fetchPokemonData(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return data;
    }

    // get random Pokémon IDs
    function getRandomPokemonIds(count) {
        const randomIds = [];
        while (randomIds.length < count) {
            const randomId = Math.floor(Math.random() * 1000) + 1; // Random ID between 1 and 1000
            if (!randomIds.includes(randomId)) {
                randomIds.push(randomId);
            }
        }
        return randomIds;
    }

    // caught page card
    function createCaughtPokemonCard(id, data) {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        // image
        const pokemonImage = document.createElement('img');
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.alt = data.name;
        pokemonCard.appendChild(pokemonImage);

        // name and caught label
        const pokemonNameDiv = document.createElement('div');
        pokemonNameDiv.classList.add('pokemon-caught-name');

        const pokemonName = document.createElement('h3');
        const caughtIcon = document.createElement('img');
        caughtIcon.classList.add('Pokecaught');
        caughtIcon.src = 'https://img.icons8.com/?size=16&color=000000&id=63311&format=png';
        caughtIcon.alt = 'Poké Ball';

        pokemonName.textContent = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)}`;
        pokemonName.prepend(caughtIcon); // Poké Ball icon before name

        // View Details Link (not functional)
        const detailsLink = document.createElement('a');
        detailsLink.classList.add('details-link');
        detailsLink.href = 'details.html';
        detailsLink.textContent = 'View Details';

        pokemonNameDiv.appendChild(pokemonName);
        pokemonNameDiv.appendChild(detailsLink);

        pokemonCard.appendChild(pokemonNameDiv);

        return pokemonCard;
    }
});







// details page... couldnt figure it out and gave up

document.addEventListener('DOMContentLoaded', function() {
    const savedPokemon = localStorage.getItem('selectedPokemon');
    if (savedPokemon) {
        const data = JSON.parse(savedPokemon);
        displayPokemonDetails(data);
    }
});

function fetchPokemonDetails(pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            displayPokemonDetails(data);
        })
        .catch(error => console.error("Error fetching Pokémon details:", error));
}
  