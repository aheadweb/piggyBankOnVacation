import React from 'react';

import './App.css';

//Components
import Summary from './components/summary';
import Mounth from './components/mounth';
import MonthlyAchievement from './components/monthly-achievement';
import SummaryMonth from './components/summary-month';
import Card from './components/card';

//Routing

import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";

//DataBase
import base from './firebase';


//Pages
import AdminPanel from './pages/admin';

class App extends React.Component {

  state = {
    cards: [],
    cardLoaded: false,
    activeMonth: null,
    monthTotal: 0,
  }


  
  monthNames = ["Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
                "Январь","Февраль","Март","Апрель","Май","Июнь"];

  ref = base.ref('/');
  card = base.ref('/cards');


  componentDidMount() {
    this.card.on('value', snapshot => {
      let cards = [...snapshot.val()];
      let lastActive = localStorage.getItem('act_month');
      let month;
      if (lastActive === null) {
        let monthNumber = new Date().getMonth();
        month = this.monthNow(monthNumber);
      } else {
        month = lastActive;
      }
      this.setState({
        cards,
        cardLoaded: true,
        activeMonth: month
      })
    })
  }


  monthNow(month) {
    return this.monthNames[month];
  }


  unique(arr) {
    let result = [];
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  }

  monthSelect = (e) => {
    let target = e.target;
    localStorage.setItem('act_month', target.textContent);
    if (target.classList.contains('mounth__item')) {
      this.setState({
        activeMonth: target.textContent
      })
    }
  }


  toggleDone = (idItem, idCard) => {
    var updates = {};
    updates['/cards/' + idCard + '/list/' + idItem + '/done'] = !this.state.cards[idCard].list[idItem].done;
    base.ref().update(updates, () => {
      console.log('Успешно изменнено')
    })
  }


  findIndexMonth(activeMonth) {
    if(activeMonth === null) {
      return []
    }
    let end = this.monthNames.findIndex((month)=> month === activeMonth);
    let arr = [];
    for(let i = 0; i <end; i++) {
      arr.push(this.monthNames[i])
    }

    return arr;
  }



  render() {

    const { cards, activeMonth, cardLoaded } = this.state




    //Вывод карточки по месяцу который сейчас
    const cardThisMounth = cards.filter((data) => {
      return data.month === activeMonth
    })
    
    
    let totalMonth = 0;

    let totalAll = 0;

    cards.forEach((card)=>{

      if(card.list === undefined){
        card.list = []
      }

      card.list.forEach(task => {
        if (task.done) {
          totalAll += parseInt(task.money);
        }
      });
    })

    


    const card = cardThisMounth.map((dataCard) => {

      dataCard.list.forEach(task => {
        if (task.done) {
          totalMonth += parseInt(task.money);
        }
      });

      
      return <Card data={dataCard}
        key={dataCard.id}
        toggleDone={(idItem) => this.toggleDone(idItem, dataCard.id)}
        setMonthTotal={this.setMonthTotal} />
    });


    const cardContent = cardLoaded ? card : <div className={"card__alert"}>Загружаю данные</div>

    
    //Смотрим какие месяца есть в базе
    const titleMounth = cards.map(card => card.month)
    
    return (
      <Router>
        <Switch>
          <Route extract path="/admin">
            <AdminPanel
              activeMonth={this.state.activeMonth}
              mounths={this.unique(titleMounth)}
              cards={cardThisMounth}
              monthSelect={this.monthSelect}
            />
          </Route>
          <Route extract path="/">
            <div className="main">
              <div className="main__title">Всего собрано</div>
              <Summary  totalAll={totalAll}/>
              <div className="main__info">
                <Mounth activeMonth={this.state.activeMonth}
                  mounths={this.unique(titleMounth)}
                  monthSelect={this.monthSelect} />
              </div>
              <div className="main__info main__info_row">
                <MonthlyAchievement totalMonth={totalMonth} />
                <SummaryMonth totalMonth={totalMonth}
                  activeMonth={activeMonth} />
              </div>
              <div className="main__card-list">
                {cardContent}
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
