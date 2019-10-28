import React from 'react';


function AdminCardListItemTech(props) {

    const { done,to,from, title, onSaveTech, onItemDelete} = props;

    return(
        <div className="card__item">
        <label>
            Заголовок
            <input defaultValue={title} type={"text"}/>
        </label>
        <label>
            Потрачено часов
            <input defaultValue={from} type={"number"}/>
        </label>
        <label>
            Планировалось часов
            <input defaultValue={to} type={"number"}/>
        </label>
        <label>
            Выполнено
            <input defaultChecked={done} type={"checkbox"}/>
        </label>
        <button onClick={(e)=> onSaveTech(e)} >Сохранить</button>
        <button onClick={(e)=> onItemDelete(e)}>Удалить</button>
    </div>
    );
}


export default AdminCardListItemTech;