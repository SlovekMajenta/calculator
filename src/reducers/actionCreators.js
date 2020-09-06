function clean(){
    return {type:'CLEAN'};
}

function equal(){
    return {type:'EQUAL'};
}

function operation(value){
    return {
        type:'OPERATION',
        payload:{
            operand:value
        } 
    };
}

function num(value){
    return {
        type:'NUMBER',
        payload:{
            value:value
        } 
    };
}


export {clean};
export {equal};
export {operation};
export {num};