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

import data from './data';
import base from './firebase';
import AdminPanel from './pages/admin';




class App extends React.Component {

  state = {
    cards: [],
    cardLoaded: false,
    activeMonth: null,
  }

  monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  fakeData = data.october.cards;
  ref = base.ref('/');
  card = base.ref('/cards');


  componentDidMount() {
    let monthNumber = new Date().getMonth();
    let month = this.monthNow(monthNumber);

  

    this.card.on('value', snapshot => {
      let cards = [...snapshot.val()]
      this.setState({
        cards,
        cardLoaded: true,
        activeMonth: month
      }, () => console.log(this.state))
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
    if (target.classList.contains('mounth__item')) {
      this.setState({
        activeMonth: target.textContent
      })
    }
  }





  render() {

    const { cards, activeMonth, cardLoaded } = this.state


    //Вывод карточки по месяцу который сейчас
    const cardThisMounth = cards.filter((data) => {
      return data.month === activeMonth
    })
    const card = cardThisMounth.map((dataCard) => {
      return <Card data={dataCard} key={dataCard.id} />
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
              <Summary />
              <div className="main__info">
                <Mounth activeMonth={this.state.activeMonth}
                  mounths={this.unique(titleMounth)}
                  monthSelect={this.monthSelect} />
              </div>
              <div className="main__info main__info_row">
                <MonthlyAchievement />
                <SummaryMonth />
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
