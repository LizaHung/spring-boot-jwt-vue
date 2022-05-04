<template>
  <div>
    <Title :title="title" />
    <div class="p-2 card">
      <div class="col-5 mb-2 mx-auto">
        <b-input-group size="sm">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <b-table
        v-if="empList"
        small
        show-empty
        :empty-text="getConst.emptyText"
        class="text-center light-table"
        :per-page="getConst.perPage"
        :fields="tableField"
        :items="empList"
        :current-page="currentPage"
        hover
        :filter="filter"
        @filtered="onFiltered"
        :filter-included-fields="filterOn"
      >
        <template #cell(index)="row">{{ row.index + 1 }}</template>
        <template #cell(action)="data">
            <b-button class="mr-1" variant="light" size="sm" @click="actionHandler(data.item.empNo)">檢視/修改</b-button>
            <!-- <b-button class="mr-1" variant="light" size="sm" v-b-modal.auth-modal>檢視/修改</b-button> -->
        </template>
      </b-table>
    </div>
     <b-pagination
      v-if="empList"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="getConst.perPage"
      size="sm"
      align="right"
    ></b-pagination>
     <auth-modal :empNo="empNo" @saveSuccessfully="makeToast"></auth-modal>
  </div>
</template>

<script>
import Title from "@/components/Title";
import modalAction from "./ModalAction";
import authModal from "./AuthModal";
import { mapGetters } from "vuex";
export default {
  components: { Title, authModal },
  data() {
    return {
      title: "員工權限管理",
        tableField: [
        { key: "index", label: "序號" },
        { key: "photo", label: "照片" },
        { key: "empName", label: "名稱" },
        { key: "empNickname", label: "暱稱" },
        { key: "empAccStatus", label: "帳號狀態", formatter: (value) => {return value === "VALID" ? "有效" : "失效";},},
        { key: "empEmail", label: "信箱" },
        { key: "empRole", label: "角色" },
        { key: "empArrDate", label: "到職日" },
        { key: "action", label: "操作" },
      ],
      empList: null,
      currentPage: 1,
      filter: null,
      filterOn: ["empName", "empEmail", "empRole", "empArrDate"],
      totalRows: 0,
      empNo:null
    };
  },
  created(){
    this.getAllEmps();
  },
  computed: {
    ...mapGetters(["getConst"]),
  },
  methods:{
     getAllEmps() {
      let param = { empAccStatus: "VALID" };
      modalAction.getAllEmps(param, (res) => {
        this.empList = res.map((item) => {
          item.empRole = this.getConst.role[item.empRole];
          return item;
        });
        this.totalRows = res.length;
      });
    },
    makeToast(content) {
      this.$bvToast.toast(content, {
        title: "通知",
        solid: true,
      });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    actionHandler(empNo){
      this.empNo = empNo
      this.$nextTick(() => {
        this.$bvModal.show('auth-modal')
      })
    }
  }
};
</script>
