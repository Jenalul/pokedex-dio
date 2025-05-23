const pokemonsList = document.querySelector(".pokemons");
const loadMoreButton = document.querySelector(".loadMore");

let offset = 0;
const limit = 12;

function createPokemonHTML(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <div class="detail-content">
                <div class="detail">
                    <span class="name">${pokemon.name}</span>
                    <ol class="types">
                        ${pokemon.types
                            .map(
                                (type) =>
                                    `<li class="type ${type}">${type}</li>`
                            )
                            .join("")}
                    </ol>
                </div>
                <img src="${pokemon.photo}" alt="${pokemon.name}" />
            </div>
        </li>
    `;
}

function appendPokemons(pokemons) {
    const newHTML = pokemons.map(createPokemonHTML).join("");
    pokemonsList.innerHTML += newHTML;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemon(offset, limit).then((pokemons) => {
        appendPokemons(pokemons);
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    loadPokemonItems(offset, limit);
});
