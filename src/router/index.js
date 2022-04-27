import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/layout/Home";
import routerUrl from "./RouterUrl";

Vue.use(VueRouter);

function recursiveFn(routeConfig, parent){
  return routeConfig.map(item=>{
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
    console.log('localFile---',localFile)
    config.component = localFile
    config.meta.breadcrumb = !parent ? [] : JSON.parse(JSON.stringify(parent.meta.breadcrumb))

    if(item.breadcrumb) config.meta.breadcrumb.push(item.breadcrumb)
    if(item.operates) recursiveFn(item.operates,config)
    return config
  })
}

const routeSetting = (routeConfig) =>{
  console.log('test',recursiveFn(routeConfig))
  return recursiveFn(routeConfig)
}

const routes = [
  {
    path: "/",
    name: "Home",  //When registering a component, it will always be given a name. (規定: (all-lowercase, must contain a hyphen). )
    component: Home,
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
