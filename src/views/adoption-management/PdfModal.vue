<template>
  <div>
    <b-modal id="pdf-modal" hide-footer title="申請書">
      <div class="d-block text-center">
        <iframe :src="`${$store.getters.getBackendHost}/adoption/pdf/show/${adoPetNo}`" width="100%" height="450px" :title="`${adoPetNo}`"></iframe>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    adoPetNo: {
      type: Number,
    },
  },
  data() {
    return {};
  },
};
</script>
