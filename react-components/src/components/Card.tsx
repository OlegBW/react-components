import '../styles/card.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  img: string;
  id: string;
};

export default function Card({ title, img, id }: Props) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  return (
    <div
      className="pokemon-card"
      onClick={(e) => {
        console.log(`details/${id}?${params.toString()}`);
        navigate(`details/${id}?${params.toString()}`);
        e.stopPropagation();
      }}
    >
      <h4 className="pokemon-card__title">{title}</h4>
      <div className="pokemon-card__img-wrapper">
        <img src={img} alt="" className="pokemon-card__img" />
      </div>
    </div>
  );
}
