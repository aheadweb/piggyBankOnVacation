import React from 'react';


function Summary(props) {
    return (
        <div className="summary">
            <div className="summary__wrapper">
                <div className="summary__line">
                    <div className="summary__info"></div>
                    <div className="summary__row summary__row_between">
                        <div className="summary__now">66 975 р</div>
                        <div className="summary__need">300 000 р</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;