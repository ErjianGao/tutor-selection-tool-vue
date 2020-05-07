const getters = {
  isLogin: state => state.userModule.isLogin,
  name: state => state.userModule.name,
  role: state => state.userModule.role,
  permission_routes: state => state.permissionModule.routes
};
export default getters;
