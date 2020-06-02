import React from 'react'

import '../css/RatingsPanel.css'
import fourCards from '../images/cards/4cards.png'
import threeCards from '../images/cards/3cards.png'
import twoCards from '../images/cards/2cards.png'
import oneCards from '../images/cards/1cards.png'
import Image from './Image.jsx'


const RatingsPanel = (props) => {

    const { rating, setRating } = props

    // const [ rating, setRating ]  = useState(1)
    // const [image, setImage] = useState(fourCards)

    const UpdateRating = () => {
        (rating === 4) ? setRating(1) : setRating(rating + 1)
    }

    const GetImage = () => {

        switch (rating) {
            case (4): 
                console.log("Rating = 4 ...");
                return fourCards
                // setImage(fourCards)
                // break;
            case 3:
                console.log("Rating = 3 ...");
                return threeCards
                // setImage(threeCards)
                // break;
            case 2:
                console.log("Rating = 2 ...");
                return twoCards
                // setImage(twoCards)
                // return image
            case 1:
                console.log("Rating = 1 ...");
                return oneCards
                // setImage(oneCards)
                // break
            default:
                return fourCards
        }
    }


    return (
        <div className='RatingsPanel' onClick={setRating ? (e) => UpdateRating() : null}>
            <Image src={GetImage()} height={50} width={150} />{/* {rating} */}
        </div>
    )

}

export { RatingsPanel as default }