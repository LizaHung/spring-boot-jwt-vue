<template>
  <div>
    <Title :title="title" />
    <div class="p-2 card">
      <b-tabs v-model="tabIndex" card>
        <b-tab
          v-for="(item, index) in status"
          :key="index"
          :title="item.title"
          @click="getAllPets(item.param)">
        </b-tab>
      </b-tabs>
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
        hover>
        <template #cell(index)="row">{{row.index + 1}}</template>
        <template #cell(photo)="data">
          <img style="width: 150px" :alt="data.item.petName" :src="`http://localhost:7070/adoption/show/${data.item.adoPetNo}`"/>
        </template>
        <template #cell(location)="data"> {{ $store.getters.getConst.location[data.item.location] }} </template>
        <template #cell(petCat)="data"> {{ $store.getters.getConst.petCat[data.item.petCat] }} </template>
        <template #cell(pdf)="data">  <b-button class="mr-1" variant="light" size="sm" @click="pdfReader(data.item.adoPetNo)"> 檢視</b-button> </template>
        <template #cell(breeder)="data"> 
          <span>{{data.item.breeder.breederName}} <br> {{data.item.breeder.breederEmail}} <br> {{data.item.breeder.breederPhone}} </span>
        </template>
        <template #cell(action)="data">
          <template v-if="tabIndex === 0">
            <b-button class="mr-1 mx-1 mb-1" variant="light" size="sm" @click="showMsgBox(data.item.adoPetNo)">審核</b-button>
            <b-button class="mr-1 mx-1" variant="light" size="sm" @click="pdfApply(data.item)">重新提交</b-button>
          </template>
            <span v-else>--</span>
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
     <pdf-modal :adoPetNo="pdfInfo"></pdf-modal>
  </div>
</template>

<script>
import Title from "@/components/Title";
import modalAction from "./ModalAction";
import pdfModal from "./PdfModal";
import { mapGetters } from "vuex";
export default {
  components: { Title, pdfModal },
  data() {
    return {
      title: "領養管理",
      status:[
        {param:'PROCESSING', title:'待審核'},
        {param:'ADOPTED', title:'已審核'}
      ],
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
        { key: "pdf", label: "申請書" },
        { key: "breeder", label: "領養人" },
        { key: "employee.empName", label: "審核管理員" },
        { key: "action", label: "操作" },
      ],
      petList: null,
      currentPage:1,
      tabIndex:0,  // 0-PROCESSING 1-ADOPTED
      pdfInfo:null
    };
  },
  created() {
    this.getAllPets('PROCESSING')
  },
  computed: {
    ...mapGetters(["getCurrentUserData"]),
  },
  methods: {
    getAllPets(status){
     this.tabIndex =  status === 'PROCESSING' ? 0 : 1
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
    showMsgBox(adoPetNo) {
      this.$bvModal
        .msgBoxConfirm("請確認是否通過審核?", {
          title: "通知",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "確認",
          cancelTitle: "取消",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (!value) return;
          let data = {
            'adoPetNo' : adoPetNo,
            'empNo': this.getCurrentUserData.empNo
          };
          modalAction.confirm( data, () => {
            this.makeToast("審核成功");
            this.getAllPets("ADOPTED")
          });
        });
    },
    pdfReader(adoPetNo){
      this.pdfInfo = adoPetNo
      this.$bvModal.show('pdf-modal')
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
