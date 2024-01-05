class User {
  username: string;
  email?: string;
  password: string;
  id?: string;
  img?: string;

  constructor(
    username: string,
    email: string,
    password: string,
    img: string = 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.id = new Date().toISOString();
    this.img = img;
  }
}

export default User;
