import React from 'react';


import './style.css'

function CardListItem(props) {

  const {title, money, done} = props.list;


  const className = done ? "icon-done" :"icon-done desabled";
  



  return (
    <div className="card__item" >
      <span>{title}</span>
      <span></span>
      <span>{money}</span>
      <span className={className} onClick={props.toggleDone}></span>
    </div>
  );
}


export default CardListItem;