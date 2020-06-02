import React from 'react'

import logo from '../images/svg/logo.svg';
import '../css/ReactSpinner.css';

const ReactSpinner = () => {

    return (
        <div className='ReactSpinner'>
            <img src={logo} className="RS-logo" alt="logo" />
        </div>
    )

}

export { ReactSpinner as default }