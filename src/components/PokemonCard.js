import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css'; 


const tipoCores = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

const PokemonCard = ({ pokemon }) => {
  const [detalhes, setDetalhes] = useState(null);
  const [virado, setVirado] = useState(false);

  useEffect(() => {
    const buscarDetalhesPokemon = async () => {
      try {
        const resposta = await axios.get(pokemon.url);
        setDetalhes(resposta.data);
      } catch (erro) {
        console.error('Erro ao buscar detalhes do Pokémon:', erro);
      }
    };
    buscarDetalhesPokemon();
  }, [pokemon]);

  const handleCardClick = () => {
    setVirado(!virado);
  };

  const getCardColor = () => {
    if (!detalhes) return '#FFF';
    const tipoPrincipal = detalhes.types[0].type.name;
    return tipoCores[tipoPrincipal] || '#FFF'; 
  };

  return (
    <div
      className={`pokemon-card ${virado ? 'virado' : ''}`}
      onClick={handleCardClick}
      style={{ backgroundColor: getCardColor() }}
    >
      <div className="card-face card-front">
        {detalhes && (
          <>
            <div className='cards-grid'>
              <div className="pokemon-image">
                <img src={detalhes.sprites.front_default} alt={pokemon.name} />
              </div>
              <div className="pokemon-info">
                <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                <p>Altura: {detalhes.height / 10} m</p>
                <p>Peso: {detalhes.weight / 10} kg</p>
                <p>Experiência Base: {detalhes.base_experience}</p>
                <p>Habilidades: {detalhes.abilities
                  .map(habilidade => habilidade.ability.name.charAt(0).toUpperCase() + habilidade.ability.name.slice(1))
                  .join(', ')}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="card-face card-back">
        <div className="pokemon-logo-back"> {/* Use uma classe CSS específica para estilizar */}
          <a></a>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
