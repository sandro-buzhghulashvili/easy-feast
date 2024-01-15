import { CartItem } from '../store/cart-context';

type AddressObject = {
  location: string;
  address: string;
  zip: string;
};

export type OrderObject = {
  id: string;
  foods: CartItem[] | [];
  date: string;
  price: number;
  location: AddressObject | undefined;
};

class User {
  username: string;
  email?: string;
  password: string;
  id?: string;
  img?: string;
  address?: AddressObject | undefined;
  orders?: OrderObject[] | undefined;

  constructor(
    username: string,
    email: string,
    password: string,
    img: string = 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png',
    address: AddressObject | undefined = undefined,
    orders: OrderObject[] | undefined = undefined
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.id = new Date().toISOString();
    this.img = img;
    this.address = address;
    this.orders = orders;
  }
}

export default User;
