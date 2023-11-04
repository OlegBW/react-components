import { Component, ReactNode } from 'react';
import '../styles/card.css';

type Props = {
  title: string;
  img: string;
};

export default class Card extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): ReactNode {
    return (
      <div className="pokemon-card">
        <h4 className="pokemon-card__title">{this.props.title}</h4>
        <div className="pokemon-card__img-wrapper">
          <img src={this.props.img} alt="" className="pokemon-card__img" />
        </div>
      </div>
    );
  }
}
