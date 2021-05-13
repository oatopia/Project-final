import axios from "axios";

const API_URL = "https://matching-dorm-tu-server.herokuapp.com/api/user/";

class AuthService {
  loginmember(username, password) {
    return axios
      .post(API_URL + "loginmember", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  loginowner(username, password) {
    return axios
      .post(API_URL + "loginowner", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username,password,type) {
    return axios.post(API_URL + "register", {
      username,
      password,
      type
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();