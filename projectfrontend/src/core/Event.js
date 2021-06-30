import React, { useState, useEffect } from "react";
// import ImageHelper from "./helper/ImageHelper";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
// import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Event = ({
  event,
  addtoCart = true,
  removeFromCart = false,
  setReload = f => f,
  //   function(f){return f}
  reload = undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(event.count);

  const eventTitle = event ? event.title : "Title";
  const eventNote = event ? event.note : "Note";
  const eventStart = event ? event.startingtime : "Time";
  const eventStop = event ? event.endingtime : "Time";
  const eventDate = event ? event.date : "----/--/--";
  const eventVenue = event ? event.venue : "DEFAULT";

  // const addToCart = () => {
  //   addItemToCart(product, () => setRedirect(true));
  // };

  // const getARedirect = redirect => {
  //   if (redirect) {
  //     return <Redirect to="/cart" />;
  //   }
  // };

  // const showAddToCart = addtoCart => {
  //   return (
  //     addtoCart && (
  //       <button
  //         onClick={addToCart}
  //         className="btn btn-block btn-outline-success mt-2 mb-2"
  //       >
  //         Add to Cart
  //       </button>
  //     )
  //   );
  // };

  // const showRemoveFromCart = removeFromCart => {
  //   return (
  //     removeFromCart && (
  //       <button
  //         onClick={() => {
  //           removeItemFromCart(product._id);
  //           setReload(!reload);
  //         }}
  //         className="btn btn-block btn-outline-danger mt-2 mb-2"
  //       >
  //         Remove from cart
  //       </button>
  //     )
  //   );
  // };
  const eventLeft = () => {
    return (
      <div className="border border-0 ">
        <ul className="list-group">
          <li className="list-group-item bg-dark">
            <div className="card-header lead"><p className="cory2">{eventTitle}</p></div>
          </li>
          <li className="list-group-item bg-dark">
           <div className="card-header lead "><p className="cory">{eventNote}</p></div>
          </li>
        </ul>
      </div>
    );
  };

  const eventRight = () => {
    return (
      <div className="card border-0">
        <ul className="list-group text-right">
        <li className="list-group-item bg-dark">
            <div className="card-header lead"> 
              <p className="cory"><i className="fas fa-calendar-day m-2"></i>Date: {eventDate}</p>
            </div>
            </li>
            <li className="list-group-item bg-dark">
              <div className="card-header lead">
                <p className="cory"><i className="fas fa-clock m-2"></i>Time: {eventStart} - {eventStop}</p>
              </div>
            </li>
            <li className="list-group-item bg-dark">
             <div className="card-header lead">
               <p className="cory"><i className="fas fa-map-marked-alt m-2"></i>Venue: {eventVenue}</p>
               </div>
            </li>
        </ul>
      </div>
    );
  };
  return (
    <div className="card text-white bg-dark text-lg border border-info ">
      <div className="row">
        <div className="col-8 text-white ">{eventLeft()}</div>
        <div className="col-4 text-white ">{eventRight()}</div>
      </div>
    </div>
  );
};

export default Event;
