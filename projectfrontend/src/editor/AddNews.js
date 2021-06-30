import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { createNews } from "./helper/editorapicall";

const AddNews = () => {
  const [values, setValues] = useState({
    date: "",
    short: "",
    full: ""
  });
  const { date, short, full} = values;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();
  const goBack = () => {
    return (
      <Link className="btn btn=md btn-dark mb-3" to="/editor/dashboard">
        {" "}
        Editor Home
      </Link>
    );
  };

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setValues({ ...values});
    //backend request fired
    createNews(user._id, token, { date,short,full}).then((data) => {
      if (data.error) {
        setValues({ ...values});
        setError(true);
        console.log("IF ERROR" , {data});
      } else {
        setSuccess(true);
        setValues({
        ...values,
        date: "",
        short: "",
        full: ""
      });
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-center alert alert-success">
            <h4 className="text-success">News Added Successfully</h4>
          </div>
        </div>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-center alert alert-danger">
            <h4 className="text-danger"> Fail To Add News</h4>
          </div>
        </div>
      );
    }
  };

  const myCategoryForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead mt-3 text-white text-left">Enter The Date</p>
          <input
            type="date"
            className="form-control my-3"
            onChange={handleChange("date")}
            value={date}
            autoFocus
            required
          />

          <p className="lead mt-3 text-white text-left">Enter The Title</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("short")}
            value={short}
            autoFocus
            required
          />

          <p className="lead mt-3 text-white text-left">Enter The Additional Deails</p>
          <textarea
            type="text"
            className="form-control my-3"
            onChange={handleChange("full")}
            value={full}
            autoFocus
            required="true"
            rows="5"
          />
        </div>
        <div className="d-grid py-4">
          <button
            onClick={onSubmit}
            className="btn btn-outline-success rounded-pill"
          >
            Add News
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Add Latest News Form Here"
      description="Add your news"
      className="container bg-success p-4 "
    >
      {goBack()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3 py-3">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddNews;
