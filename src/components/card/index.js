import React, { Component } from 'react';

import './style.css'

import CardListItem from '../card-list';


export default class Card extends Component {



    render() {

        
        let { title, need, list } = this.props.data;

        let nowFind =  0;

        if(list === undefined){
            list = [];
        }

        

        let itemsCard = list.map((list, index) => {
            if(list.done){
                nowFind += parseInt(list.money);
            }
            return (
                <CardListItem list={list} key={index} toggleDone={()=> this.props.toggleDone(index)} />
            );
        })

        let percent = Math.floor((nowFind*100)/need);
        return (
            <div className="card">
                <div className="card__icon"></div>
                <div className="card__title">{title}</div>
                <div className="card__row">
                    <div className="card__now">{nowFind}р</div>
                    <div className="card__coefficient"></div>
                    <div className="card__need">{need}руб</div>
                </div>
                <div className="card__bottle">
                    <div className="card__line"></div>
                    <div className="card__percent">{percent}%</div>
                </div>
                <div className="card__list">
                    {itemsCard}
                </div>
            </div>
        )
    }
}


