import React, { useState } from 'react';

function AdminCardListItemKpi (props) {

    const {title, hours, cost, done, onSaveKpi, onDelTech} = props;

    const [itemHours,setHourse] = useState(hours);

    const [itemCost,setCost] = useState(cost);


    return(
        <div className="card__item">
        <label>
            
            <span className="label-title">Заголовок</span>
            <input defaultValue={title} type={"text"}/>
        </label>
        <label>
            <span className="label-title">Потрачено часов</span>
            <input defaultValue={itemHours} onChange={(e)=> setHourse(e.target.value)} type={"number"}/>
        </label>
        <label>
            <span className="label-title">Стоимость часа</span>
            <input defaultValue={itemCost} onChange={(e)=> setCost(e.target.value)} type={"number"}/>
        </label>
        <div className={"kpi-all"}>
            <span className={"kpi-all__title"}>Итого</span>
            <span className={"kpi-all__cost"}> {itemHours * itemCost}</span>
        </div>
        <label>
            
            <span className={"kpi-all__title"}>Выполнено</span>
            <input defaultChecked={done} type={"checkbox"}/>
        </label>
        
        <button onClick={(e)=> onSaveKpi(e)} >Сохранить</button>
        <button onClick={(e)=> onDelTech(e)}>Удалить</button>
    </div>
    );
}


export default AdminCardListItemKpi;