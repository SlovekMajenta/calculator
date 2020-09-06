import React from 'react';

function ButtonsGrid(props){
    
    const arr = [
        {value:'-', class:'operands', val:'-', onclick: OPER},
        {value:'+', class:'operands', val:'+', onclick: OPER},
        {value:'*', class:'operands', val:'x', onclick: OPER},
        {value:'/', class:'operands', val:'/', onclick: OPER},
        {value:'AC',class:'other', val:'AC', onclick: CLEAN},
        {value:'.', class:'other', val:'.', onclick: NUM},
        {value:'=', class:'other', val:'=', onclick: EQUAL},
        {value:'1', class:'other', val:'1', onclick: NUM},
        {value:'2', class:'other', val:'2', onclick: NUM},
        {value:'3', class:'other', val:'3', onclick: NUM},
        {value:'4', class:'other', val:'4', onclick: NUM},
        {value:'5', class:'other', val:'5', onclick: NUM},
        {value:'6', class:'other', val:'6', onclick: NUM},
        {value:'7', class:'other', val:'7', onclick: NUM},
        {value:'8', class:'other', val:'8', onclick: NUM},
        {value:'9', class:'other', val:'9', onclick: NUM},
        {value:'0', class:'other', val:'0', onclick: NUM},
    ];

    function CLEAN(){
        props.cleaN();
    }

    function EQUAL(){
        props.equaL();
    }

    function OPER(e){
        props.operatioN(e.target.value);
    }

    function NUM(e){
        props.nuM(e.target.value);
    }

    const arr2 = arr.map((elem)=> <button key={elem.value} value={elem.value} className={elem.class} onClick={elem.onclick}>{elem.val}</button>);
    return (
        <div id="buttons-grid">
            {arr2}
        </div>
    );
} 

export default ButtonsGrid