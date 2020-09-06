import React from 'react'
import CalcOutput from './CalcOutput'
import ButtonsGrid from './ButtonsGrid'
import {connect} from 'react-redux';
import mapState from '../reducers/mapState';
import mapDispatch from '../reducers/mapDispatch';

const ConCalcOutput = connect(mapState, mapDispatch)(CalcOutput);
const ConButtonsGrid = connect(mapState, mapDispatch)(ButtonsGrid);

function Container(){
    return (
    <div id="container">
        <ConCalcOutput />
        <ConButtonsGrid />
    </div>
    );
} 

export default Container