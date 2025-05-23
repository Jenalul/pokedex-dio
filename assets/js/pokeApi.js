function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

const pokeApi = {
    getPokemonDetail({ url }) {
        return fetch(url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon);
    },

    getPokemon(offset = 0, limit = 12) {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

        return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(this.getPokemonDetail))
            .then((detailRequest) => Promise.all(detailRequest))
            .then((pokemonDetail) => pokemonDetail);
    },
};
