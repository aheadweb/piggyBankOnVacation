import app from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCRfQhVGUaBaEUkJEtEFR3BfgurkG2s5js",
    authDomain: "turkey-bd954.firebaseapp.com",
    databaseURL: "https://turkey-bd954.firebaseio.com",
    projectId: "turkey-bd954",
    storageBucket: "turkey-bd954.appspot.com",
    messagingSenderId: "1028275882684",
    appId: "1:1028275882684:web:8108633a7f3b2ee2f55eb9"
  };

app.initializeApp(firebaseConfig);

let base = app.database();


export default base;



  //Добавление
//   base.ref('/cards/' + 6).set({
//     id: 1, month: 'october', title: "КПИ", now: 100, need: 160000, 
//  list: [
//    {title: 'Пит стоп (супер)',money: 12000,},
//    {title: 'Чет еще',money: 11000,},
//    {title: 'Петы',money: 122000,}
//  ]

//  })


  //Подписка на обновление
  // card.on('child_added',snapshot => {
  //   const state = snapshot.val();
  //   console.log(snapshot.key)
  //   console.log(state)
  // });

//Добавление
  



//Обновление
//   var updates = {};
//   updates['/cards/' + 1] = {
//     id: 1, month: 'october', title: "Менеджер", now: 100, need: 160000, 
//     list: [
//       {title: 'Пит стоп (супер)',money: 12000,},
//       {title: 'Чет еще',money: 11000,},
//       {title: 'Петы',money: 122000,}
//     ]
//  };
//base.ref().update(updates)