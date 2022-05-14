<template>
  <div class="content">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-4 col-md-6 col-sm-8">
          <form @submit.prevent ref="form">
            <div class="card">
              <div class="card-header">
                <div><h3 class="card-title text-center">Login</h3></div>
              </div>
              <div class="card-body">
                <div>
                  <span>
                    <div class="form-group has-label">
                      <label>帳號 </label>
                      <input
                        aria-describedby="addon-right addon-left"
                        v-model="userData.empAccount"
                        required
                        class="form-control"
                      />
                    </div>
                  </span>
                  <span>
                    <div class="form-group has-label">
                      <label> 密碼 </label>
                      <input
                        aria-describedby="addon-right addon-left"
                        type="password"
                        required
                        v-model="userData.empPsw"
                        name="password"
                        class="form-control"
                      />
                    </div>
                  </span>
                </div>
                <div class="text-center">
                  <button id="signin" class="btn btn-primary" type="submit" @click="loginHandle">登入</button>
                  <div class="forgot">
                    <a href="javascript: void(0)" @click="forgotHandle" class="card-category"> 忘記密碼? </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthentication } from "@/axios/apiUrl.js";
import auth from "@/helpers/Auth.js";
export default {
  data() {
    return {
      userData: {
        empAccount: "EA10326",
        empPsw: 123456,
      },
    };
  },
  created() {
    if (this.$route.params.toast) this.makeToast(this.$route.params.toast);
  },
  methods: {
    loginHandle() {
      if (!this.$refs.form.checkValidity()) return;
      apiAuthentication.login(this.userData, (res) => {
        auth.getHost()
        auth.setStorage(res);
        auth.decodeToken(res.token);
        auth.setFuntion();
      });
    },
    forgotHandle() {
      this.$router.push({
        name: "forgot-psw",
      });
    },
    makeToast(content) {
      this.$bvToast.toast(content, {
        title: "通知",
        solid: true,
      });
      delete this.$route.params.toast;
    },
  },
};
</script>

<style scoped>
.content {
  padding-top: 12vh;
}
</style>
