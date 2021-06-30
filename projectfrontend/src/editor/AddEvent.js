import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import {  createEvent } from "./helper/editorapicall";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [startingtime, setStartingtime] = useState("");
  const [endingtime, setEndingtime] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [approved, setApproved] = useState("No");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token , role } = isAutheticated();

  const goBack = () => {
    return (
      <Link className="btn btn=md btn-dark mb-3" to="/editor/dashboard">
        {" "}
        Editor Home
      </Link>
    );
  };

  
  const handleChangeTitle = (event) => {
    setError("");
    setTitle(event.target.value);
  };
  const handleChangeNote = (event) => {
    setError("");
    setNote(event.target.value);
  };
  const handleChangeStart = (event) => {
    setError("");
    setStartingtime(event.target.value);
  };
  const handleChangeEnd = (event) => {
    setError("");
    setEndingtime(event.target.value);
  };
  const handleChangeDate = (event) => {
    setError("");
    setDate(event.target.value);
  };
  const handleChangeVenue = (event) => {
    setError("");
    setVenue(event.target.value);
  };
  const handleChangeApproved = (event) => {
    setError("");
    setApproved(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    console.log("FIND DATA", {title,note,startingtime,endingtime,date,venue,approved});
    console.log("FIND ROLE", isAutheticated().user.role);

    //backend request fired
    createEvent(user._id, token, {title,note,startingtime,endingtime,date,venue,approved}).then((data) => {
      if (data.error) {
        console.log("Entered DATA" , {data});
        setError(true);
      } else {
        console.log("Entered DATA" , {data});
        setError("");
        setSuccess(true);
        setTitle("");
        setNote("");
        setStartingtime("");
        setEndingtime("");
        setDate("");
        setVenue("");
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
            onChange={handleChangeTitle}
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
            onChange={handleChangeNote}
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
            onChange={handleChangeStart}
            value={startingtime}
            autoFocus
            required
          />
          <p className="lead mt-3 text-white text-left">Enter The Ending Time</p>
          <input
            type="time"
            className="form-control my-3"
            onChange={handleChangeEnd}
            value={endingtime}
            autoFocus
            required
          />
          <p className="lead mt-3 text-white text-left">Enter The Date</p>
          <input
            type="date"
            className="form-control my-3"
            onChange={handleChangeDate}
            value={date}
            autoFocus
            required
          />
          <p className="lead mt-3 text-white text-left">Enter The Venue</p>
          <input
            type="text"
            className="form-control my-2"
            onChange={handleChangeVenue}
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
