import axios from "axios";
import qs from 'qs'
const authConfig = axios.create({
  timeout: 50000,
  // baseURL:'http://localhost:7070'
  // headers: {
  //   "X-Auth-token": sessionStorage.getItem("token"),
  // },
});

const guestConfig = axios.create({
  timeout: 50000,
});


export const get = async (url, callback, params, errorCallback) => {
  const data = qs.stringify(params, {arrayFormat: 'indices'})
  return authConfig
    .get(`${url}?${data}`)
    .then((res) => {
      console.log("resback", res);
      if (callback) callback(res.data);
    })
    .catch((error) => {
      console.log("rerror back", error);
      if (errorCallback) errorCallback(error);
    });
};

export const post = async (url, callback, params, errorCallback) => {
  return authConfig.post(url, params, {
  }).then(response => {
    if (callback) callback(response.data)
  }).catch(e => {
    console.log(e)
    if (errorCallback) errorCallback(e)
  })
}

export const delhandle = async ( url, callback, params, errorCallback) => {
  return authConfig.delete(url, {
    params, 
  }).then( response => {
    if (callback) callback(response.data)
  }).catch(e => {
    if (errorCallback) errorCallback(e)
  })
}

export const patch = async ( url, callback, params, errorCallback) => {
  return authConfig.patch(url, params, {
  }).then(response => {
    if (callback) callback(response.data)
  }).catch(e => {
    if (errorCallback) errorCallback(e)
  })
}

export const patchFormData = async (url, callback, params, errorCallback) => {
  return authConfig.patch(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    if (callback) callback(response.data)
  }).catch(e => {
    console.log(e)
    if (errorCallback) errorCallback(e)
  })
}

export const put = async ( url, callback, params, errorCallback) => {
  return authConfig.put(url, params, {
  }).then(response => {
    if (callback) callback(response.data)
  }).catch(e => {
    if (errorCallback) errorCallback(e)
  })
}


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

