import React, { Component } from 'react';

import DacoonAvatar from '../images/Praise/dacoon.gif'

export default class Home extends Component {
    render() {
        return (
            <>
                <img src={DacoonAvatar}></img>
                <h1 className="text-white">다쿤을 찬양하세요</h1>
            </>
        );
    }
}
