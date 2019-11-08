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
import AdminCardList from '../../components/admin-card-list';
import AdminCardListItemKpi from '../../components/admin-card-list-item-kpi';
import AddNewMonth from '../../components/add-new-month';


//Routing

class AdminPanel extends React.Component {


    state = {
        isAuth: null,
        isLoaded: false,
    }

    isTech = false;
    isKpi = false;

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
        this.isKpi = false;
    }


    onItemChange = (e, idCard, idItem) => {
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[1].value || "";
        let money = nodes[1].children[1].value || "";
        let done = nodes[2].children[1].checked || false;
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
        this.isKpi = false;
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
        this.isKpi = false;
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
            function (el) { return el; }
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
        this.isKpi = false;
        this.isTech = false;
    }

    onItemAddTech = (e, idCard) => {

        let card = this.props.cards.find((card) => {
            return card.id === idCard;
        });
        if (card.list === undefined) {
            card.list = [];
        }


        let newCard = card.list.filter(
            function (el) { return el; }
        )


        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let from = nodes[1].children[0].value || 1;
        let to = nodes[2].children[0].value || 1;
        let hoursCost = nodes[3].children[0].value || 1;
        let done = nodes[4].children[0].checked || false;
        if (title === "") {
            alert('Поля не заполнены')
            return;
        }
    
        base.ref('/cards/' + idCard + '/list/').set([
            ...newCard,
            {
                title,
                money: parseInt(hoursCost) * parseInt(from),
                done,
                from,
                hoursCost,
                to
            }
        ], () => {
            alert('Добавлено')
        })

        this.isKpi = false;
        this.isTech = false;
    }

    onItemAddKpi = (e, idCard) => {

        let card = this.props.cards.find((card) => {
            return card.id === idCard;
        });
        if (card.list === undefined) {
            card.list = [];
        }

        let newCard = card.list.filter(
            function (el) { return el; }
        )

        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let kpiHours = nodes[1].children[0].value || 0;
        let hoursCost = nodes[2].children[0].value || 0;
        let done = nodes[3].children[0].checked || false;
        if (title === "") {
            alert('Поля не заполнены')
            return;
        }


        base.ref('/cards/' + idCard + '/list/').set([
            ...newCard,
            {
                title,
                done,
                money: kpiHours * hoursCost,
                kpiHours,
                hoursCost
            }
        ], () => {
            alert('Добавлено')
        })

        this.isKpi = false;
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

        this.isKpi = false;
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

        this.isKpi = false;
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
        let title = nodes[0].children[1].value || "";
        let from = nodes[1].children[1].value || 0;
        let to = nodes[2].children[1].value || 0;
        let hoursCost = nodes[3].children[1].value || 0;
        let money = parseInt(nodes[4].children[1].textContent) || 0;
        let done = nodes[5].children[1].checked || false;
        var updates = {};
        
        updates['/cards/' + idCard + '/list/' + idItem] = {
            title,
            from,
            to,
            done,
            hoursCost,
            money

        };
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })

        this.isKpi = false;
        this.isTech = false;
    }


    onSaveKpi(e, idCard, idItem) {
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[1].value || "";
        let kpiHours = nodes[1].children[1].value || 0;
        let hoursCost = nodes[2].children[1].value || 0;
        let money = parseInt(nodes[3].children[1].textContent) || 0;
        let done = nodes[4].children[1].checked || false;
        var updates = {};        
        updates['/cards/' + idCard + '/list/' + idItem] = {
            title,
            done,
            money,
            kpiHours,
            hoursCost

        };
        base.ref().update(updates, () => {
            alert('Успешно сохранено')
        })

        this.isKpi = false;
        this.isTech = false;
    }


    monthSelectCard = (e) => {
        this.props.monthSelect(e)

        this.isKpi = false;
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


        let techTotal = 0;        

        const { activeMonth, mounths, cards } = this.props;

        const cardsInMonth = cards.map(({ title, id, need, list, now }) => {

            if (list === undefined) {
                list = [];
            }

            let listItems = list.map(({ title, money, done, to, from, kpiHours, hoursCost }, i) => {

                if (to) {
                    this.isTech = true;
                    techTotal += parseInt(hoursCost * from)
                    return (
                        <AdminCardListItemTech key={i + "Tech"}
                            to={to}
                            from={from}
                            done={done}
                            title={title}
                            cost={hoursCost}
                            onSaveTech={(e) => this.onSaveTech(e, id, i)}
                            onDelTech={(e) => this.onItemDelete(e, id, i, list.length)}
                        />
                    );
                }

                if (kpiHours) {
                    this.isKpi = true;
                    return (
                        <AdminCardListItemKpi key={i + "Kpi"}
                            done={done}
                            title={title}
                            hours={kpiHours}
                            cost={hoursCost}
                            onSaveKpi={(e) => this.onSaveKpi(e, id, i)}
                            onDelTech={(e) => this.onItemDelete(e, id, i, list.length)}
                        />
                    );
                }

                return (
                    <AdminCardListItem key={i + "Sample"}
                        done={done}
                        money={money}
                        title={title}
                        onSave={(e) => this.onItemChange(e, id, i)}
                        onDel={(e) => this.onItemDelete(e, id, i, list.length)}
                    />
                );
            })

            const adminCard = <AdminCardList
                need={need}
                now={now}
                onGoalChange={(e) => this.onGoalChange(e, id)}
                isTech={this.isTech}
                isKpi={this.isKpi}
            />

            const addList = <AddedList
                onItemAdd={(e) => this.onItemAdd(e, id)}
                onItemAddTech={(e) => this.onItemAddTech(e, id)}
                onItemAddKpi={(e) => this.onItemAddKpi(e, id)}
                isTech={this.isTech}
                isKpi={this.isKpi}
            />

            let helpersTotalTech = this.isTech ? <div>Всего {techTotal}</div> : " ";

            this.isKpi = false;
            this.isTech = false;

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

                            {adminCard}

                            <div className="card__list">
                                {listItems}
                                {helpersTotalTech}
                            </div>
                            {addList}
                        </div>
                    </div>
                </div>

            );


        })



        return (
            <div className="main">
                <div className="main__title main__title_admin">Страница панели управления</div>
                <div className="main__info main__info_admin">
                    <Mounth 
                        activeMonth={activeMonth}
                        mounths={mounths}
                        monthSelect={this.monthSelectCard}
                    />
                   <AddNewMonth 
                        length={this.props.length}
                        mounths={mounths}
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