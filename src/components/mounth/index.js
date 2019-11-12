import React, {useState} from 'react';




function Mounth(props) {

  const {activeMonth, mounths, monthSelect} = props;
  
  const sortNumber = {
    "Январь": 7,
    "Февраль": 8,
    "Март": 9,
    "Апрель": 10,
    "Май": 11,
    "Июнь": 12,
    "Июль": 1,
    "Август": 2,
    "Сентябрь": 3,
    "Октябрь": 4,
    "Ноябрь": 5,
    "Декабрь": 6
  }

  const valueByKey = (obj,value) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (obj[prop] === value)
          return prop;
      }
    }
  }

  const sortedArray = (mounths.map(month => sortNumber[month]))
                      .sort((a, b) => a - b)
                      .map((monthNumber) => valueByKey(sortNumber,monthNumber))
  

  const mounthsList = sortedArray.map((mounths,i) => {
    if(mounths !== activeMonth){
      return <li key={i+mounths} className="mounth__item">{mounths}</li>
    }
  })

  const [statusSelect,setStatusSelect] = useState('mounth');

  const toggleStatusSelect = (e) => {
    e.preventDefault();
    statusSelect === 'mounth' ? setStatusSelect('mounth mounth_active') : setStatusSelect('mounth');
  }

  
    return(
        <div className={statusSelect}
             onClick={(e) => toggleStatusSelect(e)}
        >
          <div className="mounth__now">{activeMonth || "Загрузка"}</div>
          <div className="mounth__select" onClick={(e)=> monthSelect(e)}>
            <ul className="mounth__list">
              {mounthsList}
            </ul>
          </div>
        </div>
    );
}


export default Mounth;