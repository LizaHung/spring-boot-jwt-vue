<template>
  <div>
    <Title :title="title" />

    <div class="p-2 card row">
      <div>
        <div class="p-3">
          <b-form id="petForm">
            <b-form-group
              :class="{ isRequired: field.isRequired }"
              :label="field.label"
              :label-for="field.param"
              v-for="(field, index) in fields"
              :key="index"
            >
              <b-form-input
                v-if="field.type === 'input'"
                v-model.trim="field.value"
                :required="field.isRequired"
                :name="field.param"
              ></b-form-input>
              <b-form-input
                v-else-if="field.type === 'number'"
                v-model.trim="field.value"
                type="number"
                min="0.00"
                :required="field.isRequired"
                :name="field.param"
              ></b-form-input>
              <b-form-select
                class="mb-3 custom-select"
                :name="field.param"
                v-else-if="field.type === 'select'"
                v-model="field.value"
                :required="field.isRequired"
                :options="field.options"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>-- 請選擇 --</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-group v-else-if="field.type === 'radio'" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                  :name="field.param"
                  v-model="field.value"
                  :options="field.options"
                  :required="field.isRequired"
                  :aria-describedby="ariaDescribedby"
                ></b-form-radio-group>
              </b-form-group>

              <b-form-textarea
                :name="field.param"
                v-else-if="field.type === 'textarea'"
                v-model="field.value"
                placeholder="Enter something..."
                rows="3"
                max-rows="6"
              ></b-form-textarea>
              <b-input-group class="mb-3" v-else-if="field.type === 'date'">
                <b-input-group-prepend>
                  <b-form-datepicker v-model="field.value" button-only right></b-form-datepicker>
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
                <b-form-file
                  multiple
                  v-model="field.value"
                  :required="field.isRequired"
                  id="file-small"
                  accept="image/*"
                  @change="showPhoto"
                ></b-form-file>
                <div v-if="previewImageList.length > 0" class="p-2">
                  <span v-for="(image, index) in previewImageList" :key="index">
                    <b-icon
                      @click="removeImag(index)"
                      icon="x-circle-fill"
                      variant="danger"
                      style="position: absolute"
                      font-scale="1.5"
                    ></b-icon>
                    <img :alt="`${field.param}+${index}`" class="mr-2" :src="image" width="200" />
                  </span>
                </div>
                <hr />
                <div v-if="mode === 'edit'">
                  <div>已上傳:</div>
                  <span v-for="(item, index) in uploadedImages" :key="index">
                    <template v-if="delImageList.indexOf(item.adoPicNo) === -1">
                      <b-icon
                        @click="delImagFromDB(item)"
                        icon="x-circle-fill"
                        variant="danger"
                        style="position: absolute"
                        font-scale="1.5"
                      ></b-icon>
                      <img
                        :alt="`${item}+${index}`"
                        class="mr-2"
                        :src="`http://localhost:7070/adoption/show/?adopetNo=${item.adoPetNo}&adoPicNo=${item.adoPicNo}`"
                        width="200"
                      />
                    </template>
                  </span>
                </div>
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
export default {
  components: { Title },
  data() {
    return {
      title: "新增寵物",
      fields: null,
      mode: null,
      formData: null,
      previewImageList: [],
      delImageList: [],
      uploadedImages: [],
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
    this.modeSetting();
    this.fields[6].options = this.setPetCatOptions(this.$store.getters.getConst.petCat);
    this.fields[8].options = this.setPetCatOptions(this.$store.getters.getConst.location);
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    modeSetting() {
      if (this.mode === "edit") {
        this.title = "編輯寵物";
        this.$nextTick(() => {
          this.setPetInfoForEdit(this.$route.params.data);
          this.uploadedImages = this.$route.params.data.adoPetPic;
        });
        this.apiType = "updateAdopet";
        this.fields[9].isRequired = false;
      } else this.apiType = "addAdopet";
    },
    setPetInfoForEdit(petInfo) {
      this.fields.forEach((item) => {
        item.value = petInfo[item.param];
      });
    },
    setPetCatOptions(data) {
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
      this.previewImageList.push(e.target.result);
    },
    removeImag(index) {
      this.previewImageList.splice(index, 1);
      this.fields[9].value.splice(index, 1);
    },
    delImagFromDB(item) {
      this.$nextTick(() => {
        this.delImageList.push(item.adoPicNo);
      });
    },
    setFormData(formData) {
      this.fields.forEach((item) => {
        if (!item.value) return;
        if (item.param === "photos") {
          item.value.forEach((imag, index) => {
            formData.append(`${item.param}[${index}]`, imag);
          });
        } else formData.append(item.param, item.value);
      });
      if (this.mode === "edit") formData.append("adoPetNo", this.$route.params.data.adoPetNo);
      if (this.delImageList.length > 0) formData.append("delImageList", this.delImageList);
    },
    submit() {
      if (!$("#petForm").valid()) return;

      let formData = new FormData();
      this.setFormData(formData);

      modalAction.addOrUpdateAdopet(this.apiType, formData, () => {
        this.$router.push({
          name: "adopet-management",
          params: {
            mode: this.mode,
          },
        });
      });
    },
    dateDisabled(ymd, date) {
      return date >= new Date();
    },
  },
};
</script>
