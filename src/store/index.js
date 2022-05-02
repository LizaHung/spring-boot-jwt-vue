import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUserData:{
      authFun:[],
      role:null,
      account:null,
      empNo:null
    },
    const:{
      emptyText:'查無資料',
      perPage: 5,
      dateFormat: 'YYYY-MM-DD',
      dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
      petCat:{
        OTHERS:'其他', 
        SHORTHAIR_CAT:'短毛貓', 
        LONGHAIR_CATL:'長毛貓', 
        SMALL_DOG:'狗(小型1-5kg)', 
        MEDIUM_DOG:'狗(中型10kg以下)', 
        LARGE_DOG:'狗(大型10kg以上)'
      },
      location:{
        TAOYUAN: '320桃園市中壢區中大路300號',
        TAICHUNG:'404台中市北區健行路490號',
        KAOHSIUNG:'812高雄市小港區松和路1號'
      },
      role:{
        ROLE_ADMIN:'管理員',
        ROLE_STAFF:'員工',
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getConst: state => state.const, 
  }
})
