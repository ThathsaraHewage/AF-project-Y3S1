import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { deleteNews, getAllNews } from "./helper/editorapicall";

const ManageNews = () => {
  const [allnews, setAllNews] = useState([]);

  const { user, token } = isAutheticated();
  const preload = () => {
    getAllNews().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAllNews(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisNews = (newsId) => {
    deleteNews(newsId, user._id, token).then((data) => {
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
      description="Manage All News here"
      className="container bg-success p-4"
    >
      <Link className="btn btn=md btn-dark mb-3" to={`/editor/dashboard`}>
        <span className="">Editor Home</span>
      </Link>
      <div className="bg-dark text-white rounded">
        <div className="col-12 mt-3 py-3">
          <h2 className="text-center my-3">Total {} News</h2>
          <div className="container p-3">
            <table border="1" width="100%">
              <tr>
                <th> Index</th>
                <th> Date</th>
                <th> Short</th>
                <th> Full</th>
                <th> Update</th>
                <th> Delete</th>
              </tr>
              {allnews.map((news, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{news.date}</td>
                    <td>{news.short}</td>
                    <td>{news.full}</td>
                    <td>
                    <Link
                        className="btn btn-success"
                        to={`/editor/news/update/${news._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </td>
                    <td>
                    <button
                        onClick={() => {
                            deleteThisNews(news._id);
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

export default ManageNews;
