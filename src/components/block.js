import React, { Component } from 'react'
import './block.css'

class block extends Component {

    inCommas(num){
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }

    convertToDate(time){
        var date = "";
        var l = time.length, i = 0;
        for(i=0; i<l; i++){
            if(time.charAt(i)==='T') break;
        }
        date = time.substring(0, i);
        return date
    }
    render() {
        const {obj, des, time, color} = this.props;
        var date = this.convertToDate(time);
        var number = this.inCommas(obj)
        return (
            <div className="block" id={color}>
                <p>{des[0]}</p>
                <h3>{number}</h3>
                <p id="time">{date}</p>
                <p>{des[1]}</p>
            </div>
        )
    }
}

export default block
