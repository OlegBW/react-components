import '../styles/card.css';

type Props = {
  title: string;
  img: string;
};

export default function Card({ title, img }: Props) {
  return (
    <div className="pokemon-card">
      <h4 className="pokemon-card__title">{title}</h4>
      <div className="pokemon-card__img-wrapper">
        <img src={img} alt="" className="pokemon-card__img" />
      </div>
    </div>
  );
}
