import React, { Component } from 'react';

import './style.css'

import CardListItem from '../card-list';
import Bottle from '../card-bottle';


export default class Card extends Component {

    render() {

        
        let { title, need, list, now } = this.props.data;

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
        let cardNow = this.isTech ? now : nowFind;
        let classTechList = this.isTech ? "card__list card__list_tech": "card__list";
        
        let bottlePx = Math.floor( (percent*320)/100 )

        let bottlePercentStyle = {};

        let bottleColor = "";

        title === 'Менеджмент' || title === "Доклады" ? bottleColor = "green" :  bottleColor = "orange" 
        if(bottlePx > 90) {
            bottlePercentStyle = {color: "#fff"}
            
        }     

        if(bottlePx >= 320) {
            bottleColor = "full";
            bottlePx = 320
        }
        


        return (
            <div className="card">
                <div className="card__icon"></div>
                <div className="card__title">{title}</div>
                <div className="card__row">
                    <div className="card__now">{cardNow}р</div>
                    <div className="card__coefficient"></div>
                    <div className="card__need">{need}руб</div>
                </div>
                <Bottle bottlePercentStyle={bottlePercentStyle} 
                        percent={percent} 
                        bottlePx={bottlePx}
                        bottleColor={bottleColor}
                        title={title}/>
                <div className={classTechList}>
                    {itemsCard}
                </div>
            </div>
        )
    }
}


