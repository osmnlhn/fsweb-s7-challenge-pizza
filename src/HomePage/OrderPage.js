import React, { useEffect, useState } from "react";
import Order from "../OrderForm/Order";

import {
    Nav,
    NavItem,
    NavLink,
    
  } from "reactstrap";
const OrderPage = ({siparis}) => {
  const [sipariss, setSipariss] = useState();

  
  siparis(sipariss);

  
  return (
    <div >
      <div style={{background: "#6c5b7c"}}>
        <h1 style={{
            fontSize: "3.5rem",
            color: "#f8b595",
            fontFamily: "Satisfy, cursive",
          }} >Teknolojik Yemekler</h1>
        <Nav>
          <NavItem >
            <NavLink active href="/"  style={{color: "#f6c667", fontWeight: "bolder"}}>
              Anasayfa
            </NavLink >
          </NavItem>
          
          <NavItem >
            <NavLink active href="/order-pizza" style={{color: "#f6c667", fontWeight: "bolder"}}>
              Sipariş Oluştur
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Order siparisss={setSipariss} />
    </div>
  );
};
export default OrderPage;
