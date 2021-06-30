import { API } from "../../backend";

//event call
//create a event
export const createEvent = (userId, token, event) => {
    return fetch(`${API}/event/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  
  // get a event
  export const getEvent = eventId => {
    return fetch(`${API}/event/${eventId}`, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  //get all events
  export const getAllEvents = () => {
    return fetch(`${API}/events`, {
      method: "GET",
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

  //get all not approved events
  export const getAllEventsNo = () => {
    return fetch(`${API}/noevents`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  //update a event
  export const updateEvent = (eventId, userId, token, event) => {
    return fetch(`${API}/event/${eventId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: event
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  //delete a event
  export const deleteEvent = (eventId, userId, token) => {
    return fetch(`${API}/event/${eventId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const signup = user => {
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };