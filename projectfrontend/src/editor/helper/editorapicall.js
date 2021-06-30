import { API } from "../../backend";

//news call
//create a news
export const createNews = (userId, token, news) => {
  return fetch(`${API}/news/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(news),
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
//update a news
export const updateNews = (newsId, userId, token, news) => {
  return fetch(`${API}/news/${newsId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: news
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
//delete a news
export const deleteNews = (newsId, userId, token) => {
  return fetch(`${API}/news/${newsId}/${userId}`, {
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




//products calls
//create product call
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get All products
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
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

// get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET"
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

//update a product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};