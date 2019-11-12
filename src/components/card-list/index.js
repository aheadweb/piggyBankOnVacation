import React from 'react';


import './style.css'

function CardListItem(props) {

  const {title, money, done} = props.list;


  const className = done ? "icon-done" :"icon-done desabled";
  


  if(props.list.to){

    let styles = "card__item";

    console.log()

    if(parseInt(props.list.from) > parseInt(props.list.to)) {
      styles = "card__item card__item_tech-more" 
    }

    return (
      <div className={styles} >
        <span>{title}</span>
        <span>{props.list.from}ч</span>
        <span style={{width: "unset"}}>из</span>
        <span style={{alignSelf: "flex-end"}}>{props.list.to}ч</span>
        <span className={className} onClick={props.toggleDone}></span>
      </div>
    );
  }


  return (
    <div className="card__item" >
      <span>{title}</span>
      <span>{money}</span>
      <span className={className} onClick={props.toggleDone}></span>
    </div>
  );
}


export default CardListItem;