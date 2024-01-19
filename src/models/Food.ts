class Food {
  id: string;
  title: string;
  type: string;
  price: string;
  img: string;
  description?: string;
  typeIcon?: string;
  constructor(
    foodTitle: string,
    foodType: string,
    foodPrice: string,
    foodImg: string,
    foodId: string = new Date().toISOString(),
    description: string,
    typeIcon: string
  ) {
    this.id = foodId;
    this.title = foodTitle;
    this.type = foodType;
    this.price = foodPrice;
    this.img = foodImg;
    this.description = description;
    this.typeIcon = typeIcon;
  }
}

export default Food;
