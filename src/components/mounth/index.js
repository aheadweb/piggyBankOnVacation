import React, {useState} from 'react';




function Mounth(props) {

  const {activeMonth, mounths, monthSelect} = props;
  
 


  const mounthsList = mounths.map((mounths,i) => <li key={i+mounths} className="mounth__item">{mounths}</li>)


  const [statusSelect,setStatusSelect] = useState('mounth')

  const toggleStatusSelect = (e) => {
    e.preventDefault()
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