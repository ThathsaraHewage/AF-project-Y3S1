import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getEvent,
  updateEvent
} from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateEvent = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    title: "",
    note: "",
    startingtime: "",
    endingtime: "",
    date: "",
    venue: "",
    approved: "No",
  });
  const { title, note, startingtime, endingtime, date, venue, approved} = values;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const preload = (eventId) => {
    getEvent(eventId).then((data) => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
        setValues({
          ...values,
          title: data.title,
          note: data.note,
          startingtime: data.startingtime,
          endingtime: data.endingtime,
          date: data.date,
          venue: data.venue,
          approved: data.approved
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
    preload(match.params.eventId);
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setValues({ ...values});

    //backend request fired
    updateEvent(match.params.eventId, user._id, token, {title,note,startingtime,endingtime,date,venue}).then(
      (data) => {
        if (data.error) {
          setValues({ ...values});
          setError(true);
          console.log("IF ERROR" , {data});
        } else {
        setError("");
        setSuccess(true);
        setValues({
          ...values,
          title: "",
          note: "",
          startingtime: "",
          endingtime: "",
          date: "",
          venue: "",
          approved: "",
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
            <h4 className="text-success">Event Updated Successfully</h4>
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
            <h4 className="text-danger"> Fail To Update Event</h4>
          </div>
        </div>
      );
    }
  };

  const myEventForm = () => {
    return (
      <form action="">
        <div className="form-group">
          <p className="lead mt-3 text-white text-left">Enter The Title</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange("title")}
            name="title"
            id="title"
            value={title}
            autoFocus
            required
          />

          <p className="lead mt-3 text-white text-left">Enter Short Description</p>
          <textarea
            type="text"
            className="form-control my-3"
            onChange={handleChange("note")}
            name="note"
            id="note"
            rows="5"
            value={note}
            autoFocus
            required
          />

          <p className="lead mt-3 text-white text-left">Enter The Starting Time</p>
          <input
            type="time"
            className="form-control my-3"
            onChange={handleChange("startingtime")}
            value={startingtime}
            autoFocus
            required
          />
          <p className="lead mt-3 text-white text-left">Enter The Ending Time</p>
          <input
            type="time"
            className="form-control my-3"
            onChange={handleChange("endingtime")}
            value={endingtime}
            autoFocus
            required
          />
          <p className="lead mt-3 text-white text-left">Enter The Date</p>
          <input
            type="date"
            className="form-control my-3"
            onChange={handleChange("date")}
            value={date}
            autoFocus
            required
          />
          <p className="lead mt-3 text-white text-left">Enter The Venue</p>
          <input
            type="text"
            className="form-control my-2"
            onChange={handleChange("venue")}
            value={venue}
            autoFocus
            required
          />
         <p className="lead mt-3 text-white text-left">Approve The Event</p>
          <select
              className="form-control my-2"
             onChange={handleChange("approved")}
              value={approved}>
            <option>No</option>
            <option>Yes</option>
          </select> 
        </div>
        <div className="d-grid py-4">
          <button
            onClick={onSubmit}
            className="btn btn-outline-success rounded-pill"
          >
            Update Event
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
      <Link to="/admin/dashboard" className="btn btn=md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3 py-3">
          {warningMessage()}
          {successMessage()}
          {myEventForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateEvent;
