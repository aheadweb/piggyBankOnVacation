import React, { Component } from 'react';

import './style.css'

export default class Card extends Component {

    render() {

        const { title, now, need, list } = this.props.data;

        let itemsCard = list.map(({ title, money }, index) => {
            return (
                <div className="card__item" key={index}>
                    <span>{title}</span>
                    <span></span>
                    <span>{money}</span>
                    <span className="icon-done"></span>
                </div>
            );
        })

        return (
            <div className="card">
                <div className="card__icon"></div>
                <div className="card__title">{title}</div>
                <div className="card__row">
                    <div className="card__now">{now}р</div>
                    <div className="card__coefficient">k=0,84</div>
                    <div className="card__need">{need}0руб</div>
                </div>
                <div className="card__bottle">
                    <div className="card__line"></div>
                    <div className="card__percent">0%</div>
                </div>
                <div className="card__list">
                    {itemsCard}
                </div>
            </div>
        )
    }
}


