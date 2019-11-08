import React from 'react';


function AdminCardListItem(props) {

    const { money, title, done, onSave, onDel } = props;




    return (
        <div className="card__item">
            <label>
                <span className="label-title">Заголовок</span>
                <input defaultValue={title} type={"text"} />
            </label>
            <label>
                
                <span className="label-title">Сколько</span>
                <input defaultValue={money} type={"number"} />
            </label>
            <label>
                
                <span className="label-title">Выполнено</span>
                <input defaultChecked={done} type={"checkbox"} />
            </label>
            <button onClick={(e) => onSave(e)}>Сохранить</button>
            <button onClick={(e) => onDel(e)}>Удалить</button>
        </div>
    );

}


export default AdminCardListItem;