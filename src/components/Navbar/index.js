import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import "./style.css";

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle = {{
              fontWeight: "bold",
          }}>
            Home
          </NavLink>
          <NavLink to='/dashboard' activeStyle = {{
              fontWeight: "bold",
          }}>
            Dashboard
          </NavLink>
          <NavLink to='/update-profile' activeStyle = {{
              fontWeight: "bold",
          }}>
            Profil
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signup'>S'enregistrer</NavBtnLink>
          <NavBtnLink to='/login'>Connexion</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;