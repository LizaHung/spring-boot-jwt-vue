<template>
  <div class="sb-topnav navbar shadow-sm c-bg-header-dark">
    <div class="h-100">
      <router-link :to="'/home'" class="nav-item h-100" active-class="is-active" :title="'Petfect Match'">
        <img :alt="'petfect match'" :src="require('@/assets/' + jpg)" class="h-100" />
      </router-link>
    </div>
    <div class="d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
      <span class="mr-1"> Hi {{$store.getters.getCurrentUserData.empName}}</span>
      <span style="color: #2082d9; cursor: pointer" @click="logout"> logout</span>
    </div>
  </div>
</template>

<script>
import auth from "@/helpers/Auth.js";
export default {
  name: "Header",
  data() {
    return {
      jpg: "logo.png",
    };
  },
  methods: {
    logout() {
      auth.signOut();
    },
  },
};
</script>
<style scoped>
.h-100 {
  height: 100%;
}
</style>
