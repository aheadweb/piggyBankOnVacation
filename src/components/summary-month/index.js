import React from 'react';


function SummaryMonth(props) {
    return (
        <div className="summary-month">
            <div className="summary-month__line">
                <div className="summary-month__duck">
                    <div className="icon-duck"></div>
                    <div className="summary-month__percent">0% </div>
                </div>
            </div>
            <div className="summary-month__now">23 100 р</div>
            <div className="summary-month__need">23 100 р</div>
        </div>
    );
}

export default SummaryMonth;