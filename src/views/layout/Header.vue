<template>
  <div class="sb-topnav navbar navbar-expand c-bg-blue-dark navbar-light shadow-sm">
    <h3>Work Hard, Play Hard!</h3>
    <div class="d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
      <span style="color: #2082d9; cursor: pointer" @click="logout"> logout</span>
    </div>
  </div>
</template>

<script>
import auth from "@/helpers/Auth.js";
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    logout() {
      auth.signOut();
      window.location.reload();
    },
  },
};
</script>
