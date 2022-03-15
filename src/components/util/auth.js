class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authenticated = true;
    }
    return this.authenticated;
  }
}

export default new Auth();
