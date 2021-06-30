import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory, createNews } from "./helper/editorapicall";

const AddNews = () => {
  const [date, setDate] = useState("");
  const [short, setShort] = useState("");
  const [full, setFull] = useState("");
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

  const handleChange1 = (event) => {
    setError("");
    setDate(event.target.value);
  };
  const handleChange2 = (event) => {
    setError("");
    setShort(event.target.value);
  };
  const handleChange3 = (event) => {
    setError("");
    setFull(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createNews(user._id, token, { date,short,full }).then((data) => {
      if (data.error) {
        setError(true);
        console.log("IF ERROR" , {data});
      } else {
        setError("");
        setSuccess(true);
        setDate("");
        setShort("");
        setFull("");
        console.log("IF SUCCESS" , {data});
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
            onChange={handleChange1}
            value={date}
            autoFocus
            required
          />

          <p className="lead mt-3 text-white text-left">Enter The Deails</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange2}
            value={short}
            autoFocus
            required
          />

          <p className="lead mt-3 text-white text-left">Enter The Additional Deails</p>
          <textarea
            type="text"
            className="form-control my-3"
            onChange={handleChange3}
            value={full}
            autoFocus
            required
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
