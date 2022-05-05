<template>
  <div class="content">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-4 col-md-6 col-sm-8">
          <span
            ><form>
              <div class="card">
                <div class="card-header">
                  <div><h3 class="card-title text-center">Login</h3></div>
                </div>
                <div class="card-body">
                  <div>
                    <span
                      ><div class="form-group has-label">
                        <label>帳號 </label
                        ><input
                          aria-describedby="addon-right addon-left"
                          v-model="userData.empAccount"
                          class="form-control"
                        /></div></span
                    ><span
                      ><div class="form-group has-label">
                        <label> 密碼 </label
                        ><input
                          aria-describedby="addon-right addon-left"
                          type="password"
                          v-model="userData.empPsw"
                          name="password"
                          class="form-control"
                        /></div
                    ></span>
                  </div>
                  <div class="text-center">
                    <button id="signin" class="btn btn-primary" type="button" @click="loginHandle">登入</button>
                    <div class="forgot"><a href="#/register" class="card-category"> 忘記密碼? </a></div>
                  </div>
                </div>
              </div>
            </form></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthentication } from "@/axios/apiUrl.js";
// import store from "@/store/index.js";
import auth from "@/helpers/auth.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userData: {
        empAccount: "EA10326",
        empPsw: 123456,
      },
    };
  },
  computed: {
    ...mapGetters(["getCurrentUserData"]),
  },
  methods: {
    loginHandle() {
      apiAuthentication.login(this.userData, (res) => {
        auth.setStorage(res);
        auth.decodeToken(res.token);
        auth.setFuntion()
      
      });
    },
  },
};
</script>

<style scoped>
.content {
  padding-top: 12vh;
}
</style>
