class User {
  username?: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

export default User;
