const getters = {
  // user
  id: state => state.user.id,
  isLogin: state => state.user.isLogin,
  name: state => state.user.name,
  identityNo: state => state.user.identityNo,
  role: state => state.user.role,

  // permission
  permission_routes: state => state.permission.routes
};
export default getters;
