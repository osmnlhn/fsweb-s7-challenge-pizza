import React, { useEffect, useState } from "react";
import { Card, CardText, CardTitle, Nav, NavItem, NavLink } from "reactstrap";
import axios from "axios";

const OrderSuccesPage = ({ siparis }) => {
  const [lastSiparis, setLastSiparis] = useState({
    id: 1,
    name: "",
    price: 0,
    boyut: "",
    hamur: "",
    text: "",
    count: 1,
    secimler: "",
    totalPrice: "",
  });
  console.log("sucseeses", siparis);
  axios
    .get("https://reqres.in/api/users")
    .then((res) => {
      if (siparis != null) {
        setLastSiparis(siparis);
      }
    })
    .catch((err) => {
      console.error(
        "Product data çekilirken bir hata ile karşılaşıldı > ",
        err
      );
    });

  if (lastSiparis.price === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          fontFamily: "Barlow, sans-serif",
          background: "#155263",
          fontWeight: "bolder",
          color: "white",
        }}
      >
        <h1>Burada bir şey yok... </h1>
        <h2>Ama sipariş oluşturursan olur...</h2>
        <Nav card fill justified>
          <NavItem>
            <NavLink
              active
              href="/"
              style={{ color: "#f6c667", fontWeight: "bolder" }}
            >
              Anasayfa
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              active
              href="/order-pizza"
              className="p-3 mb-2 "
              style={{ color: "#f6c667", fontWeight: "bolder" }}
            >
              Sipariş Oluştur
            </NavLink>
          </NavItem>
        </Nav>
        
        <img
          className="main-Banner"
          src={require("../assets/banner.png")}
          style={{
            marginTop: "14rem",
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        
        style={{ width: "60%", margin: ".1rem 20%" }}
      >
        <h2
          style={{ fontSize: "3.5rem", fontWeight: "bolder", color: "#45171d" }}
        >
          Teknolojik Yemekler
        </h2>

        <h4 style={{ fontFamily: "Satisfy, cursive", margin: "2rem" }}>
          lezzetin yolda
        </h4>
        <h2>
          Sipariş Alındı
        </h2>

        <hr></hr>
        <br></br>

        <div
        
          style={{
            maxWidth: "50%",
          }}
        >
          <h5 >{lastSiparis.name}</h5>
          <ul>
            Boyut:<strong> {lastSiparis.boyut}</strong>{" "}
          </ul>
          <ul className="p-1">
            Hamur:<strong> {lastSiparis.hamur}</strong>{" "}
          </ul>
          <ul className="p-1">
            Ek Malzemeler:<strong>{lastSiparis.ekMalzemeler.join(", ")}</strong>{" "}
          </ul>
          <ul className="p-1">
            Sipariş Notu:<strong> {lastSiparis.text}</strong>{" "}
          </ul>
        </div>
        <Card
          body
          className="m-4"
          style={{
            width: "15rem",
          }}
        >
          <CardTitle tag="h5">Sipariş Toplamı</CardTitle>
          <CardText>
            Adet: <strong>{lastSiparis.count}</strong>
            <br></br>
            Seçimler: <strong>{lastSiparis.secimler} TL</strong>
            <br></br>
            <span>
              Toplam:{" "}
              <strong> {lastSiparis.totalPrice * lastSiparis.count} TL</strong>{" "}
            </span>
          </CardText>
        </Card>
        <footer>
          <Nav
            card
            fill
            justified
            className="border border-start-0 border-end-0"
          >
            <NavItem>
              <NavLink
                active
                href="/"
                className="p-3 mb-2 "
                style={{ color: "#f6c667", fontWeight: "bolder" }}
              >
                Anasayfa
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                active
                href="/order-pizza"
                className="p-3 mb-2 "
                style={{ color: "#f6c667", fontWeight: "bolder" }}
              >
                Sipariş Oluştur
              </NavLink>
            </NavItem>
          </Nav>
        </footer>
      </div>
    );
  }
};
export default OrderSuccesPage;