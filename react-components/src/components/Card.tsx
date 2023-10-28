import { Component, ReactNode } from 'react';

type Props = {
  title: string;
  desc: string;
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
        <p className="pokemon-card__desc">
          {this.props.desc.replaceAll('', '')}
        </p>
      </div>
    );
  }
}
