<template>
  <div>
    <Title :title="title" />
    <div class="p-2 card">
      <div class="p-2">
        <b-button class="m-2" @click="actionHandler(null, 'create')"> + 新增員工</b-button>
      </div>
      <b-tabs v-model="tabIndex" card>
        <b-tab v-for="(item, index) in astatus" :key="index" :title="item.title" @click="getAllByParams(item.param)">
        </b-tab>
      </b-tabs>
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
        :filter-included-fields="filterOn">
        <template #cell(index)="row">{{ row.index + 1 }}</template>
        <template #cell(photo)="data">
            <img style="width: 150px" :alt="data.item.petName" :src="`http://localhost:7070/employees/show/${data.item.empNo}`"/>
        </template>
        <template #cell(action)="data">
          <template v-if="tabIndex === 0">
            <b-button class="mr-1" variant="light" size="sm" @click="actionHandler(data.item, 'edit')">修改</b-button>
            <b-button class="mr-1" variant="light" size="sm" @click="showMsgBox(data.item.empNo)">離職</b-button>
          </template>
          <span v-else>--</span>
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
  </div>
</template>

<script>
import Title from "@/components/Title";
import modalAction from "./ModalAction";
import { mapGetters } from "vuex";
export default {
  components: { Title },
  data() {
    return {
      title: "員工管理",
      astatus: [
        { param: "VALID", title: "在職員工" },
        { param: "INVALID", title: "離職員工" },
      ],
      tableField: [
        { key: "index", label: "序號" },
        { key: "photo", label: "照片" },
        { key: "empName", label: "名稱" },
        { key: "empAccount", label: "帳號" },
        { key: "empNickname", label: "暱稱" },
        { key: "empAccStatus", label: "帳號狀態", formatter: (value) => {return value === "VALID" ? "有效" : "失效";},},
        { key: "empEmail", label: "信箱" },
        { key: "empRole", label: "角色" },
        { key: "empArrDate", label: "到職日" },
        { key: "action", label: "操作" },
      ],
      empList: null,
      currentPage: 1,
      tabIndex: 0, // 0-VALID 1-INVALID
      filter: null,
      filterOn: ["empName", "empEmail", "empRole", "empArrDate"],
      totalRows: 0,
    };
  },
  created() {
    if (this.$route.params.mode) {
      let content = this.$route.params.mode === "create" ? "新增成功" : "修改成功";
      this.makeToast(content);
      delete this.$route.params.mode;
    }
    this.getAllByParams("VALID");
  },
  computed: {
    ...mapGetters(["getConst"]),
  },
  methods: {
    getAllByParams(status) {
      this.tabIndex = status === "VALID" ? 0 : 1;
      let param = { empAccStatus: status };
      modalAction.getAllEmps(param, (res) => {
        this.empList = res.map((item) => {
          item.empRole = this.getConst.role[item.empRole];
          return item;
        });
        this.totalRows = res.length;
      });
    },
    actionHandler(data, action) {
      this.$router.push({
        name: "employee-management-create",
        params: {
          data: data,
          mode: action,
        },
      });
    },
    makeToast(content) {
      this.$bvToast.toast(content, {
        title: "通知",
        solid: true,
      });
    },
    showMsgBox(empNo) {
      this.$bvModal
        .msgBoxConfirm("請確認是否設定離職?", {
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
          modalAction.updateStatus(empNo, () => {
            this.makeToast("已設定離職");
            this.getAllByParams("INVALID");
          });
        });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
