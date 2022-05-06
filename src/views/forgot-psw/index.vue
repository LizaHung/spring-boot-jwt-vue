<template>
  <div class="content">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-lg-4 col-md-6 col-sm-8">
          <form @submit.prevent  ref="form">
            <div class="card">
              <div class="card-header">
                <div><h3 class="card-title text-center">Forgot</h3></div>
              </div>
              <div class="card-body">
                <div>
                  <span>
                    <div class="form-group has-label">
                      <label>帳號 </label>
                      <input
                        required
                        aria-describedby="addon-right addon-left"
                        v-model="userData.account"
                        class="form-control"
                      />
                    </div>
                  </span>
                  <span>
                    <div class="form-group has-label">
                      <label> Email </label>
                      <input
                        aria-describedby="addon-right addon-left"
                        required
                        type="email"
                        v-model="userData.email"
                        class="form-control"
                      />
                    </div>
                  </span>
                </div>
                <div class="text-center">
                  <button :disabled="submitted" class="btn btn-primary" type="submit" @click="forgotHandle">
                    {{ buttonText }}
                  </button>
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
export default {
  data() {
    return {
      userData: {
        email: "lizahung1008@gmail.com",
        account: "EA10326",
      },
      submitted: false,
    };
  },
  computed: {
    buttonText() {
      return this.submitted === false ? "確認" : "請稍後";
    },
  },
  methods: {
    forgotHandle() {
      if(!this.$refs.form.checkValidity()) return  
      this.submitted = true;
      apiAuthentication.forgotPsw(this.userData, () => {
        this.$router.push({
          name: "login",
          params: {
            toast: "郵件已寄送至信箱，請查收",
          },
        });
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
