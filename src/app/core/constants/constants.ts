export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiurl = 'http://localhost:3000/api';

export const apiEndpoint = {
  AuthEndpoint: {
    register: `${apiurl}/auth/register`,
    login: `${apiurl}/auth/login`,
    logout: `${apiurl}/auth/logout`,
    loggedUser: `${apiurl}/auth/user`,
  },
  TodoEndpoint: {
    getAllTodo: `${apiurl}/todos`,
    addTodo: `${apiurl}/todos`,
    updateTodo: `${apiurl}/todos`,
    deleteTodo: `${apiurl}/todos`,
  },
};
