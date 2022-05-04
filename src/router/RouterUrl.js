const routerUrl = [
  {
    path: "/About",
    fnName: "關於我",
  },
  {
    path: "/adoption/management",
    fnName: "領養管理",
  },
  {
    path: "/adopet/management",
    fnName: "寵物管理",
    operates: [{ path: "/adopet/management/create", localFile: "CreateOrUpdatePet" }],
  },
  {
    path: "/employee/management",
    fnName: "員工管理",
    operates: [{ path: "/employee/management/create", localFile: "CreateOrUpdateEmp" }],
  },
    {
    path: "/employee-auth/management",
    fnName: "員工權限管理",
    // operates: [{ path: "/function/management/create", localFile: "CreateOrUpdatefun" }],
  },
];
export default routerUrl;
