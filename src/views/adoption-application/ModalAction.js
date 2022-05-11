import { apiAdoption } from "@/axios/apiUrl.js";
import store from "@/store/index.js";
const modalAction = {
  petFields:[
    { param: "petName", label: "寵物名" , value:null},
    { param: "adoPetNo", label: "領養編號", value:null},
    { param: "petSex", label: "性別", value:null},
    { param: "petBreed", label: "品種", value:null},
    { param: "petWeight", label: "體重", value:null},
    { param: "location", label: "領養地點", value:null}
  ],
  validateMsg: {
    idLeft: '左側身分證<br>',
    idRight: '右側身分證<br>',
    signature: '簽名<br>',
  },
  dataHandler(data){
    data.location = store.getters.getConst.location[data.location]
    data.petWeight = data.petWeight + 'KG'
    data.petSex = data.petSex === 'FEMALE' ? '母' : '公'
    return data
  },
  saveApplication(param, callback) {
    apiAdoption.addApplication(param, res => {
      callback(res);
    });
  },
  getAllPets(param,callback) {
    apiAdoption.getAllByStatus(param, res => {
      callback(res);
    });
  },
};

export default modalAction;
