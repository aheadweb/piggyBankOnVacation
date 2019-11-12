import React from 'react';


function SummaryMonth(props) {
    const { totalMonth } = props
    
    const monthNeed = 25000 ;
    const persent = Math.floor((totalMonth*100)/ monthNeed);
    

    const node = document.querySelector('.summary-month');

    let duckPosition = 0;

    if(node !==null) {
        //duckPosition = (totalMonth * node.getBoundingClientRect().width) / monthNeed;
        persent > 100 ? duckPosition = 100 : duckPosition = persent;
    }

    return (
        <div className="summary-month">
            <div className="summary-month__line" style={ {width: `${duckPosition}%`} }>
                <div className="summary-month__duck">
                    <div className="icon-duck"></div>
                    <div className="summary-month__percent">{persent}%</div>
                </div>
            </div>
            <div className="summary-month__now">{totalMonth} р</div>
            <div className="summary-month__need">{monthNeed}р</div>
        </div>
    );
}

export default SummaryMonth;


// function checkMonthTotal(activeMonth, monthNeed) {
//     switch(activeMonth){
//         case "Июль":
//             return monthNeed = monthNeed * 1; 
//         case "Агуст":
//             return monthNeed = monthNeed * 2; 
//         case "Сентябрь":
//             return monthNeed = monthNeed * 3; 
//         case "Октябрь":
//             return monthNeed = monthNeed * 4; 
//         case "Ноябрь":
//             return monthNeed = monthNeed * 5;
//         case "Декабрь":
//             return monthNeed = monthNeed * 6;
//         case "Январь":
//             return monthNeed = monthNeed * 7;
//         case "Февраль":
//             return monthNeed = monthNeed * 8; 
//         case "Март":
//             return monthNeed = monthNeed * 9;
//         case "Апрель":
//             return monthNeed = monthNeed * 10;
//         case "Май":
//             return monthNeed = monthNeed * 11;
//         case "Июнь":
//             return monthNeed = monthNeed * 12;
//         default:
//             break;
//     }  

// };