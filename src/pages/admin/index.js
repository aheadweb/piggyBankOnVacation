import React from 'react';

//Components
import Mounth from '../../components/mounth';
import AdminCardListItemTech from '../../components/admin-card-list-item-tech';

//Base
import base, { app } from '../../firebase';

//Style
import './style.css'
import AdminCardListItem from '../../components/admin-card-list-item';
import AddedList from '../../components/admin-card-list-added';
import Auth from '../../components/admin-auth';


//Routing

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
        this.isTech = false;
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
        this.isTech = false;
    }


    onGoalChange = (e, idCard) => {
        let nodes = e.target.parentElement.children;
        let need = nodes[0].children[0].value || 1;
        var updates = {};
        updates['/cards/' + idCard + '/need/'] = parseInt(need);
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })
        this.isTech = false;
    }

    onGoalTechChange = (e, idCard) => {
        let nodes = e.target.parentElement.children;
        let need = nodes[0].children[0].value || 1;
        let now = nodes[1].children[0].value || 1;
        var updates = {};
        updates['/cards/' + idCard + '/need/'] = parseInt(need);
        updates['/cards/' + idCard + '/now/'] = parseInt(now);
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })
        this.isTech = false;
    }

    onItemAdd = (e, idCard) => {
        let card = this.props.cards.find(card => card.id === idCard);
        if (card.list === undefined) {
            card.list = [];
        }
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let money = nodes[1].children[0].value || "";
        let done = nodes[2].children[0].checked || false;
        if (title === "" || money === "") {
            alert('Поля не заполнены')
            return;
        }

        let newCard = card.list.filter(
            function(el) { return el; }
        )

        base.ref('/cards/' + idCard + '/list/').set([
            ...newCard,
            {
                title,
                money,
                done
            }
        ], () => {
            alert('Добавлено')
        })
        this.isTech = false;
    }

    onItemAddTech = (e, idCard) => {
        
        let card = this.props.cards.find((card)=> {
            return card.id === idCard;
        });
        if (card.list === undefined) {
            card.list = [];
        }
        

        let newCard = card.list.filter(
            function(el) { return el; }
        )

    
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let from = nodes[1].children[0].value || 0;
        let to = nodes[2].children[0].value || 0;
        let done = nodes[3].children[0].checked || false;
        if (title === "") {
            alert('Поля не заполнены')
            return;
        }

        
        base.ref('/cards/' + idCard + '/list/').set([
            ...newCard,
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
        this.isTech = false;
    }

    onAuth = (e) => {
        e.preventDefault();
        let form = e.target;
        let log = form.children[0].firstElementChild.value;
        let pas = form.children[1].firstElementChild.value;
        app.auth().signInWithEmailAndPassword(log, pas)
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
            });
        this.isTech = false;
    }

    onItemDelete(e, idCard, idItem, length) {
        if (length === 1) {
            base.ref('/cards/' + idCard + '/list/' + idItem).set([
                {}
            ], () => {
                alert('Удалено');
            })
        } else {
            base.ref('/cards/' + idCard + '/list/' + idItem).remove(() => {
                alert('Удалено');
            })
        }
        this.isTech = false;
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


    onSaveTech(e, idCard, idItem) {

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
        this.isTech = false;
    }

    monthSelectCard = (e) => {
        this.props.monthSelect(e)
        this.isTech = false;
    }

    render() {

        if (!this.state.isLoaded) {
            return (
                <h1>Сканирую пользователя...</h1>
            );
        }


        if (!this.state.isAuth) {
            return (
                <Auth onSubmit={this.onAuth}
                />
            );
        }

    

        const { activeMonth, mounths, cards } = this.props;

        let adminActiveMounth = activeMonth;

        const cardsInMonth = cards.map(({ title, id, need, list, now }) => {

            if (list === undefined) {
                list = [];
            }

            let listItems = list.map(({ title, money, done, to, from }, i) => {

                if (to) {
                    this.isTech = true;
                    return (
                        <AdminCardListItemTech key={i}
                            to={to}
                            from={from}
                            done={done}
                            title={title}
                            onSaveTech={(e) => this.onSaveTech(e, id, i)}
                            onDelTech={(e) => this.onItemDelete(e, id, i, list.length)}
                        />
                    );
                }

                return (
                    <AdminCardListItem  key={i}
                        done={done}
                        money={money}
                        title={title}
                        onSave={(e) => this.onItemChange(e, id, i)}
                        onDel={(e) => this.onItemDelete(e, id, i, list.length)}
                    />
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
                                        <input type={"number"} placeholder={need} />
                                </label>
                                {this.isTech ? <label>
                                    Всего
                                                    <input type={"number"} placeholder={now} />
                                </label> : ' '}
                                {!this.isTech ? <button onClick={(e) => this.onGoalChange(e, id)}>Сохранить</button> : <button onClick={(e) => this.onGoalTechChange(e, id)}>Сохранить tech</button>}
                            </div>
                            <div className="card__list">
                                {listItems}
                            </div>
                            <AddedList 
                            onItemAdd={(e) => this.onItemAdd(e, id)}
                            onItemAddTech={(e) => this.onItemAddTech(e, id)}
                            isTech={this.isTech}/>
                            
                        </div>
                    </div>
                </div>

            );
        })

        return (
            <div className="main">
                <div className="main__title main__title_admin">Страница панели управления</div>
                <div className="main__info">
                    <Mounth activeMonth={adminActiveMounth}
                        mounths={mounths}
                        monthSelect={this.monthSelectCard}
                    />
                </div>
                <div className="main__info">
                    {cardsInMonth}
                </div>
            </div>

        );
    }
}


export default AdminPanel;