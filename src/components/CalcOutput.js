import React from 'react';

function CalcOutput(props){
    return (
        <div id="calc-output">
            <p id="p-result">{props.upper}</p>
            <p id="p-current-value">{props.lower}</p>
        </div>
    );
} 

export default CalcOutput