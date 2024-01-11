type AddressObject = {
  location: string;
  address: string;
  zip: string;
};

class User {
  username: string;
  email?: string;
  password: string;
  id?: string;
  img?: string;
  address?: AddressObject | undefined;

  constructor(
    username: string,
    email: string,
    password: string,
    img: string = 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png',
    address: AddressObject | undefined = undefined
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.id = new Date().toISOString();
    this.img = img;
    this.address = address;
  }
}

export default User;
