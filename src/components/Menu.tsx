import { useState } from "react"
import {Foods} from "../assets/DUMMY_FOODS"
import classes from "./Menu.module.scss"

import burgerIcon from "../assets/food-types/burger.png"
import cupcakeIcon from "../assets/food-types/cupcake.png"
import pizzaIcon from "../assets/food-types/pizza.png"
import ramenIcon from "../assets/food-types/ramen.png"
import iceCreamIcon from "../assets/food-types/ice-cream.png"

const TypeIconArray = [
    {
        type : 'Burger',
        icon : burgerIcon
    },
    {
        type : 'Pizza',
        icon : pizzaIcon
    },
    {
        type : 'Cupcake',
        icon : cupcakeIcon
    },
    {
        type : 'Ramen',
        icon : ramenIcon
    },
    {
        type : 'Ice Cream',
        icon : iceCreamIcon
    },
]

const Menu: React.FC = () => {
    console.log(Foods)
    const [selectedType,setSelectedType] = useState<string>('Pizza')

    const selectTypeHandler = (type:string) => {
        setSelectedType(type)
    }

    console.log(selectedType)

    return (
        <div className="container text-center py-3 px-5 mx-auto mb-40">
            <p className="text-primary_orange font-bold mb-3">OUR MENU</p>
            <h1 className="text-typography_color text-3xl text-center font-bold mb-14">Menu That Always Makes You Fall In Love</h1>
            <div className={`whitespace-nowrap overflow-x-auto p-5 ${classes['type-select']}`}>
                {TypeIconArray.map(type => {
                    return (
                        <button className={`mr-12 duration-500 w-22 h-22 rounded-xl ${type.type === selectedType ? classes.active : undefined}`} key={TypeIconArray.indexOf(type)} onClick={() => selectTypeHandler(type.type)}>
                            <div className="flex flex-col items-center p-4">
                                <div className="p-1 bg-white_color rounded-full mb-2">
                                    <img className="h-8 w-8" src={type.icon} alt="type" />
                                </div>
                                <p>{type.type}</p>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Menu