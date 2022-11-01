import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './SideBar.css';

// eslint-disable-next-line react/display-name
export default (props: any) => {
  return (
    <Menu right width={300}>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/salads">
        Salads
      </a>
      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
};
