<template>
  <div class="sideNav">
    <div id="layoutSidenav_nav" class="nav">
      <div class="nav-list" v-if="isShow">
        <ul class="nav-group">
          <li class="1 nav-item" v-for="fun in funList" :key="fun.funNo">
            <router-link :to="fun.funUrl" class="nav-item_link" active-class="is-active" :title="fun.funName">
              <span class="nav-line"> </span>{{ fun.funName }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Hub from "@/helpers/hub.js";
import { apiGetBackFun } from "@/axios/apiUrl.js";

export default {
  name: "Aside",
  data() {
    return {
      isShow: true,
      funList: null,
    };
  },
  created() {
    apiGetBackFun((res) => {
      this.funList = res;
    });
  },
  mounted() {
    Hub.$on("isShow", (data) => {
      this.isShow = data;
    });
  },
};
</script>
