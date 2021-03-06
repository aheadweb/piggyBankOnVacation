import React, { useState } from 'react';

function AdminCardListItemTech(props) {

    const { done,to,from, title, onSaveTech, onDelTech,cost} = props;

    
    const [itemHours,setHourse] = useState(from);

    const [itemCost,setCost] = useState(cost);

    return(
        <div className="card__item">
        <label>
            <span  className="label-title">Заголовок</span>
            <input defaultValue={title} type={"text"}/>
        </label>
        <label>
            <span className="label-title">Потрачено часов</span>
            <input defaultValue={itemHours} onChange={(e)=> setHourse(e.target.value)} type={"number"}/>
        </label>
        <label>
            <span className="label-title">Планировалось часов</span>
            <input defaultValue={to} type={"number"}/>
        </label>
        <label>
            
            <span  className="label-title">Стоимость часа</span>
            <input defaultValue={itemCost}  onChange={(e)=> setCost(e.target.value)} type={"number"}/>
        </label>
        <div className={"kpi-all"}>
            <span className={"kpi-all__title"}>Итого</span>
            <span className={"kpi-all__cost"}> {itemHours * itemCost}</span>
        </div>
        <label>
            
            <span  className="label-title">Выполнено</span>
            <input defaultChecked={done} type={"checkbox"}/>
        </label>
        <button onClick={(e)=> onSaveTech(e)} >Сохранить</button>
        <button onClick={(e)=> onDelTech(e)}>Удалить</button>
    </div>
    );
}


export default AdminCardListItemTech;