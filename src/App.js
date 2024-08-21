import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      const limit = 10;
      const offset = (page - 1) * limit;
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        setPokemons(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar a lista de Pokémons:', error);
      }
    };
    fetchPokemons();
  }, [page]);

  return (
    <div className="container col-12">
      <div className="containerNav">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png"/>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">Historia</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Joguinhos</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="pokemons">
        <div className="pokemon-grid">
          {pokemons.length > 0 ? (
            pokemons.map((pokemon, index) => (
              <PokemonCard key={index} pokemon={pokemon} />
            ))
          ) : (
            <p>Carregando Pokémons...</p>
          )}
        </div>
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn-primary mr-2">
          Anterior
        </button>
        <button onClick={() => setPage(page + 1)} className="btn btn-primary">
          Próximo
        </button>
      </div>
    </div>
  );
};

export default App;
