async function searchPokemon() {
    const pokemonName = document.getElementById("pokemon-search").value.toLowerCase();
    const statsContainer = document.getElementById("stats");

    statsContainer.innerHTML = "Chargement...";

    try {
        const response = await fetch(`/api/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error("Pokémon non trouvé");

        const pokemon = await response.json();

        displayPokemonInfo(pokemon);
    } catch (error) {
        statsContainer.innerHTML = "Aucun Pokémon trouvé";
        console.error("Erreur:", error);
    }
}

function displayPokemonInfo(pokemon) {
    const statsContainer = document.getElementById("stats");
    const pictureContainer=document.getElementById("picture");
    console.log('poke:',pokemon);
    console.log('poke:',pokemon.order);
    
    pictureContainer.innerHTML= `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"> `;


    statsContainer.innerHTML = `
        <h2><span>${pokemon.order}. </span>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p><strong>Type(s):</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Taille:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Poids:</strong> ${pokemon.weight / 10} kg</p>
            <ul>
                ${pokemon.stats.map(stat => `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`).join('')}
            </ul>
        
    `;
}






async function fetchAllPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500'); 
        const data = await response.json();
        displayPokemonList(data.results);
    } catch (error) {
        console.error("Erreur lors de la récupération de la liste des Pokémon:", error);
    }
}

function displayPokemonList(pokemons) {
    const listeContainer = document.querySelector('.liste');
    
    let i = 1;
    const ul = document.createElement('ul');
    ul.classList.add('pokemon-grid'); 

    pokemons.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = `${i++}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;
        ul.appendChild(li);
    });
    listeContainer.appendChild(ul);
}
document.addEventListener("DOMContentLoaded", fetchAllPokemons);