import axios from "axios";
import { useEffect, useState } from "react";
import "./app.scss";
import Pokemon from "./Pokemon";
import Error from "./Error";
import poke_logo from "../src/assets/pokemon_logo.png";
import Loading from "./Loading";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(20);
  const [search, setSearch] = useState("");
  const [pokemonSearched, setPokemonSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const validSearch = new RegExp("^[0-9]*$");

  useEffect(() => {
    if (search) fetchDataSearch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    else
      fetchData(
        `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${loadMore}`
      );
  }, [search, loadMore]);

  const fetchDataSearch = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setPokemonSearched(response.data);
      })
      .catch(() => {
        setSearchError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchData = (url) => {
    setPokemonSearched([]);
    axios
      .get(url)
      .then((response) => {
        const sortedArray = response.data.results;

        const promises = sortedArray.map((item) => {
          return axios.get(item.url);
        });

        Promise.all(promises).then((values) => setPokemons(values));
      })
      .finally(() => setLoading(false));
  };

  const handleLoadMore = () => {
    setLoadMore((prev) => {
      return (prev += 20);
    });
  };

  return (
    <>
      <header className='header-page'>
        <img
          src={poke_logo}
          onClick={() => {
            window.location.reload(false);
          }}
        />
      </header>

      {searchError ? (
        <Error></Error>
      ) : (
        <main className='container-page'>
          <input
            type='search'
            placeholder='Enter the Pokémon ID...'
            value={search}
            onChange={(e) => {
              if (validSearch.test(e.target.value)) setSearch(e.target.value);
            }}
          />
          {loading ? (
            <Loading></Loading>
          ) : (
            <>
              <section className='pokemon-container'>
                {pokemonSearched[0] == "notfound" ? (
                  <div>VAI SE FODER</div>
                ) : pokemonSearched.length != 0 &&
                  pokemonSearched[0] != "notfound" ? (
                  <Pokemon
                    key={pokemonSearched.name}
                    data={pokemonSearched}
                  ></Pokemon>
                ) : (
                  pokemons.map((pokemon) => (
                    <Pokemon
                      key={pokemon.data.name}
                      data={pokemon.data}
                    ></Pokemon>
                  ))
                )}
              </section>
              <div className='loadMore-btn'>
                {pokemonSearched.length != 0 ? null : (
                  <button type='button' onClick={handleLoadMore}>
                    Load More Pokemons!
                  </button>
                )}
              </div>
            </>
          )}
        </main>
      )}
    </>
  );
}

export default App;
