import React from 'react';

//Components
import Mounth from '../../components/mounth';
import AdminCardListItemTech from '../../components/admin-card-list-item-tech';

//Base
import base, { app } from '../../firebase';

//Style
import './style.css'


//Routing

import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";



class AdminPanel extends React.Component {


    state = {
        isAuth: null,
        isLoaded: false,
    }

    isTech = false;

    componentDidMount() {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isAuth: true,
                    isLoaded: true
                })
            } else {
                this.setState({
                    isAuth: false,
                    isLoaded: true
                })
            }
        });
    }


    onItemChange = (e, idCard, idItem) => {
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let money = nodes[1].children[0].value || "";
        let done = nodes[2].children[0].checked || false;
        var updates = {};
        updates['/cards/' + idCard + '/list/' + idItem] = {
            title,
            money,
            done
        };
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })
    }


    onGoalChange = (e,idCard) => {
        let nodes = e.target.parentElement.children;
        let need = nodes[0].children[0].value || 1;
        var updates = {};
        updates['/cards/' + idCard + '/need/'] = parseInt(need);
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })
    }

    onGoalTechChange = (e,idCard) => {
        let nodes = e.target.parentElement.children;
        let need = nodes[0].children[0].value || 1;
        let now = nodes[1].children[0].value || 1;
        var updates = {};
        updates['/cards/' + idCard + '/need/'] = parseInt(need);
        updates['/cards/' + idCard + '/now/'] = parseInt(now);
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })
    }

    onItemAdd = (e, idCard) => {
        let card = this.props.cards.find(card => card.id === idCard);
        if(card.list === undefined) {
            card.list = [];
        }        
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let money = nodes[1].children[0].value || "";
        let done = nodes[2].children[0].checked || false;
        if(title === "" || money === "") {
            alert('Поля не заполнены')
            return;
        }
        base.ref('/cards/' + idCard + '/list/').set([
            ...card.list,
            {
                title,
                money,
                done
            }
        ], () => {
            alert('Добавлено')
        })
    }

    onItemAddTech = (e, idCard) => {
        let card = this.props.cards.find(card => card.id === idCard);
        if(card.list === undefined) {
            card.list = [];
        }        
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let from = nodes[1].children[0].value || 0;
        let to = nodes[2].children[0].value || 0;
        let done = nodes[3].children[0].checked || false;
        if(title === "") {
            alert('Поля не заполнены')
            return;
        }
        base.ref('/cards/' + idCard + '/list/').set([
            ...card.list,
            {
                title,
                money: 0,
                done,
                from,
                to
            }
        ], () => {
            alert('Добавлено')
        })
    }

    onAuth = (e) => {
        e.preventDefault();
        let form = e.target;
        let log = form.children[0].firstElementChild.value;
        let pas = form.children[1].firstElementChild.value;
        app.auth().signInWithEmailAndPassword(log, pas)
            .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
              } else {
                alert(errorMessage);
              }
          });
    }

    onItemDelete(e, idCard, idItem,length) {
        if(length === 1) {
            base.ref('/cards/' + idCard + '/list/' + idItem).set([
                {}
            ],() => {
                alert('Удалено');
            })
        } else {
            base.ref('/cards/' + idCard + '/list/' + idItem).remove(() => {
                alert('Удалено');
            })
        }
    }

    togglePanel(e, id) {
        let target = e.target;
        if (target.className === 'admin-card__wrapper') {

            let children = target.parentElement.children;
            let cardList = children[1];
            let cardList2 = children[2];
            let addedList = children[3];

            cardList2.classList.toggle('open');
            cardList.classList.toggle('open');
            addedList.classList.toggle('open');
        }

    }


    onSaveTech(e,idCard,idItem) {
        
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let from = nodes[1].children[0].value || 0;
        let to = nodes[2].children[0].value || 0;
        let done = nodes[3].children[0].checked || false;
        var updates = {};
        updates['/cards/' + idCard + '/list/' + idItem] = {
            title,
            from,
            to,
            done,
            money: 0

        };
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })
    }

    render() {

        if (!this.state.isLoaded) {
            return(
                <h1>Сканирую пользователя...</h1>
            );
        }


        if (!this.state.isAuth) {
            return (
                <div className="main">
                    <div className="auth main__info admin-card__hidden">
                        <h1>Пользователь не авторизован</h1>
                        <h2>ВВедите логин и пароль</h2>
                        <form onSubmit={this.onAuth}>
                        <label htmlFor={"admin-log"}>
                            Логин
                        <input defaultValue="admin" name={"mail"} id={"admin-log"}/>
                        </label>
                        <label htmlFor={"admin-pas"}>
                            Пароль
                        <input defaultValue="admin" name={"pas"} id={"admin-pas"}/>
                        </label>
                        <button type={"submit"}>
                            Вход
                        </button>
                        </form>
                    </div>
                </div>
            );
        }

        const { activeMonth, mounths, cards, monthSelect } = this.props;

        let adminActiveMounth = activeMonth;

        const cardsInMonth = cards.map(({ title, id, need, list, now }) => {

            if(list === undefined){
                list = [];
            }

            let listItems = list.map(({ title, money, done,to,from }, i) => {

                if(to) {
                    this.isTech = true;
                    return (
                       <AdminCardListItemTech key={i} 
                                    to={to} 
                                    from={from} 
                                    done={done} 
                                    title={title}
                                    onSaveTech={(e)=> this.onSaveTech(e,id,i)}
                                    onDelTech={(e)=>this.onItemDelete(e,id,i,list.length)}
                                    />
                    );
                }

                return (
                    <div className="card__item" key={i}>
                        <label>
                            Заголовок
                            <input defaultValue={title} type={"text"}/>
                        </label>
                        <label>
                            Сколько
                            <input defaultValue={money} type={"number"}/>
                        </label>
                        <label>
                            Выполнено
                            <input defaultChecked={done} type={"checkbox"}/>
                        </label>
                        <button onClick={(e) => this.onItemChange(e, id, i)}>Сохранить</button>
                        <button onClick={(e) => this.onItemDelete(e, id, i, list.length)}>Удалить</button>
                    </div>
                );
            })

            return (
                <div className="card card_admin" key={id} >
                    <div className="card__list">
                        <div className="card__item card__item_admin" >
                            <div className="admin-card__wrapper" onClick={(e) => this.togglePanel(e, id)}>
                                <div className="admin-card__title">{title}</div>
                                <div className="admin-card__update">
                                    <img src="https://img.icons8.com/carbon-copy/100/000000/approve-and-update.png" alt={"Icon"} />
                                </div>
                            </div>
                            <div className="card__list card__list_need">
                                <label>
                                    Цель
                                        <input type={"number"} placeholder={need}/>
                                </label>
                                {this.isTech ?  <label>
                                                    Всего
                                                    <input type={"number"} placeholder={now}/>
                                                </label> : ' '}
                                {this.isTech ? <button onClick={(e) => this.onGoalTechChange(e, id)}>Сохранить tech</button> : <button onClick={(e) => this.onGoalChange(e, id)}>Сохранить</button>}                
                            </div>
                            <div className="card__list">
                                {listItems}
                            </div>
                            <div className="added-list">
                                <div className="aded-list__btn">Добавить новый</div>
                                <div className="admin-card__hidden">
                                    <label>
                                        Заголовок
                                        <input type={"text"}/>
                                    </label>
                                    {!this.isTech ? <label>
                                        Сколько
                                        <input type={"number"} />
                                    </label> : " "}
                                    {this.isTech ? <label>
                                        Потрачено часов 
                                        <input type={"number"} />
                                    </label> : " "}
                                    {this.isTech ? <label>
                                        Планировалось часов
                                        <input type={"number"} />
                                    </label> : " "}
                                    <label>
                                        Выполнено
                                        <input type={"checkbox"} />
                                    </label>
                                    {!this.isTech ? <button onClick={(e) => this.onItemAdd(e, id)}>Сохранить</button> : <button onClick={(e) => this.onItemAddTech(e, id)}>Сохранить tech</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        })

        return (
            <Router>
                <Switch>
                    <Route extract path="/admin">
                        <div className="main">
                            <div className="main__title main__title_admin">Страница панели управления</div>
                            <div className="main__info">
                                <Mounth activeMonth={adminActiveMounth}
                                    mounths={mounths}
                                    monthSelect={monthSelect}
                                />
                            </div>
                            <div className="main__info">
                                {cardsInMonth}
                            </div>
                        </div>
                    </Route>
                </Switch>
            </Router>

        );
    }
}


export default AdminPanel;