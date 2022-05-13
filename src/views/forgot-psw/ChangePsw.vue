<template>
  <div class="content">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-4 col-md-6 col-sm-8" v-if="!isForbidden">
          <form @submit.prevent  ref="form">
            <div class="card">
              <div class="card-header">
                <div><h3 class="card-title text-center">Change Password</h3></div>
              </div>
              <div class="card-body">
                <div>
                  <span>
                    <div class="form-group has-label">
                      <label>帳號 </label>
                      <input
                        disabled
                        aria-describedby="addon-right addon-left"
                        v-model="userData.account"
                        class="form-control"
                      />
                    </div>
                  </span>
                  <span>
                    <div class="form-group has-label">
                      <label> Password </label>
                      <input
                        aria-describedby="addon-right addon-left"
                        type="password"
                        required
                        v-model="userData.password"
                        name="password"
                        class="form-control"
                      />
                    </div>
                  </span>
                </div>
                <div class="text-center">
                  <button class="btn btn-primary" type="submit" @click="changeHandle">確認</button>
                  <button  class="btn btn-primary mx-1"  @click="goBack"> 返回</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div v-else>
          已超過30分鐘，請重新至
          <a href="javascript: void(0)" @click="forgotHandle" class="card-category">"忘記密碼"</a>申請。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiAuthentication } from "@/axios/apiUrl.js";
export default {
  data() {
    return {
      userData: {
        password: null,
        account: null,
      },
      isForbidden: false,
    };
  },
  created() {
    const url = location.href;
    const urlArray = url.replace(/%3D/g, '=').split("-");
    this.userData.account = window.atob(urlArray[2]);
    const now = new Date().getTime();
    const limitedTime = window.atob(urlArray[3]);
    this.isForbidden = now - limitedTime >= 1800000;
  },
  methods: {
    changeHandle() {
      if(!this.$refs.form.checkValidity()) return
      apiAuthentication.changePsw(this.userData, () => {
        this.$router.push({
          name: "login",
          params: {
            toast: "密碼已變更完成",
          },
        });
      });
    },
    forgotHandle() {
      this.$router.push({
        name: "forgot-psw",
      });
    },
    goBack(){
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.content {
  padding-top: 12vh;
}
</style>
