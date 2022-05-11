<template>
  <div>
    <Title :title="title" />
    <div class="p-2 card">
      <b-table
        v-if="petList"
        small
        show-empty
        :empty-text="$store.getters.getConst.emptyText"
        class="text-center light-table"
        :per-page="$store.getters.getConst.perPage"
        :fields="tableField"
        :items="petList"
        :current-page="currentPage"
        hover
      >
        <template #cell(index)="row">{{ row.index + 1 }}</template>
        <template #cell(photo)="data">
          <img
            style="width: 150px"
            :alt="data.item.petName"
            :src="`http://localhost:7070/adoption/show/${data.item.adoPetNo}`"
          />
        </template>
        <template #cell(location)="data"> {{ $store.getters.getConst.location[data.item.location] }} </template>
        <template #cell(petCat)="data"> {{ $store.getters.getConst.petCat[data.item.petCat] }} </template>
        <template #cell(action)="data">
          <b-button class="mr-1" variant="light" size="sm" @click="pdfApply(data.item)">申請</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination
      v-if="petList"
      v-model="currentPage"
      :total-rows="petList.length"
      :per-page="$store.getters.getConst.perPage"
      size="sm"
      align="right"
    ></b-pagination>
  </div>
</template>

<script>
import Title from "@/components/Title";
import modalAction from "./ModalAction";
export default {
  components: { Title },
  data() {
    return {
      title: "領養申請",
        tableField: [
        { key: "index", label: "序號" },
        { key: "adoPetNo", label: "編號" },
        { key: "photo", label: "照片"},
        { key: "petName", label: "名稱" },
        { key: "petBreed", label: "品種" },
        { key: "petSex", label: "性別", formatter: value => { return value === 'FEMALE' ? '母' : '公' }},
        { key: "petBirth", label: "生日" },
        { key: "petWeight", label: "體重", formatter: value => { return value + "KG" } },
        { key: "petCat", label: "分類" },
        { key: "location", label: "探訪地點", },
        { key: "action", label: "操作" },
      ],
      petList: null,
      currentPage: 1,
    };
  },
  created() {
    this.getAllPets("CREATE");
    if (this.$route.params.msg) {
       this.makeToast(this.$route.params.msg);
      delete this.$route.params.msg;
    }
  },
  methods: {
    getAllPets(status) {
      modalAction.getAllPets(status, (res) => {
        this.petList = res;
      });
    },
    makeToast(content) {
      this.$bvToast.toast(content, {
        title: "通知",
        solid: true,
      });
    },
    pdfApply(adoPet) {
      this.$router.push({
        name: "adoption-application-pdf",
        params: {
          data: adoPet,
        },
      });
    },
  },
};
</script>
