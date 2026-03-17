// export default new UserService();
import api from "./api";

class UserService {

  register = async (userData) => {

    const response = await api.post("/users/signup", userData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  };

  login = async (userData) => {

    const response = await api.post("/users/signin", userData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  };
}

export default new UserService();