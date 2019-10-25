import React from 'react';

//Components
import Mounth from '../../components/mounth';

//Base
import base from '../../firebase';

//Style
import './style.css'


//Riouting

import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";

class AdminPanel extends React.Component {

    onItemChange = (e,idCard,idItem) => {
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let money = nodes[1].children[0].value || "";
        console.log(title,money)
          var updates = {};
          updates['/cards/' + idCard + '/list/' + idItem] = {
              title,
              money
         };
         base.ref().update(updates,()=> {
             alert('Успешно сохранено')
         })
    }

    onItemAdd = (e, idCard) => {
        let card = this.props.cards.find(card => card.id === idCard);
        let nodes = e.target.parentElement.children;
        let title = nodes[0].children[0].value || "";
        let money = nodes[1].children[0].value || "";
        base.ref('/cards/' + idCard + '/list/').set([
            ...card.list,
            {
                title,
                money
            }
        ],()=> {
            alert('Добавлено')
        })
    }


    togglePanel(e,id) {
        let target = e.target;
        if(target.className === 'admin-card__wrapper'){
            
            let children = target.parentElement.children;
            let cardList = children[1];
            let addedList = children[2];

            cardList.classList.toggle('open');
            addedList.classList.toggle('open');
        }
        
    }

    render() {

        const { activeMonth, mounths, cards, monthSelect } = this.props;

        let adminActiveMounth = activeMonth;

        const cardsInMonth = cards.map(({ title, id, need, now, list }) => {

            let listItems = list.map(({ title, money }, i) => {
                return (
                    <div className="card__item" key={i}>
                        <label>
                            Заголовок
                            <input defaultValue={title}/>
                        </label>
                        <label>
                            Сколько
                            <input defaultValue={money} />
                        </label>
                        <button onClick={(e) => this.onItemChange(e,id,i)}>Сохранить</button>
                        <button style={{opacity: 0.4}}>Удалить</button>
                    </div>
                );
            })

            return (
                <div className="card card_admin" key={id} >
                    <div className="card__list">
                        <div className="card__item card__item_admin" >
                            <div className="admin-card__wrapper" onClick={(e)=>this.togglePanel(e,id)}>
                                <div className="admin-card__title">{title}</div>
                                <div className="admin-card__update">
                                    <img src="https://img.icons8.com/carbon-copy/100/000000/approve-and-update.png" />
                                </div>
                            </div>
                            <div className="card__list">
                                {listItems}
                            </div>
                            <div className="added-list">
                                <div className="aded-list__btn">Добавить новый</div>
                                <div className="admin-card__hidden">
                                    <label>
                                        Заголовок
                                        <input />
                                    </label>
                                    <label>
                                        Сколько
                                        <input  />
                                    </label>
                                    <button onClick={(e)=> this.onItemAdd(e,id)}>Сохранить</button>
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