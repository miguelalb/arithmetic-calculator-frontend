import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      isLoggedIn: false,
      userToken: null
    }
  },
  actions: {
    setToken(token) {
      this.userToken = token;
      this.isLoggedIn = true;
    },

    removeToken() {
      this.userToken = null;
      this.isLoggedIn = false;
    }
  }
})
