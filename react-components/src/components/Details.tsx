import { useLoaderData, NavLink, useSearchParams } from 'react-router-dom';
import { PokemonCard } from '../api/api';
import '../styles/details.css';

export default function Details() {
  const card = useLoaderData() as { data: PokemonCard };
  console.log('details', card);
  const [params] = useSearchParams();

  return (
    <div className="details-wrapper">
      <div className="details-card">
        <NavLink
          to={`../../?${params.toString()}`}
          className="close-link"
          relative="path"
        >
          <div className="close-img-wrapper">
            <img src="/src/assets/close.svg" alt="" className="close-img" />
          </div>
        </NavLink>
        <h4 className="details-card__title">{card.data.name}</h4>
        <div className="details-card__img-wrapper">
          <img
            src={card.data.images.large}
            alt=""
            className="pokemon-card__img"
          />
        </div>
        <p className="details-card__desc">{card.data.flavorText}</p>

        {card.data.evolvesFrom ? (
          <p className="evolves-from">Evolves from: {card.data.evolvesFrom}</p>
        ) : null}

        {card.data.evolvesTo ? (
          <p className="evolves-to">Evolves to: {card.data.evolvesTo}</p>
        ) : null}
      </div>
    </div>
  );
}
