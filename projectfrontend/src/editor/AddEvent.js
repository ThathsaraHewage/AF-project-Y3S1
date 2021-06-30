import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import {  createEvent } from "./helper/editorapicall";

const AddEvent = () => {
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

  const { user, token , email } = isAutheticated();
  const editoremail = user.email;
 
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

    // console.log("FIND DATA", {title,note,startingtime,endingtime,date,venue,editoremail,approved});
    // console.log("FIND ROLE", isAutheticated().user.role);

    //backend request fired
    createEvent(user._id, token, {title,note,startingtime,endingtime,date,venue,editoremail,approved}).then((data) => {
      if (data.error) {
        setValues({ ...values});   
        setError(true);
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
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-center alert alert-success">
            <h4 className="text-success">Event Created Successfully</h4>
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
            <h4 className="text-danger"> Fail To Created Event</h4>
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
            rows="3"
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
        </div>
        <div className="d-grid py-4">
          <button
            onClick={onSubmit}
            className="btn btn-outline-success rounded-pill"
          >
            Create Event
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create Event Here"
      description="Add a new Event for..."
      className="container bg-success p-4 "
    >
      {goBack()}
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 mt-3 py-3">
          {successMessage()}
          {warningMessage()}
          {myEventForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddEvent;
