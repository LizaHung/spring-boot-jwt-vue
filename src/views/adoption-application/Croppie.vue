<template>
  <label class="label.cabinet"
    ><figure>
      <img v-if="cropped" :src="cropped" class="showId img-responsive img-thumbnail" alt="idFront" />
      <img v-else :src="require('@/assets/' + jpg)" class="showId img-responsive img-thumbnail" alt="idFront" />
      <figcaption>
        <b-icon icon="camera" font-scale="2"></b-icon>
      </figcaption>
    </figure>
    <b-form-file @change="croppie" required accept="image/*" style="display: none"></b-form-file>

    <b-modal
      :id="`${id}-modal`"
      ok-title="送出"
      centered
      cancel-title="取消"
      @cancel="resetModal"
      @ok="crop"
      title="剪裁"
      size="lg"
    >
      <div class="d-block text-center">
        <vue-croppie
          ref="croppieRef"
          :enableOrientation="true"
          :boundary="{ width: 420, height: 300 }"
          :viewport="{ width: 400, height: 250, type: 'square' }"
        >
        </vue-croppie>
      </div>
    </b-modal>
  </label>
</template>

<script>
export default {
  props: {
    jpg: String,
    id: String,
  },
  data() {
    return {
      croppieImage: "",
      cropped: null,
    };
  },
  methods: {
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.$bvModal.show(`${this.id}-modal`);
      this.readFile(e, files);
    },
    readFile(e, files) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        });
      };
      reader.readAsDataURL(files[0]);
    },
    crop() {
      let options = {
        type: "base64",
        size: { width: 600, height: 450 },
        format: "jpeg",
      };

      let idRight = {
        type: "blob",
        size: { width: 600, height: 450 },
        format: "jpeg",
      };

      this.$refs.croppieRef.result(idRight, (output) => {
        this.$emit("croppedImg", output);
        console.log("emit croppedImg");
      });

      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = this.croppieImage = output;
        console.log(this.croppieImage);
      });
    },
    resetModal() {
     this.cropped = null
     this.$emit("croppedImg", null);
    },
  },
};
</script>

<style lang="scss" scoped>
.showId {
  width: 350px;
  height: 225px;
  cursor: pointer;
}
</style>
