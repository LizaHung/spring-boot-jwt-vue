import Vue from "vue";
import Vuex from "vuex";
import store from "@/store/index.js";
import router from "@/router/index.js";
Vue.use(Vuex);

export default {
  setStorage(res) {
    sessionStorage.clear();
    sessionStorage.setItem("token", res.token);
    sessionStorage.setItem("refreshToken", res.refreshToken);
    sessionStorage.setItem("time", new Date());
  },
  decodeToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let decodeToken = JSON.parse(window.atob(base64));
    this.getUserDetail(decodeToken.empNo)
    store.commit("setCurrentUserData", decodeToken);
  },
  setFuntion() {
    store.dispatch("callAllFun").then(() => {
      store.dispatch("callAuthFun", store.getters.getCurrentUserData.empNo).then(() => {
        router.push("/");
      });
    });
  },
  signOut() {
    store.commit("signOut");
  },
  isNotPermissionFun(funPath) {
    return funPath != "/" && funPath != "/home" && !store.getters.getCurrentUserData.authFun.some((item) => {
      return funPath.indexOf(item.funUrl) > -1;
    });
  },
  getHost(){
    store.dispatch("callHost");
  },
  getUserDetail(empNo){
    store.dispatch("callUserDetail", empNo);
  }
};
