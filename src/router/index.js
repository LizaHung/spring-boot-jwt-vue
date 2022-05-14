import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/Layout";
import ForgotPsw from "../views/forgot-psw/index";
import ChangePsw from "../views/forgot-psw/ChangePsw";
import Login from "../views/login/index";
import routerUrl from "./RouterUrl";
import store from "@/store/index.js";
import auth from "@/helpers/Auth.js";
import Home from "../views/layout/Home";
Vue.use(VueRouter);

//resolved navigation duplicated problem
const routerPush  = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}


function recursiveFn(routeConfig, parent, routeData) {
  routeConfig.forEach((item) => {
    let config = { path: item.path, meta: { fnName: item.fnName } };
    let name = item.path.split("/").slice(1).join("-");
    config.name = name;

    let localFile = () => {
      if (!item.localFile) {
        return import(`@/views/${name}`);
      } else if (!parent) {
        return import(`@/views/${name}/${item.localFile}`);
      } else {
        return import(`@/views/${parent.name}/${item.localFile}`);
      }
    };
    config.component = localFile;
    routeData.push(config);
    if (item.operates) recursiveFn(item.operates, config, routeData);
  });
}

const routeSetting = (routeConfig) => {
  let routeData = [];
  recursiveFn(routeConfig, null, routeData);
  return routeData;
};

const routes = [
  {
    path: "/login",
    name: "login", 
    component: Login,
  },
  {
    path: "/forgot-psw",
    name: "forgot-psw", 
    component: ForgotPsw,
  },
  {
    path: "/change-psw",
    name: "change-psw", 
    component: ChangePsw,
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/home",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "home",
        name: "home",
        component: Home,
        meta: {
          fnName: "首頁",
        },
      },
      ...routeSetting(routerUrl),
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) { // login is required 
    if (!sessionStorage.getItem("token")) {
      next({
        path: "/login",
      });
    } else if (auth.isNotPermissionFun(to.fullPath)) { //no authority
      next({ path: "/" });
    } else if (!store.getters.getCurrentUserData.empNo) {  //for page refresh
      auth.decodeToken(sessionStorage.getItem("token"));
      auth.setFuntion();
      auth.getHost()
      next();
    } else {
      next();
    }
  } else { 
    next();
  }
});

export default router;
