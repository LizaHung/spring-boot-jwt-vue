<template>
  <div>
    <b-modal
      id="auth-modal"
      ok-title="送出"
      centered
      cancel-title="取消"
      @hidden="resetModal"
      @ok="submitAuth"
      @show="getAuthFun"
      title="權限"
    >
      <div class="d-block text-center">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selected"
          :options="allFun"
          value-field="funNo"
          text-field="funName"
          name="flavour-1"
        ></b-form-checkbox-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import modalAction from "./ModalAction";
export default {
  props: {
    empNo: {
      type: Number,
    },
  },
  data() {
    return {
      allFun: null,
      selected: [],
    };
  },
  created() {
    this.allFun = this.getConst.allFun;
  },
  computed: {
    ...mapGetters(["getConst"]),
  },
  methods: {
    getAuthFun() {
      if (!this.empNo) return;
      modalAction.authFunAction("getAuthFun", this.empNo, this.setAuthorizedFun);
    },
    submitAuth() {
      let data = {
        empNo: this.empNo,
        funNo: this.selected,
      };
      modalAction.authFunAction("saveAuthFun", data, this.$emit("saveSuccessfully", "儲存成功"));
    },
    setAuthorizedFun(data) {
      this.selected = data.map((item) => item.funNo);
    },
    resetModal() {
      this.selected = [];
    },
  },
};
</script>
