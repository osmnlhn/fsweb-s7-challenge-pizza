import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../HomePage/HomePage";
import OrderPage from "../HomePage/OrderPage";
import OrderSuccesPage from "../HomePage/OrderPageSucces";


const Layout = () => {
  const[siparis,setSiparis] = useState();
  const siparisDetail = (e) => {
    setSiparis(e);

    
  }

  return (
    <div className="main.container" >
     
      <div className="page-content">
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/order-pizza" element={<OrderPage siparis={siparisDetail} />}/>
          <Route path="/pizza" element={<OrderSuccesPage siparis={siparis}/>}/>
         

        </Routes>
      </div>
    </div>
  );
};
export default Layout;