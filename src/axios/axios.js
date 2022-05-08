import axios from "axios";
import qs from "qs";
import router from "@/router";
import Vue from "vue";
import auth from "@/helpers/Auth.js";
import { apiAuthentication } from "@/axios/apiUrl.js";
const authConfig = axios.create({
  timeout: 50000,
});

const guestConfig = axios.create({
  timeout: 50000,
});

const makeToast = (content) => {
  const vm = new Vue();
  vm.$bvToast.toast(content, {
    title: "通知",
    solid: true,
  });
};

const retryAction = {
  callback :null
}

const successResponse = (response) => response;
const interceptor = (error) => {
  const { data, status } = error.response;
  if (error.response) {
    let errorMsg;
    switch (status) {
      case 401:
      case 403:
        if (data.status === 1403) {
          //refreshtoken
          let tokenData = {
            refreshToken: sessionStorage.getItem("refreshToken"),
          };
          apiAuthentication.refreshToken(tokenData, (res) => {
            auth.setStorage(res);
            error.config.headers.Authorization = `Bearer ${res.token}`
            axios.request(error.config).then(response =>{
              retryAction.callback(response.data)
              retryAction.callback = null
            })
          });
        } else {
          auth.signOut();
          errorMsg = data.message ? data.message : "請重新登入";
          router.push({
            name: "login",
          });
        }
        break;

      case 404:
        errorMsg = data.message ? data.message : "無效的請求";
        break;
      default:
        errorMsg = data.message;
        break;
    }
    if (errorMsg) makeToast(errorMsg);
  }
};

authConfig.interceptors.request.use(
  function (config) {
      config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return config;
  },
);

authConfig.interceptors.response.use(successResponse, interceptor);
guestConfig.interceptors.response.use(successResponse, interceptor);

export const get = async (url, callback, params, errorCallback) => {
  retryAction.callback = callback
  const data = qs.stringify(params, { arrayFormat: "indices" });
  return authConfig
    .get(`${url}?${data}`)
    .then((res) => {
      if (callback) callback(res.data);
    })
    .catch((error) => {
      if (errorCallback) errorCallback(error);
    });
};

export const post = async (url, callback, params, errorCallback) => {
  retryAction.callback = callback
  return authConfig
    .post(url, params)
    .then((response) => {
      if (callback) callback(response.data);
    })
    .catch((e) => {
      if (errorCallback) errorCallback(e);
    });
};

export const delhandle = async (url, callback, params, errorCallback) => {
  retryAction.callback = callback
  return authConfig
    .delete(url, params)
    .then((response) => {
      if (callback) callback(response.data);
    })
    .catch((e) => {
      if (errorCallback) errorCallback(e);
    });
};

export const patch = async (url, callback, params, errorCallback) => {
  retryAction.callback = callback
  return authConfig
    .patch(url, params)
    .then((response) => {
      if (callback) callback(response.data);
    })
    .catch((e) => {
      if (errorCallback) errorCallback(e);
    });
};

export const patchFormData = async (url, callback, params, errorCallback) => {
  retryAction.callback = callback
  return authConfig
    .patch(url, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (callback) callback(response.data);
    })
    .catch((e) => {
      if (errorCallback) errorCallback(e);
    });
};

export const put = async (url, callback, params, errorCallback) => {
  retryAction.callback = callback
  return authConfig
    .put(url, params)
    .then((response) => {
      if (callback) callback(response.data);
    })
    .catch((e) => {
      if (errorCallback) errorCallback(e);
    });
};

export const noAuthget = async (url, callback, params, errorCallback) => {
  return guestConfig
    .post(url, params, {})
    .then((response) => {
      if (callback) callback(response.data);
    })
    .catch((e) => {
      if (errorCallback) errorCallback(e);
    });
};
