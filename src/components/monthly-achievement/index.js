import React from 'react';

import './style.css'

function MonthlyAchievement(props) {
      const {totalMonth} = props

      let classNam ;


   

    totalMonth >= 25000 ? classNam = "monthly-achievement__checked icon-checked icon-checked-done" : classNam = "monthly-achievement__checked icon-checked"
    
    return (
        <div className="monthly-achievement">
            <div className="monthly-achievement__bg"><svg width="223" height="93" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 .5L223 13l-14 64.5L22 93 0 .5z" fill="#EDBF32" /></svg></div>
            <div className="monthly-achievement__need">25 000 р</div>
            <div className={classNam}></div>
        </div>
    );
}

export default MonthlyAchievement;