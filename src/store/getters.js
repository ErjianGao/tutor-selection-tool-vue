const getters = {
  // user
  isLogin: state => state.user.isLogin,
  name: state => state.user.name,
  identityNo: state => state.user.identityNo,
  role: state => state.user.role,
  directions: state => state.user.directions,
  // student
  student_directions: state => state.student.directions,
  teacher: state => state.student.teacher,
  // teacher
  // permission
  permission_routes: state => state.permission.routes
};
export default getters;
