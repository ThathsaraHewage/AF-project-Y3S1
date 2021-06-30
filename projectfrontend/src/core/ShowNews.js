import React, { useState, useEffect } from "react";
import Base from "./Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper/index";
import { getNews } from "./helper/coreapicalls";

const ShowNews = ({ match }) => {
  const { user, token } = isAutheticated();

  const [date, setDate] = useState("");
  const [short, setShort] = useState("");
  const [full, setFull] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const preload = (newsId) => {
    getNews(newsId).then((data) => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
         setDate(data.date);
         setShort(data.short);
         setFull(data.full);        
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

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   setError("");
  //   setSuccess(false);

  //   //backend request fired
  //   updateNews(match.params.newsId, user._id, token, { date,short,full }).then(
  //     (data) => {
  //       if (data.error) {
  //         setError(true);
  //         console.log("IF ERROR" , {data});
  //       } else {
  //         setError("");
  //         setSuccess(true);
  //         setDate("");
  //         setShort("");
  //         setFull("");
  //         console.log("IF SUCCESS" , {data});
  //       }
  //     }
  //   );
  // };

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
          <p className="lead mt-3 text-white text-center">{date}</p>
          {/* <input
            type="date"
            className="form-control my-3"
            onChange={handleChange1}
            value={date}
            autoFocus
            required
          /> */}

          <p className="lead mt-3 text-white text-center">{short}</p>
          {/* <input
            type="text"
            className="form-control my-3"
            onChange={handleChange2}
            value={short}
            autoFocus
            required
          /> */}

          <p className="lead mt-3 text-white text-left">{full}</p>
          {/* <input
            type="text"
            className="form-control my-3"
            onChange={handleChange3}
            value={full}
            autoFocus
            required
          /> */}
        </div>
        {/* <div className="d-grid py-4">
          <button
            onClick={onSubmit}
            className="btn btn-outline-success rounded-pill"
          >
            Update News
          </button>
        </div> */}
      </form>
    );
  };

  return (
    <Base
      title="News of the day"
      description=""
      className="container bg-info p-4"
    >
      <Link to="/" className="btn btn-md btn-dark mb-3">
         Home
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

export default ShowNews;
