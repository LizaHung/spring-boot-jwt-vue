import { apiAdoption } from "@/axios/apiUrl.js";

const modalAction = {
  fields:[
    // { param: "adoPetNo", label: "序號", value:null, isRequired:false, type:'text'},
    { param: "petType", label: "類別", value:'DOG', isRequired:true, type:'radio', options:[{ value: 'DOG', text: '狗' },{ value: 'CAT', text: '貓' }]},
    { param: "petName", label: "名稱" , value:null, isRequired:true, type:'input'},
    { param: "petBreed", label: "品種", value:null, isRequired:true, type:'input'},
    { param: "petSex", label: "性別", value:'MALE', isRequired:true, type:'radio', options:[{ value: 'MALE', text: '公' },{ value: 'FEMALE', text: '母' }]},
    { param: "petBirth", label: "生日", value:null, isRequired:true, type:'date'},
    { param: "petWeight", label: "體重", value:null, isRequired:true, type:'number'},
    { param: "petCat", label: "分類" , value:null, isRequired:true, type:'select', options:[]},
    { param: "petChar", label: "特徵", value:null, isRequired:false, type:'textarea'},
    { param: "location", label: "探訪地點", value:null, isRequired:true, type:'select', options:[]},
    { param: "photos", label: "照片", value:null, isRequired:true, type:'photo'},
  ], 
  getAllPets(param,callback) {
    apiAdoption.getAllPetsByStatus(param, res => {
      callback(res);
    });
  },
  addOrUpdateAdopet(apiType, param, callback){
    apiAdoption[apiType](param, res=>{
        callback(res);
    })
  }
};

export default modalAction;
