import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index.js";
import { apiGetBackFun, apiEmployee, apiAuthentication } from "@/axios/apiUrl.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUserData: {
      authFun: [],
      role: null,
      account: null,
      empNo: null,
      empName: null,
    },
    const: {
      emptyText: "查無資料",
      perPage: 10,
      dateFormat: "YYYY-MM-DD",
      dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
      petCat: {
        OTHERS: "其他",
        SHORTHAIR_CAT: "短毛貓",
        LONGHAIR_CATL: "長毛貓",
        SMALL_DOG: "狗(小型1-5kg)",
        MEDIUM_DOG: "狗(中型10kg以下)",
        LARGE_DOG: "狗(大型10kg以上)",
      },
      location: {
        TAOYUAN: "320桃園市中壢區中大路300號",
        TAICHUNG: "404台中市北區健行路490號",
        KAOHSIUNG: "812高雄市小港區松和路1號",
      },
      role: {
        ROLE_ADMIN: "管理員",
        ROLE_STAFF: "員工",
      },
      allFun: [],
    },
    backendHost:null
  },
  mutations: {
    setAllFunction(state, data) {
      state.const.allFun = data;
    },
    setCurrentUserData(state, data) {
      state.currentUserData.role = data.role;
      state.currentUserData.account = data.account;
      state.currentUserData.empNo = data.empNo;
    },
    setAuthFun(state, data) {
      state.currentUserData.authFun =  state.const.allFun.filter(({ funNo: funNo }) => data.some(({ funNo: funNo2 }) => funNo === funNo2));
    },
    setHost(state, data) {
      state.backendHost =  process.env.VUE_APP_PROXY_HOST.indexOf(data) > -1 ? `http://${data}` : `http://${data}:7070`
    },
    setUserName(state, data) {
      state.currentUserData.empName = data.empName;
    },
    signOut(state){
      Object.keys(state.currentUserData).forEach(item=>{
        state.currentUserData[item] = Array.isArray(state.currentUserData[item]) ? [] : null
      })
      sessionStorage.clear();
      router.push({
        name: "login",
      });
    }
  },
  actions: {
    callAllFun({ commit }) {
      return new Promise((resolve, reject) => {
        apiGetBackFun((res) => {
          commit("setAllFunction", res);
          resolve();
        }).catch((error) => {
          console.log(error);
          reject(error);
        });
      });
    },
    callAuthFun({ commit }, empNo) {
      return new Promise((resolve, reject) => {
        apiEmployee
          .getAuthFun(empNo, (res) => {
            commit("setAuthFun", res);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    callHost({ commit }) {
      return new Promise((resolve, reject) => {
        apiAuthentication
          .getHost((res) => {
            commit("setHost", res);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    callUserDetail({ commit }, empNo) {
      return new Promise((resolve, reject) => {
        apiEmployee
          .getEmpInfo(empNo, (res) => {
            commit("setUserName", res);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
  getters: {
    getConst: (state) => state.const,
    getCurrentUserData: (state) => state.currentUserData,
    getBackendHost: (state) => state.backendHost,
  },
});
