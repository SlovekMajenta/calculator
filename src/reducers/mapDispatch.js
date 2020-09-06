import {clean} from './actionCreators';
import {equal} from './actionCreators';
import {operation} from './actionCreators';
import {num} from './actionCreators';

export default function mapDispatch(dispatch){
    return {
        cleaN: function(){ dispatch(clean())},
        equaL: function(){ dispatch(equal())},
        operatioN: function(value){ dispatch(operation(value))},
        nuM: function(value){ dispatch(num(value))},
    };
}