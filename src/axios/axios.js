import axios from "axios";

const authConfig = axios.create({
  timeout: 50000,
  headers: {
    "X-Auth-token": sessionStorage.getItem("token.front"),
  },
});

const guestConfig = axios.create({
  timeout: 50000,
});


export const get = async (url, callback, params, errorCallback) => {
  return authConfig
    .get(`${url}?${params}`)
    .then((res) => {
      console.log("resback", res);
      if (callback) callback(res.data);
    })
    .catch((error) => {
      console.log("rerror back", error);
      if (errorCallback) errorCallback(error);
    });
};


  export const noAuthget = async (url, callback, params, errorCallback) => {
    return guestConfig.post(url, params, {
    }).then(response => {
        console.log("resback", response);
      if (callback) callback(response.data)
    }).catch(e => {
      console.log(e)
      console.log("rerror back", e);
      if (errorCallback) errorCallback(e)
    })
  }