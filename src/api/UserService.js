import apiClient from "./base";

class UserService {
  getUserBalance(token) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    return apiClient.get('/users/user-balance', {
      headers: headers
    })
  }
}

export default UserService