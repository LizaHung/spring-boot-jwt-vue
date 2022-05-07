import { apiEmployee } from "@/axios/apiUrl.js";

const modalAction = {
  fields:[
    // {param: "empNo", label: "編號", value:null, isRequired:true, type:'input' },
    {param: "empPhoto", label: "照片", value:null, isRequired:true, type:'photo'},
    {param: "empName", label: "名稱", value:null, isRequired:true, type:'input' },
    {param: "empNickname", label: "暱稱", value:null, isRequired:false, type:'input' },
    {param: "empAccount", label: "帳號", value:null, isRequired:true, type:'input' }, 
    {param: "empEmail", label: "信箱", value:null, isRequired:true, type:'input' },
    {param: "empRole", label: "角色", value:null, isRequired:true, type:'select', options:[]},
    {param: "empArrDate", label: "到職日", value:null, isRequired:true, type:'date' },
  ], 
  getAllEmps(param,callback) {
    apiEmployee.getAllByParams(param, res => {
      callback(res);
    });
  },
  updateStatus(param,callback) {
    apiEmployee.updateEmpAccStatus(param, res => {
      callback(res);
    });
  },
  addOrUpdateEmp(apiType, param, callback){
    apiEmployee[apiType](param, res=>{
        callback(res);
    })
  }
};

export default modalAction;
