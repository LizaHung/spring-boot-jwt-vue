import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/Layout";
import routerUrl from "./RouterUrl";

Vue.use(VueRouter);

function recursiveFn(routeConfig, parent, routeData){
  routeConfig.forEach(item=>{

    let config = {path: item.path,meta:{fnName:item.fnName}}
    let name = item.path.split("/").slice(1).join("-")
    config.name = name

    let localFile = () =>{ 
      if(!item.localFile){
        return import(`@/views/${name}`) 
      }else if(!parent){
        return import(`@/views/${name}/${item.localFile}`) 
      }else{
        return import(`@/views/${parent.name}/${item.localFile}`) 
      }
    }
    config.component = localFile
    routeData.push(config)
    if(item.operates) recursiveFn(item.operates,config,routeData)
  })
}

const routeSetting = (routeConfig) =>{
  let routeData = []
  recursiveFn(routeConfig,null,routeData)
  return routeData
}

const routes = [
  {
    path: "/",
    name: "Layout",  //When registering a component, it will always be given a name. (規定: (all-lowercase, must contain a hyphen). )
    component: Layout,
    children: [
      // {
      //   path: "/about",
      //   name: "About",
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
      // },
      ...routeSetting(routerUrl)
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
