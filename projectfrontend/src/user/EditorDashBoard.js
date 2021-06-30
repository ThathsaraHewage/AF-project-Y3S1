import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";

const EditorDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();

  const editorLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white text-center">
          Editor Navigation
        </h4>
        <ul className="list-group">
        <li className="list-group-item">
              <Link to="/editor/create/news" className="nav-link text-success">Add News</Link>
          </li>
          <li className="list-group-item">
              <Link to="/editor/allnews" className="nav-link text-success">Manage News</Link>
          </li>
          <li className="list-group-item">
              <Link to="/editor/create/event" className="nav-link text-success">Create Event</Link>
          </li>
          <li className="list-group-item">
              <Link to="/editor/events" className="nav-link text-success">Manage Events</Link>
          </li>

        </ul>
      </div>
    );
  };

  const editorRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-dark text-white text-center">
          Editor Infomation
        </h4>
        <ul className="list-group">
            <li className="list-group-item ">
                <h5><span className="badge bg-success text-white mr-5"> Name: </span> {name} </h5>
            </li>
            <li className="list-group-item">
                <h5><span className="badge bg-success text-white mr-2"> Email: </span> {email}</h5>
            </li>
            <li className="list-group-item">
                <h5><span className="badge bg-success text-white mr-2"> Role: </span> {role}</h5>
            </li>
            <li className="list-group-item">
                <span className="badge bg-danger">Editor Area</span>
            </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Editor Area"
      description="Manage all of your news and events here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{editorLeftSide()}</div>
        <div className="col-9">{editorRightSide()}</div>
      </div>
    </Base>
  );
};

export default EditorDashBoard;
