import { NavLink, useSearchParams, useParams } from 'react-router-dom';
import { useGetCardQuery } from '../api/api';
import '../styles/details.css';

import { useDispatch } from 'react-redux';
import { set } from '../features/isLoading/isLoadingSlice';

export default function Details() {
  const dispatch = useDispatch();
  const { detailId } = useParams();
  const { data, error, isLoading } = useGetCardQuery(detailId as string);
  dispatch(set(isLoading));
  const [params] = useSearchParams();

  return (
    <div className="details-wrapper">
      {error ? (
        <div>Error</div>
      ) : isLoading ? (
        <div>Loading</div>
      ) : data ? (
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
          <h4 className="details-card__title">{data.data.name}</h4>
          <div className="details-card__img-wrapper">
            <img
              src={data.data.images.large}
              alt=""
              className="pokemon-card__img"
            />
          </div>
          <p className="details-card__desc">{data.data.flavorText}</p>

          {data.data.evolvesFrom ? (
            <p className="evolves-from">
              Evolves from: {data.data.evolvesFrom}
            </p>
          ) : null}

          {data.data.evolvesTo ? (
            <p className="evolves-to">Evolves to: {data.data.evolvesTo}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
