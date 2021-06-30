import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "a@gmail.com",
    password: "hello123",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const {user} = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading:true});
    signin({email,password})
    .then( data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading:false});
      }else{
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true
          });
        });
      }
    })
    .catch( console.log("sign in requied failed"));
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group py-2">
              <label className="text-light">Email</label>
              <input onChange={handleChange("email")} value={email} className="form-control" type="email" />
            </div>

            <div className="form-group py-2">
              <label className="text-light">Password</label>
              <input onChange={handleChange("password")}  value={password} className="form-control" type="password" />
            </div>
            <div className="d-grid py-4">
              <button onClick={onSubmit} className="btn btn-outline-success rounded-pill">
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/reviewer/dashboard"/>
      }else if (user && user.role === 2) {
        return <Redirect to="/editor/dashboard"/>
      }else if (user && user.role === 3) {
        return <Redirect to="/admin/dashboard"/>
      }
      else{
        return <Redirect to="/user/dashboard"/>
      }
    }

    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  const LoadingMessage = () => {
    return(
      loading && (
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
        </div>
        </div>
      )
    )
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign in page" description="A page for user to sign in!">
      {LoadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
