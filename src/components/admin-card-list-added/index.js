import React from 'react';

function AddedList(props) {

    const {isTech, onItemAdd, onItemAddTech} = props;

    return (
        <div className="added-list">
            <div className="aded-list__btn">Добавить новый</div>
            <div className="admin-card__hidden">
                <label>
                    Заголовок
            <input type={"text"} />
                </label>
                {!isTech ? <label>
                    Сколько
            <input type={"number"} />
                </label> : " "}
                {isTech ? <label>
                    Потрачено часов
            <input type={"number"} />
                </label> : " "}
                {isTech ? <label>
                    Планировалось часов
            <input type={"number"} />
                </label> : " "}
                <label>
                    Выполнено
            <input type={"checkbox"} />
                </label>
                {!isTech ? <button onClick={(e) => onItemAdd(e)}>Сохранить</button> : <button onClick={(e) => onItemAddTech(e)}>Сохранить tech</button>}
            </div>
        </div>);

}

export default AddedList;