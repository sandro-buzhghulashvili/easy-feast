import {motion} from "framer-motion"

import firstServiceImage from "../assets/services/first.png"
import secondServiceImage from "../assets/services/second.png"
import thirdServiceImage from "../assets/services/third.png"


const Services: React.FC = () => {
    return (
        <div className="container text-center text-lg p-3 px-5 mx-auto mb-40">
            <p className="text-primary_orange font-bold mb-3">WHAT WE SERVE</p>
            <h1 className="text-typography_color text-3xl text-center font-bold mb-14">Your Favorite Food Delivery Partner</h1>
            <div className="p-5 lg:flex lg:items-center lg:justify-between">
                <motion.div initial={{opacity : 0}} whileInView={{opacity : 1}} transition={{duration : 1}} className="flex flex-col items-center mb-10">
                    <img className="mb-5 lg:h-52" src={firstServiceImage} alt="first-service" />
                    <h1 className="text-2xl font-bold text-typography_color mb-5">Easy To Order</h1>
                    <p>You only need a few steps in ordering food</p>
                </motion.div>
                <motion.div initial={{opacity : 0}} whileInView={{opacity : 1}} transition={{duration : 1}} className="flex flex-col items-center mb-10">
                    <img className="mb-5 lg:h-52" src={secondServiceImage} alt="second-service" />
                    <h1 className="text-2xl font-bold text-typography_color mb-5">Fastest Delivery</h1>
                    <p>Delivery that is always ontime even faster</p>
                </motion.div>
                <motion.div initial={{opacity : 0}} whileInView={{opacity : 1}} transition={{duration : 1}} className="flex flex-col items-center mb-10">
                    <img className="mb-5 lg:h-52" src={thirdServiceImage} alt="third-service" />
                    <h1 className="text-2xl font-bold text-typography_color mb-5">Best Quality</h1>
                    <p>Not only fast for us quality is also number one</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Services