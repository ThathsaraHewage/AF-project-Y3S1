import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getNews,
  updateNews,
} from "./helper/editorapicall";
import { isAutheticated } from "../auth/helper/index";


const UpdateNews = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    date: "",
    short: "",
    full: ""
  });
  const { date, short, full} = values;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const preload = (newsId) => {
    getNews(newsId).then((data) => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
        setValues({
          ...values,
          date: data.date,
          short: data.short,
          full: data.full
        });       
      }
    });
  };

  // const preloadCategories = () => {
  //   getAllNews().then((data) => {
  //     if (data.error) {
  //       console.log("TRYING TO FIND ERROR", data.err);

  //       setValues({ ...values, error: data.error });
  //     } else {
  //       setValues({
  //         categories: data,
  //         formData: new FormData(),
  //       });
  //     }
  //   });
  // };

  useEffect(() => {
    preload(match.params.newsId);
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setValues({ ...values});

    //backend request fired
    updateNews(match.params.newsId, user._id, token, { date,short,full }).then(
      (data) => {
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
      }
    );
  };
  const successMessage = () => {
    if (success) {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-center alert alert-success">
            <h4 className="text-success">News Updated Successfully</h4>
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
            <h4 className="text-danger"> Fail To Update News</h4>
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

          <p className="lead mt-3 text-white text-left">Enter The Deails</p>
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
            required
            rows="5"
          />
        </div>
        <div className="d-grid py-4">
          <button
            onClick={onSubmit}
            className="btn btn-outline-success rounded-pill"
          >
            Update News
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update NEWS Details Here!"
      description="News update section"
      className="container bg-success p-4"
    >
      <Link to="/editor/dashboard" className="btn btn=md btn-dark mb-3">
        Editor Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3 py-3">
          {warningMessage()}
          {successMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateNews;
