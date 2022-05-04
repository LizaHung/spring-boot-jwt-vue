<template>
  <div>
    <Title :title="title" />

    <div class="p-2 card row">
      <div>
        <div class="p-3">
          <b-form id="empForm">
            <b-form-group
              :class="{ isRequired: field.isRequired }"
              :label="field.label"
              :label-for="field.param"
              v-for="(field, index) in fields"
              :key="index">
              <b-form-input
                v-if="field.type === 'input'"
                v-model.trim="field.value"
                :required="field.isRequired"
                :name="field.param"
              ></b-form-input>
              <template   v-else-if="field.type === 'select'">
                <strong>請留意:管理員預設啟用所有功能權限，員工預設啟用領養管理及寵物管理</strong>
               <b-form-select
                class="mb-3 custom-select"
                :name="field.param"
                v-model="field.value"
                :required="field.isRequired"
                :options="field.options">
              </b-form-select>
              </template>
             
              <b-form-group v-else-if="field.type === 'radio'" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  :name="field.param"
                  v-model="field.value"
                  :options="field.options"
                  :required="field.isRequired"
                  :aria-describedby="ariaDescribedby"
                ></b-form-radio-group>
              </b-form-group>

              <b-input-group class="mb-3" v-else-if="field.type === 'date'">
                <b-input-group-prepend>
                  <b-form-datepicker
                    v-model="field.value"
                    button-only
                    right
                    :date-disabled-fn="dateDisabled"
                  ></b-form-datepicker>
                </b-input-group-prepend>
                <b-form-input
                  required
                  v-model="field.value"
                  readonly
                  type="text"
                  :name="field.param"
                  placeholder="YYYY-MM-DD"
                  autocomplete="off"
                ></b-form-input>
              </b-input-group>

              <div v-else class="p-2">
                <div v-if="previewImage" class="p-2 photo">
                  <img :alt="field.param" class="mr-2" :src="previewImage" width="200" />
                  <hr />
                </div>
                <div v-if="mode === 'edit' && !previewImage" class="p-2 photo">
                  <img
                    :alt="field.param"
                    class="mr-2"
                    :src="`http://localhost:7070/employees/show/${$route.params.data.empNo}`"
                    width="200"/>
                  <hr />
                </div>
                <b-form-file
                  v-model="field.value"
                  :required="field.isRequired"
                  id="file-small"
                  accept="image/*"
                  @change="showPhoto"
                ></b-form-file>
              </div>
            </b-form-group>
          </b-form>
        </div>
      </div>
      <div class="text-center w-100 mb-2 mt-2">
        <b-button type="submit" class="mx-1" @click="submit">送出</b-button>
        <b-button class="mx-1" @click="goBack">返回</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import modalAction from "./ModalAction";
import $ from "jquery";
import "jquery-validation";
import { mapGetters } from "vuex";
export default {
  components: { Title },
  data() {
    return {
      title: "新增員工",
      fields: null,
      mode: null,
      formData: null,
      previewImage: null,
      delImageList: [],
      apiType: null,
    };
  },
  created() {
    $.validator.setDefaults({
      errorElement: "div",
      errorClass: "is-invalid text-danger",
    });

    this.mode = this.$route.params.mode;
    this.fields = JSON.parse(JSON.stringify(modalAction.fields));
    this.fields[5].options = this.setOptions(this.getConst.role);
    this.modeSetting();
  },
  computed: {
    ...mapGetters(["getConst"]),
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    modeSetting() {
      if (this.mode === "edit") {
        this.title = "編輯員工";
        this.$nextTick(() => {
          this.setInfoForEdit(this.$route.params.data);
        });
        this.apiType = "updateEmp";
        this.fields[0].isRequired = false
      } else {
        this.fields[5].value="ROLE_STAFF"
        this.apiType = "addEmp";
      }
    },
    setInfoForEdit(empInfo) {
      this.fields.forEach((item) => {
        if(item.param === 'empRole'){
          item.value = empInfo[item.param] === '管理員' ? 'ROLE_ADMIN' : 'ROLE_STAFF'
        }else
          item.value = empInfo[item.param];
      });
    },
    setOptions(data) {
      return Object.keys(data).map((key) => {
        return { value: key, text: data[key] };
      });
    },
    showPhoto(e) {
      [...e.target.files].forEach((photo) => {
        const reader = new FileReader();
        reader.addEventListener("load", this.imagLoaded);
        reader.readAsDataURL(photo);
      });
    },
    imagLoaded(e) {
      this.previewImage = e.target.result;
    },
    setFormData(formData) {
      this.fields.forEach((item) => {
        if (!item.value) return;
        else formData.append(item.param, item.value);
      });
      if (this.mode === "edit") formData.append("empNo", this.$route.params.data.empNo);
    },
    submit() {
      $("#empForm").validate({
        rules: {
          empEmail: {
            email: true,
          },
        },
      });
      if (!$("#empForm").valid()) return;

      let formData = new FormData();
      this.setFormData(formData);
      modalAction.addOrUpdateEmp(this.apiType, formData, () => {
        this.$router.push({
          name: "employee-management",
          params: {
            mode: this.mode,
          },
        });
      });
    },
    dateDisabled(ymd, date) {
      return date <= new Date();
    },
  },
};
</script>
<style></style>
