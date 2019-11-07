import React from 'react';


function AdminCardListItem(props) {

    const { money, title, done, onSave, onDel } = props;




    return (
        <div className="card__item">
            <label>
                Заголовок
                <input defaultValue={title} type={"text"} />
            </label>
            <label>
                Сколько
                <input defaultValue={money} type={"number"} />
            </label>
            <label>
                Выполнено
                <input defaultChecked={done} type={"checkbox"} />
            </label>
            <button onClick={(e) => onSave(e)}>Сохранить</button>
            <button onClick={(e) => onDel(e)}>Удалить</button>
        </div>
    );

}


export default AdminCardListItem;