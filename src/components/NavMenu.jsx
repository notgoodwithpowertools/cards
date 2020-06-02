import React from 'react'
import { NavLink } from 'react-router-dom'

import '../css/NavMenu.css'
import Image from './Image.jsx'
import cards from '../images/cards/cards-icon2-white.png'
import logout_img from '../images/logout.png';
import user_img from '../images/man-24-128-white.png';
import info_img from '../images/information.png';

const NavMenu = ( { onLogout } ) => {

  const activeStyle = {

    // color: 'white',
    color: '#000000',
    // backgroundColor: '#E21E31',
    backgroundColor: '#ff5616',
    borderBottomStyle: 'solid',
    borderBottomColor: '#E21E31',

  }

  return (

    <div className='nav'>
      <ul className='nav_ul'>
        <li className='nav_li'><NavLink exact to="/" activeStyle={activeStyle}><Image src={user_img} height={30} width={30} /><div className='nav_text'>User</div></NavLink></li>
        <li className='nav_li'><NavLink to="/cards" activeStyle={activeStyle}><Image src={cards} height={30} width={30} /><div className='nav_text'>Cards</div></NavLink></li>
        <li className='nav_li'><NavLink to="/about" activeStyle={activeStyle} exact={true} ><Image src={info_img} height={30} width={30} /><div className='nav_text'>About</div></NavLink></li>
        <li className='nav_li'><NavLink to="/login"  activeStyle={activeStyle} onClick={ () => onLogout() }><Image src={logout_img} height={30} width={30} /><div className='nav_text'>Logout</div></NavLink></li>
        {/* <li className='nav_li'><button to="#" onClick={ () => onLogout() }><div className='nav_text'>Logout</div></button></li> */}
      </ul>
    </div>

  )

}

export { NavMenu as default}
