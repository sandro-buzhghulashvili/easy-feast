class User {
  username: string;
  email?: string;
  password: string;
  id?: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.id = new Date().toISOString();
  }
}

export default User;
