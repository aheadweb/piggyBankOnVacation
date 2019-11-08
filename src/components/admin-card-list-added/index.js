import React from 'react';

function AddedList(props) {

    const { isTech, onItemAdd, onItemAddTech, isKpi, onItemAddKpi } = props;

    const isTechAdd = 
    <>
        <label>
            Потрачено часов
            <input type={"number"} />
        </label>
        <label>
            Планировалось часов
            <input type={"number"} />
        </label>
        <label>
            Стоимость часа
            <input type={"number"} />
        </label>
    </>;

    const isKpiAdd = 
    <>
        <label>
            Потрачено часов
            <input type={"number"} />
        </label>
        <label>
            Стоимость часа
            <input type={"number"} />
        </label>
    </>;

    let simpleCard = true;

    if (isTech === true || isKpi === true) {
        simpleCard = false;
    }


    const btnSimple = <button onClick={(e) => onItemAdd(e)}>Сохранить</button>;

    const btnTech = <button onClick={(e) => onItemAddTech(e)}>Сохранить tech</button>;

    const btnKpi = <button onClick={(e) => onItemAddKpi(e)}>Сохранить kPI</button>

    return (
        <div className="added-list">
            <div className="aded-list__btn">Добавить новый</div>
            <div className="admin-card__hidden">
                <label>
                    Заголовок
                    <input type={"text"} />
                </label>

                {isTech ? isTechAdd : ' '}
                
                {isKpi ? isKpiAdd : ' '}
                
                {simpleCard ? <label>Сколько <input type={"number"} /></label> : " "}
               
                <label>
                    Выполнено
                    <input type={"checkbox"} />
                </label>

                {isTech ? btnTech : ' '}
                {isKpi ? btnKpi : ' '}
                {simpleCard ? btnSimple : " "}
            </div>
        </div>);

}

export default AddedList;