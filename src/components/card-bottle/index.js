import React from 'react';

function Bottle(props) {

    const { bottlePx, bottlePercentStyle, percent, bottleColor, title } = props;

    
    let styleFullyBottle = {};
    let styleFullyBottleLine = {};


    let startColor1 = bottleColor === "green" ? "#4FBD32" : "#F96";
    let startColor2 = bottleColor === "green" ? "#165600" : "#FF5E62";
  

    if(bottleColor === "full") {
        startColor1 =  "#8054CD";
        startColor2 =  "#4821A8";
        styleFullyBottle = {width: "377px"};
        styleFullyBottleLine = {display: "flex", alignItems: "center"};
    }
    

    let percentText = percent === Infinity ?  "Внезапно" : `${percent}%` ;


    return (
        <div className="card__bottle" style={styleFullyBottle}>
            <div className="card__line" style={styleFullyBottleLine}>
                <svg width={bottlePx} className={"svg-bottle"} height="68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M-18.966 58.795c1.092 3.725 2.385 5.959 4.77 7.413 2.384 1.454 5.86 2.129 13.216 2.386 7.357.257 59.593.098 111.601-.026 20.007-.124 48.785-.212 65.034-.684 16.248-.472 19.966-1.33 23.766-2.832 3.799-1.502 7.679-3.648 10.872-5.343 3.193-1.694 5.699-2.936 9.418-3.834 3.719-.897 8.65-1.45 18.471-2.555 9.822-1.105 24.535-2.762 35.691-4.168 11.155-1.405 18.754-2.559 22.876-3.14 4.123-.581 4.77-.591 5.255.126.485.717.808 2.16 1.617 2.712.808.551 2.102.212 2.829-.2.728-.413 4.032-.899 5.043-.712 1.01.187 2.522 1.046 3.773 1.108 4.982.247 4.982-30.382 0-30.135-1.251.061-2.763.92-3.773 1.107-1.011.187-4.315-.298-5.043-.71-.727-.413-2.021-.753-2.829-.201-.809.551-1.132 1.995-1.617 2.712-.485.716-1.131.707-5.255.126-4.122-.582-11.721-1.736-22.876-3.14-11.156-1.407-25.869-3.064-35.691-4.169-9.821-1.105-14.752-1.657-18.471-2.555-3.718-.898-6.224-2.14-9.418-3.834-3.193-1.695-7.073-3.841-10.872-5.343-3.8-1.502-7.518-2.36-23.766-2.832-16.249-.472-45.027-.56-65.034-.684C58.613-.735 6.377-.895-.979-.638c-7.357.257-10.833.932-13.217 2.386-2.385 1.454-3.678 3.688-4.77 7.413-3.41 11.64-3.41 37.994 0 49.634z" fill={`url(#paint1_linear-${title})`} />
                <defs>
                    <linearGradient id={`paint1_linear-${title}`} x1="-21.524" y1="-.776" x2="319.002" y2="-.776" gradientUnits="userSpaceOnUse">
                        <stop stopColor={startColor1} /><stop offset="1" stopColor={startColor2} />
                    </linearGradient>
                </defs>
                   
                </svg>
                {bottleColor === "full" ? <svg width="57" height="47" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M30.176 39.845a4.567 4.567 0 004.82-2.869l8.826-22.54a4.567 4.567 0 00-1.59-5.379l-4.833-3.468-.123-.048a2.669 2.669 0 00-2.706.433 2.67 2.67 0 00-.936 2.576.59.59 0 01-.228.584l-1.556 1.16a2.685 2.685 0 00-1.042 2.66l.355 1.908a.597.597 0 01-.229.583l-1.556 1.16a2.685 2.685 0 00-1.04 2.66l.353 1.908a.589.589 0 01-.228.584l-1.556 1.16a2.685 2.685 0 00-1.041 2.66l.354 1.908c.04.22-.049.45-.229.583l-1.555 1.16c-.416.311-.724.72-.904 1.18-.18.46-.232.97-.137 1.48l.354 1.908a.59.59 0 01-.229.584 2.67 2.67 0 00-1.062 2.527 2.67 2.67 0 001.693 2.156l.123.048 5.902.734z" fill="#4D25AB"/><path d="M33.5 15.5l6 3.5-6.5-2 .5-1.5zM30.5 23l6 2-5.5-3.5-.5 1.5zM26.5 35.5l5.5 1-5-3-.5 2zM37 9.5l4.5 3.5-5-2 .5-1.5zM28.5 29l6.5 2-5.5-4.5-1 2.5z" fill="#fff"/></g><path stroke="#CBCCD0" d="M.939 14.509l16-3M4.892 18.99l16.279.02M1.081 23.681l16.062 2.651"/><defs><clipPath id="clip0"><path fill="#fff" transform="rotate(111.383 23.845 25.89)" d="M0 0h36v36H0z"/></clipPath></defs></svg> : ""}
            </div>
            <div className="card__percent" style={bottlePercentStyle}>{percentText}</div>
        </div>
    );
}

export default Bottle;