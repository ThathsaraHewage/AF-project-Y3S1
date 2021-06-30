import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import Event from "./Event";
import { getAllEventsYes, getAllNews } from "./helper/coreapicalls";

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);

  const loadAllNews = () => {
    getAllNews().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setNews(data);
      }
    });
  };

  const loadApprovedEvents = () => {
    getAllEventsYes().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setEvents(data);
      }
    });
  };

  useEffect(() => {
    loadAllNews();
    loadApprovedEvents();
  }, [])

  return (
    <Base title="SLIIT Conference 2021" description="Welcome to SLIIT 2021 Conference">
      <div className="row text-center">
          <h1 className="text-white">Main Event</h1>
          <div className="mt-4 row">
              {events.map((event, index) => {
                  return(
                      <div key={index} className="col-12 mb-4">
                        <Event event={event}/>
                      </div>
                  )
              })}
          </div>
          <br />
          <h1 className="text-white mt-4 mb-4">Latest News</h1>
          <div className="row">
              {news.map((news, index) => {
                  return(
                      <div key={index} className="col-4 mb-4">
                        <Card news={news}/>
                      </div>
                  )
              })}
          </div>
      </div>
    </Base>
  );
}
