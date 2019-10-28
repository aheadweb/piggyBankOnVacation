import React from 'react';


function Summary(props) {
  
    const node = document.querySelector('.summary__line');

    let allPosition = 10;

    if(node !==null) {
        allPosition = (props.totalAll * node.getBoundingClientRect().width) / 300000;
    }

    return (
        <div className="summary">
            <div className="summary__wrapper">
                <div className="summary__line">
                    <div className="summary__info" style={{width: `${allPosition}px`}}></div>
                    <div className="summary__row summary__row_between">
                        <div className="summary__now">{props.totalAll} р</div>
                        <div className="summary__need">300 000 р</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;