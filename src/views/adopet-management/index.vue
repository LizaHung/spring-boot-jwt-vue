<template>
  <div>
    <Title :title="title" />

    <div class="p-2 card">
      <div class="p-2">
        <b-button class="m-2" @click="actionHandler(null, 'create')"> + 新增寵物</b-button>
      </div>
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
        <template #cell(index)="row">{{row.index + 1}}</template>
        <template #cell(photo)="data">
          <img
            style="width: 150px"
            :alt="data.item.petName"
            :src="`http://localhost:7070/adoption/show/${data.item.adoPetNo}`"
          />
        </template>
        <template #cell(petCat)="data"> {{ $store.getters.getConst.petCat[data.item.petCat] }} </template>
        <template #cell(location)="data"> {{ $store.getters.getConst.location[data.item.location] }} </template>
        <template #cell(action)="data">
            <b-button class="mr-1" variant="light" size="sm" @click="actionHandler(data.item, 'edit')"> 修改</b-button>
            <b-button class="mr-1" variant="light" size="sm" @click="actionHandler(data.item.adoPetNo, 'delete')">移除</b-button>
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
      title: "寵物管理",
      tableField: [
        { key: "index", label: "序號" },
        { key: "adoPetNo", label: "編號" },
        { key: "photo", label: "照片"},
        { key: "petType", label: "類別", formatter: value => { return value === 'DOG' ? '狗' : '貓' }},
        { key: "petName", label: "名稱" },
        { key: "petBreed", label: "品種" },
        { key: "petSex", label: "性別", formatter: value => { return value === 'FEMALE' ? '母' : '公' }},
        { key: "petBirth", label: "生日" },
        { key: "petWeight", label: "體重", formatter: value => { return value + "KG" } },
        { key: "petCat", label: "分類" },
        { key: "petChar", label: "特徵", formatter: value => { return !value ?  '--' : value } },
        { key: "location", label: "探訪地點", },
        { key: "action", label: "操作" },
      ],
      petList: null,
      currentPage:1
    };
  },
  created() {
    this.getAllPets()
    if (this.$route.params.mode) {
      let content = this.$route.params.mode === "create" ? "新增成功" : "修改成功";
      this.makeToast(content);
      delete this.$route.params.mode;
    }
  },
  methods: {
    getAllPets(){
      modalAction.getAllPets('CREATE', (res) => {
        this.petList = res;
      });
    },
    actionHandler(data, action) {
      if (action === "delete") {
        this.showMsgBox(data);
      } else {
        this.$router.push({
          name: "adopet-management-create",
          params: {
            data: data,
            mode: action,
          },
        });
      }
    },
    makeToast(content) {
      this.$bvToast.toast(content, {
        title: "通知",
        solid: true,
      });
    },
    showMsgBox(data) {
      this.$bvModal
        .msgBoxConfirm("請確認是否要刪除?", {
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
          modalAction.addOrUpdateAdopet("deleteAdopet", data, () => {
            this.makeToast("刪除成功");
            this.getAllPets()
          });
        });
    },
  },
};
</script>
