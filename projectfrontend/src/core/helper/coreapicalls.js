import { API } from "../../backend";

//get all news
export const getAllNews= () => {
    return fetch(`${API}/allnews`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  // get a news
export const getNews = newsId => {
    return fetch(`${API}/news/${newsId}`, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  //get all approved events
  export const getAllEventsYes = () => {
    return fetch(`${API}/yesevents`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };