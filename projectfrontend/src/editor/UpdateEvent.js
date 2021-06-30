import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getEvent,
  updateEvent
} from "./helper/editorapicall";
import { isAutheticated } from "../auth/helper/index";

const UpdateEvent = ({ match }) => {
  const { user, token } = isAutheticated();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [stratingtime, setStratingtime] = useState("");
  const [endingtime, setEndingtime] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [approved, setApproved] = useState("No");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const preload = (eventId) => {
    getEvent(eventId).then((data) => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
        setTitle(data.title);
        setNote(data.note);
        setStratingtime(data.startingtime);
        setEndingtime(data.endingtime);
        setDate(data.date);
        setVenue(data.venue);        
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
    setStratingtime(event.target.value);
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

    //backend request fired
    updateEvent(match.params.eventId, user._id, token, {title,note,stratingtime,endingtime,date,venue}).then(
      (data) => {
        if (data.error) {
          setError(true);
          console.log("IF ERROR" , {data});
        } else {
          console.log("Entered DATA" , {data});
        setError("");
        setSuccess(true);
        setTitle("");
        setNote("");
        setStratingtime("");
        setEndingtime("");
        setDate("");
        setVenue("");
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
            rows="5"
            value={note}
            autoFocus
            required
          />

          <p className="lead mt-3 text-white text-left">Enter The Starting Time</p>
          <input
            type="time"
            className="form-control my-3"
            onChange={handleChangeStart}
            value={stratingtime}
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
      <Link to="/editor/dashboard" className="btn btn=md btn-dark mb-3">
        Editor Home
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
