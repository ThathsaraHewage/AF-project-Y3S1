import React, { useState} from "react";
import { Link } from "react-router-dom";

const Card = ({
  news,
  // addtoCart = true,
  // removeFromCart = false,
  // setReload = (f) => f,
  // //   function(f){return f}
  // reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(news.count);

  const cardDate = news ? news.date : "----/--/--";
  const cardTitle = news ? news.short : "Title";
  const cardFull = news ? news.full : "DEFAULT";

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
  return (
    <div className="card text-white bg-dark text-lg border border-info ">
      <div className="card-header lead cory2">{cardDate}</div>
      <div className="card-header lead cory cory2">{cardTitle}</div>
      <div className="card-body">
        <div className="cory mb-2">
          {cardFull.length > 200 ? (
            <div>
              {`${cardFull.substring(0, 200)}...`}
              <div className="row">
                <div className="col-12">
                  <Link className="mt-3 btn btn-info" to={`/news/${news._id}`}>
                    <span className="">Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <p>{cardFull}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
