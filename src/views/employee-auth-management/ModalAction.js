import { apiEmployee } from "@/axios/apiUrl.js";

const modalAction = {
  getAllEmps(param,callback) {
    apiEmployee.getAllByParams(param, res => {
      callback(res);
    });
  },
  authFunAction(apiType, param,callback) {
    apiEmployee[apiType](param, res => {
      callback(res);
    });
  },
};

export default modalAction;
