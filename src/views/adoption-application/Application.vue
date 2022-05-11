<template>
  <div>
    <Title :title="title" />
    <div class="p-2 card">
      <form id="applicationForm">
        <div class="form-row">
          <div class="form-group col-md-12" style="text-align: center">
            <h3>PetFect Match 寵物領養申請書</h3>
            <p>
              本人
              <b-form-input
                style="width: 80px; display: inline"
                name="appName"
                required
                v-model="formData.applicant"
              ></b-form-input>
              已年滿 20 歲，因喜愛狗、貓，<br />
              且具有飼養之能力及場所。願向貴處領養動物乙頭，詳細資料如下：
            </p>
          </div>
          <br />
          <div class="form-group col-md-6" v-for="(field, index) in petFields" :key="index">
            <label>{{ field.label }}</label>
            <b-form-input v-model="adopet[field.param]" disabled></b-form-input>
          </div>
          <br />
          <div class="form-row">
            <div class="form-group col-md-12">
              <p>
                <strong>本人願遵守以下約定:</strong><br />
                1. 依法辦理寵物登記、晶片植入等事項。並同意適時為領養之動物絕育，避免不必要之繁殖。<br />
                2. 無論何時都以人道方式對待認領動物，提供牠適當之食物、飲水及空間，並絕不任意棄養認領的動物。<br />
                3. 定期幫牠進行狂犬病預防注射、驅蟲及健康檢查，受傷或罹病時，必請獸醫師給予醫療。<br />
                4. 妥善照管牠，防止其無故侵害他人之生命、身體、自由、財產或安寧。<br />
                5. 不隨便放縱牠於戶外，牠出入公共場所或公眾出入之場所時，必由 7 歲以上之人伴同，並採取適
                當之防衛措施。<br />
                6. 當牠轉讓、死亡或住所異動時，於 1 個月內依規定辦理變更登記；遺失時，於 5 天內依規定申報。<br />
                7. 若因任何原因無法續養，本人願為牠找到新的領養家庭，或送至動物保護團體所屬收容所。<br />
                8. 如有違反上述領養規定，貴處有權收回該動物，並終止領養人對該領養動物之權利。<br />
              </p>
            </div>
          </div>
        </div>
        <br />
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>電話</label>
            <b-form-input
              class="cellPhone"
              type="tel"
              v-model="formData.phone"
              maxlength="10"
              required
              placeholder="電話請輸入09開頭，且長度必須為10。(如:0912345678)"
            ></b-form-input>
          </div>
          <div class="form-group col-md-6">
            <label>信箱</label>
            <b-form-input type="email" class="email" name="applEmail" v-model="formData.email" required></b-form-input>
          </div>
        </div>
        <br />
        <div class="form-row">
          <div class="form-group col-md-12">
            <div class="text-center">
              <strong>請上傳身分證正反面:</strong><br />
              <Croppie
                @croppedImg="setCroppedImg($event, 'idLeft')"
                :jpg="'idFront.jpg'"
                :id="'idLeft'"
                class="mr-5"
              ></Croppie>
              <Croppie @croppedImg="setCroppedImg($event, 'idRight')" :jpg="'idBack.jpg'" :id="'idRight'"></Croppie>
            </div>
            <div class="text-center w-100 mb-2 mt-2">
              <strong>請簽名:</strong><br />
              <b-button class="mx-1" @click="clearSg">Clear</b-button>
              <div>
                <div class="container">
                  <VueSignaturePad id="signature" width="100%" height="400px" ref="signaturePad" />
                </div>
              </div>
            </div>
          </div>
          <div class="text-center w-100 mb-2 mt-2">
            <b-button class="mx-1" @click="submit">確認送出</b-button>
            <b-button class="mx-1" @click="goBack">返回</b-button>
          </div>
        </div>
      </form>
    </div>
    <b-modal id="modal-errorMsg" size="sm" title="請注意" centered ok-only
      >請填寫以下項目:<br />
      <span v-html="errorMsg"></span>
    </b-modal>
  </div>
</template>

<script>
import Title from "@/components/Title";
import modalAction from "./ModalAction";
import Croppie from "./Croppie";
import $ from "jquery";
import "jquery-validation";
export default {
  components: { Title, Croppie },
  data() {
    return {
      title: "領養申請",
      adopet: null,
      petFields: null,
      formData: {
        adoPetNo: null,
        applicant: null,
        phone: null,
        email: null,
        idLeft: null,
        idRight: null,
        signature: null,
      },
      errorMsg: null,
    };
  },
  created() {
    this.validatorInit()
    this.adopet = modalAction.dataHandler(this.$route.params.data);
    this.petFields = modalAction.petFields;
    this.formData.adoPetNo = this.adopet.adoPetNo;
  },
  methods: {
    setCroppedImg(data, type) {
      this.formData[type] = data;
    },
    clearSg() {
      this.$refs.signaturePad.clearSignature();
      this.formData.signature = null;
    },
    saveSg() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) this.formData.signature = data;
    },
    goBack() {
      this.$router.back(-1);
    },
    submit() {
      if (!this.validFields() || !this.validFile()) return;
      let formData = new FormData();
      this.setFormData(formData);
      modalAction.saveApplication(formData, () => {
        this.$router.push({
          name: "adoption-application",
          params: {
            msg: "領養申請提交成功",
          },
        });
      });
    },
    validatorInit(){
    $.validator.setDefaults({
      errorElement: "div",
      errorClass: "is-invalid text-danger",
    });

     $.validator.addMethod("cellPhone", function(value) { 
        const rule = new RegExp("^09\\d{8}$");
        if (value) return rule.test(value);
        else return false;
      },
      "電話請輸入09開頭，且長度必須為10"
    );
    },
    validFields() {
      $("#applicationForm").validate({
        messages: {
          applEmail: {
            email: "email格式有誤",
          },
        },
      });
      return $("#applicationForm").valid();
    },
    validFile() {
      this.saveSg();
      const validateMsg = modalAction.validateMsg;
      this.errorMsg = Object.keys(validateMsg).reduce((result, current) => {
        if (!this.formData[current]) result = result.concat(modalAction.validateMsg[current]);
        return result;
      }, "");

      if (this.errorMsg) {
        this.$bvModal.show("modal-errorMsg");
        return false;
      } else return true;
    },
    setFormData(data) {
      const { formData } = this;
      Object.keys(formData).forEach((title) => {
        if (title === "signature") data.append(title, this.converToBlob(formData.signature));
        else data.append(title, formData[title]);
      });
    },
    converToBlob(base64Image) {
      const parts = base64Image.split(";base64,");
      const imageType = parts[0].split(":")[1];
      const decodedData = window.atob(parts[1]);
      const uInt8Array = new Uint8Array(decodedData.length);
      for (let i = 0; i < decodedData.length; ++i) uInt8Array[i] = decodedData.charCodeAt(i);
      return new Blob([uInt8Array], { type: imageType });
    },
  },
};
</script>

<style scoped>
.bi-camera {
  cursor: pointer;
}

.container {
  width: "100%";
  padding: 8px 16px;
}

#signature {
  border-style: inset;
}
</style>
