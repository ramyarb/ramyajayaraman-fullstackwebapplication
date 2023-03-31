/* pages/checkout.js */

import React, { useContext,useState } from "react";
import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import AppContext from "../components/context";
import Cart from "../components/cart";

function Checkout() {
  // get app context
  const {isAuthenticated,user} = useContext(AppContext);
  let stateUser = Cart.user;
  // isAuthenticated is passed to the cart component to display order button
  //const isAuthenticated  = true;
  
  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51MoouMIE8c2HMRLbLvJcsc2VTYGAMgMVAPKBm1XgWSgjLH7AfHbAIsTLuqKGewlDzAgCk53xKLK2xymqpeR2Zlqu00ivsq189n"
  );
  // if(user!="" && user!=null)
  // {

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart isAuthenticated={isAuthenticated} user={stateUser} />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
 //}
//  else
// {
//   return(
//     <Row>
//       <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
//         <h1 style={{ margin: 20 }}>Checkout</h1>
//         <Cart isAuthenticated={isAuthenticated} user={stateUser} />
//       </Col>
//       <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
//       <div><p>Please Login to proceed with Check Out</p></div>
//       </Col>
//     </Row>
//   );
// }
}

export default Checkout;
