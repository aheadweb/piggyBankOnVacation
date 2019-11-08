import React from 'react';

import './style.css'
import base from '../../firebase';


function AddNewMonth(props) {

    const { mounths, length } = props;

    const monthNames = ["Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"];

    let different = [];

    let diff = (a1, a2) => {
        return a1.filter(i => !a2.includes(i))
            .concat(a2.filter(i => !a1.includes(i)))
    }

    different = diff(monthNames, mounths);

    if (diff.length === 0) {
        return (
            <div className="add-month">
                <div className="add-month__title">Все месяца добавлены</div>
            </div>
        );
    }

    let lengthMonth = parseInt(length);

    const addMonth = (e) =>{
        e.preventDefault();
        let value = e.target.children[0].value;
        e.target.children[1].disabled = true;

        base.ref(`/cards/${lengthMonth}` ).set({
            "id" : `${lengthMonth}`,
            "list" : [
            {
              "done" : true,
              "hoursCost" : 1,
              "kpiHours" : 1,
              "money" : "100",
              "title" : "Тестовое поле"
            }
            ],
            "month" : `${value}`,
            "need" : 1000,
            "now" : 100,
            "title" : "КПИ"
          }, () => {
                    console.log('Добавлено')
                })
        
        base.ref(`/cards/${lengthMonth + 1}`).set({
            "id" : lengthMonth + 1,
            "list" : [
            {
              "done" : false,
              "money" : 1000,
              "title" : "Тестовое поле"
            } 
            ],
            "month" : `${value}`,
            "need" : 1000,
            "now" : 100,
            "title" : "Менеджмент"
          }, () => {
                    console.log('Добавлено')
                })
        
        base.ref(`/cards/${lengthMonth + 2}`).set({
            "id" : lengthMonth + 2,
            "list" : [ 
            {
              "done" : true,
              "money" : "500",
              "title" : "Тестовое поле"
            }],
            "month" : `${value}`,
            "need" : 1000,
            "now" : 100,
            "title" : "Процессы"
          }, () => {
                    console.log('Добавлено')
                })
        
        base.ref(`/cards/${lengthMonth + 3}`).set({
            "id" : lengthMonth + 3,
            "list" : [ 
            {
              "done" : true,
              "money" : "500",
              "title" : "Тестовое поле"
            }],
            "month" : `${value}`,
            "need" : 1000,
            "now" : 100,
            "title" : "Доклады"
          }, () => {
                    console.log('Добавлено')
                })
        
        base.ref(`/cards/${lengthMonth + 4}`).set(
            {
            "id" : lengthMonth + 4,
            "list" : [ {
              "done" : false,
              "money" : "500",
              "title" : "Ира"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Вова"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Анжелика"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Саша К"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Саша Е"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Илья"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Никита"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Паша"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Миша"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Антон"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Виталя"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Дина"
            }, {
              "done" : false,
              "money" : "500",
              "title" : "Лена"
            } ],
            "month" : `${value}`,
            "need" : 1000,
            "now" : 100,
            "title" : "ИПР"
          }, () => {
                    console.log('Добавлено')
                })
        
        
        
        base.ref(`/cards/${lengthMonth + 5}`).set({
            "id" : lengthMonth + 5,
            "list" : [
            {
              "done" : true,
              "from" : "10",
              "hoursCost" : "1",
              "money" : 123,
              "title" : "Тестовое поле",
              "to" : "1"
            } ],
            "month" : `${value}`,
            "need" : 1000,
            "now" : 100,
            "title" : "Техподдержка"
          }, () => {
                    alert('Добавлено')
                })
        
    }

    const monthAdd = different.map((month,i)=> <option key={month+i} value={month} name={i}>{month}</option>)

    return (
        <div className="add-month">
            <div className="add-month__title">Добавить новый месяц</div>
            <form id="form-selectmonth" className="add-month__form" onSubmit={addMonth}>
                <select form={"form-selectmonth"} className="add-month__selcet" name={"select-month"}>
                    {monthAdd}
                </select>
                <button className="add-month__button">Добавить</button>
            </form>
        </div>
    );

}

export default AddNewMonth;