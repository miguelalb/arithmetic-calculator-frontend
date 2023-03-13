import apiClient from "./base";

class UserService {
  getUserBalance() {
    return apiClient.get('/users/user-balance')
  }
}

export default UserService