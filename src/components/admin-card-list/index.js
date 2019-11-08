import React from 'react';

function AdminCardList(props) {

    const {need, onGoalChange, isTech, isKpi} = props;

    const techEvent = <button onClick={(e) => onGoalChange(e)}>Сохранить tech</button>;
    const simpleEvent = <button onClick={(e) => onGoalChange(e)}>Сохранить</button> ;

    const kpiEvent = <button onClick={(e) => onGoalChange(e)}>Сохранить KPI</button>;

    let simpleCard = true;


    if(isTech === true || isKpi === true) {
        simpleCard = false;
    }

    return (
        <div className="card__list card__list_need">
            <label>
                Цель
                <input type={"number"} placeholder={need} />
            </label>            
            {isTech ? techEvent: ' '}

            {isKpi ? kpiEvent: ' '}
            {simpleCard ? simpleEvent: ' '}
        </div>
    );
}

export default AdminCardList;