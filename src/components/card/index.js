import React, { Component } from 'react';

import './style.css'

import CardListItem from '../card-list';


export default class Card extends Component {

    isTech = false;


    bottle  = [
            <><path fillRule="evenodd" clipRule="evenodd" d="M-18.966 58.795c1.092 3.725 2.385 5.959 4.77 7.413 2.384 1.454 5.86 2.129 13.216 2.386 7.357.257 59.593.098 111.601-.026 20.007-.124 48.785-.212 65.034-.684 16.248-.472 19.966-1.33 23.766-2.832 3.799-1.502 7.679-3.648 10.872-5.343 3.193-1.694 5.699-2.936 9.418-3.834 3.719-.897 8.65-1.45 18.471-2.555 9.822-1.105 24.535-2.762 35.691-4.168 11.155-1.405 18.754-2.559 22.876-3.14 4.123-.581 4.77-.591 5.255.126.485.717.808 2.16 1.617 2.712.808.551 2.102.212 2.829-.2.728-.413 4.032-.899 5.043-.712 1.01.187 2.522 1.046 3.773 1.108 4.982.247 4.982-30.382 0-30.135-1.251.061-2.763.92-3.773 1.107-1.011.187-4.315-.298-5.043-.71-.727-.413-2.021-.753-2.829-.201-.809.551-1.132 1.995-1.617 2.712-.485.716-1.131.707-5.255.126-4.122-.582-11.721-1.736-22.876-3.14-11.156-1.407-25.869-3.064-35.691-4.169-9.821-1.105-14.752-1.657-18.471-2.555-3.718-.898-6.224-2.14-9.418-3.834-3.193-1.695-7.073-3.841-10.872-5.343-3.8-1.502-7.518-2.36-23.766-2.832-16.249-.472-45.027-.56-65.034-.684C58.613-.735 6.377-.895-.979-.638c-7.357.257-10.833.932-13.217 2.386-2.385 1.454-3.678 3.688-4.77 7.413-3.41 11.64-3.41 37.994 0 49.634z" fill="url(#paint0_linear)"/><path d="M0 0h153v68H0V0z" fill="url(#paint1_linear)"/><defs><linearGradient id="paint0_linear" x1="-21.524" y1="-.776" x2="319.002" y2="-.776" gradientUnits="userSpaceOnUse"><stop stopColor="#F96"/><stop offset="1" stopColor="#FF5E62"/></linearGradient><linearGradient id="paint1_linear" x1="-21.524" y1="-.776" x2="319.002" y2="-.776" gradientUnits="userSpaceOnUse"><stop stopColor="#F96"/><stop offset="1" stopColor="#FF5E62"/></linearGradient></defs></>,
            <><path fillRule="evenodd" clipRule="evenodd" d="M-18.966 58.795c1.092 3.725 2.385 5.959 4.77 7.413 2.384 1.454 5.86 2.129 13.216 2.386 7.357.257 59.593.098 111.601-.026 20.007-.124 48.785-.212 65.034-.684 16.248-.472 19.966-1.33 23.766-2.832 3.799-1.502 7.679-3.648 10.872-5.343 3.193-1.694 5.699-2.936 9.418-3.834 3.719-.897 8.65-1.45 18.471-2.555 9.822-1.105 24.535-2.762 35.691-4.168 11.155-1.405 18.754-2.559 22.876-3.14 4.123-.581 4.77-.591 5.255.126.485.717.808 2.16 1.617 2.712.808.551 2.102.212 2.829-.2.728-.413 4.032-.899 5.043-.712 1.01.187 2.522 1.046 3.773 1.108 4.982.247 4.982-30.382 0-30.135-1.251.061-2.763.92-3.773 1.107-1.011.187-4.315-.298-5.043-.71-.727-.413-2.021-.753-2.829-.201-.809.551-1.132 1.995-1.617 2.712-.485.716-1.131.707-5.255.126-4.122-.582-11.721-1.736-22.876-3.14-11.156-1.407-25.869-3.064-35.691-4.169-9.821-1.105-14.752-1.657-18.471-2.555-3.718-.898-6.224-2.14-9.418-3.834-3.193-1.695-7.073-3.841-10.872-5.343-3.8-1.502-7.518-2.36-23.766-2.832-16.249-.472-45.027-.56-65.034-.684C58.613-.735 6.377-.895-.979-.638c-7.357.257-10.833.932-13.217 2.386-2.385 1.454-3.678 3.688-4.77 7.413-3.41 11.64-3.41 37.994 0 49.634z" fill="url(#paint0_linear)"/><path d="M0 0h153v68H0V0z" fill="url(#paint1_linear)"/><defs><linearGradient id="paint0_linear" x1="-21.524" y1="-.776" x2="319.002" y2="-.776" gradientUnits="userSpaceOnUse"><stop stopColor="#4FBD32"/><stop offset="1" stopColor="#165600"/></linearGradient><linearGradient id="paint1_linear" x1="-21.524" y1="-.776" x2="319.002" y2="-.776" gradientUnits="userSpaceOnUse"><stop stopColor="#4FBD32"/><stop offset="1" stopColor="#165600"/></linearGradient></defs></>,
    ]


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

            if(list.from || list.to) {
                this.isTech = true;
            }


            return (
                <CardListItem list={list} key={index} toggleDone={()=> this.props.toggleDone(index)} />
            );
        })

        let percent = this.isTech ? Math.floor((now*100)/need) : Math.floor((nowFind*100)/need);        
        let cardNow = this.isTech ? now : nowFind;
        let classTechList = this.isTech ? "card__list card__list_tech": "card__list";

        let bottlePx = Math.floor( (percent*320)/100 )


        let bottlePercentStyle = {};
        if(bottlePx > 90) {
            bottlePercentStyle = {color: "#fff"}
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
                <div className="card__bottle">
                    <div className="card__line">
                    <svg width={bottlePx} className={"svg-bottle"} height="68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {this.bottle[0]}
                    </svg>
                    </div>
                    <div className="card__percent" style={bottlePercentStyle}>{percent}%</div>
                </div>
                <div className={classTechList}>
                    {itemsCard}
                </div>
            </div>
        )
    }
}


