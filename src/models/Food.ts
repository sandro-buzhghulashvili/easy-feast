class Food {
  id: string;
  title: string;
  type: string;
  price: string;
  img: string;
  description?: string;
  constructor(
    foodTitle: string,
    foodType: string,
    foodPrice: string,
    foodImg: string,
    foodId: string = new Date().toISOString(),
    description: string
  ) {
    this.id = foodId;
    this.title = foodTitle;
    this.type = foodType;
    this.price = foodPrice;
    this.img = foodImg;
    this.description = description;
  }
}

export default Food;
