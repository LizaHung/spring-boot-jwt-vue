<template>
  <div class="sideNav">
    <div id="layoutSidenav_nav" class="nav">
      <ul class="nav-group">
        <li class="1 nav-item" v-for="fun in funList" :key="fun.funNo">
          <router-link :to="fun.funUrl" class="nav-item_link" active-class="is-active" :title="fun.funName">
            <span class="nav-line"> </span>{{ fun.funName }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Aside",
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapGetters(["getCurrentUserData"]),
    funList() {
      return this.getCurrentUserData.authFun;
    },
  },
};
</script>
<style scoped>
.nav-item_link {
  text-decoration: none;
  color:#333
}
</style>
