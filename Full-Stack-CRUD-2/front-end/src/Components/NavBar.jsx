import React from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom"

const Header = styled(AppBar)`
    background: #111111
`;

const Tabs =styled(NavLink)`
    font-size: 20px;
    margin-right: 20px;
    cursor: pointer;
    color: #fff;
    text-decoration: none;
    :hover{
        opacity: 0.7;
    }
`;

const NavBar = () => {
  return (
    <Header>
      <Toolbar>
        <Tabs to="/">Code for Interviews</Tabs>
        <Tabs to="/all">All Users</Tabs>
        <Tabs to="/add">Add Users</Tabs>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
