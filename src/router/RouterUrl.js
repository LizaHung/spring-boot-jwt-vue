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
];
export default routerUrl;
