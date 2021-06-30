import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { deleteEvent, getAllEventsNo } from "./helper/adminapicall";

const ManageNotApprovedEvents = () => {
  const [events, setEvents] = useState([]);

  const { user, token } = isAutheticated();
  const preload = () => {
    getAllEventsNo().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setEvents(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisEvent = (eventId) => {
    deleteEvent(eventId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base
      title="Welcome admin"
      description="Manage Events here"
      className="container bg-success p-4"
    >
      <Link className="btn btn=md btn-dark mb-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="bg-dark text-white rounded">
        <div className="col-12 mt-3 py-3">
          <h2 className="text-center my-3">Total {events.length} Events</h2>
          <div className="container p-3">
            <table border="1" width="100%">
              <tr>
                <th> Index</th>
                <th> Title</th>
                <th> Description</th>
                <th> Start</th>
                <th> End</th>
                <th> Date</th>
                <th> Venue</th>
                <th> Editor Email</th>
                <th> Approved</th>
                <th> Update</th>
                <th> Delete</th>
              </tr>
              {events.map((event, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.title}</td>
                    <td>{event.note}</td>
                    <td>{event.startingtime}</td>
                    <td>{event.endingtime}</td>
                    <td>{event.date}</td>
                    <td>{event.venue}</td>
                    <td>{event.editoremail}</td>
                    <td>{event.approved}</td>
                    <td>
                    <Link
                        className="btn btn-success"
                        to={`/admin/event/update/${event._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                    <button
                        onClick={() => {
                            deleteThisEvent(event._id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageNotApprovedEvents;
