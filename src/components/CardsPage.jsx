import React, { useEffect, useState } from 'react'

import { firestoreDB } from '../utils/firebase.js'
import { deleteFSDocandFBStorage } from '../utils/db-actions.js'

import '../css/CardsPage.css'

import bicycleblue from '../images/cards/bicyclestandard-blue.png'
import AddCardForm from './AddCardForm.jsx'
import Image from './Image.jsx'
import ReactSpinner from './ReactSpinner.jsx'
import RatingsPanel from './RatingsPanel.jsx'
import MatButton from './MatButton.jsx'

const CardsPage = (props) => {

    return (
        <div className='CardsPage'>
            <AddCardForm />
            <CardsPanel />
        </div>
    )

}

const MyVideo = (props) => {

    const { src } = props

    return (
        // <div className='card-video'>
        <video

            className='card-video'
            // ref={vidEl}
            /* src="https://assets.polestar.com/video/test/polestar-1_09.mp4" */
            src={src}
            type="video/mp4, video/ogg"
            // width="200" height="100"
            controls

        />
        // </div>
    )
}


const ActionsPanel = () => {

    const buttonAction = () => {
        console.log("Card delete button clicked...")
    }

    return (
        <div id='actions' className='card-ActionsPanel'>
            <MatButton id={'card-delete'} text={"Delete Card"} onClick={buttonAction} />
            {/* Actions Panel */}
        </div>
    )
}



const CardsPanel = () => {

    const [loading, setLoading] = useState(true)
    const [cards, setCards] = useState([])

    useEffect(() => { // get card documents for the selected path/category

        console.log("CardsPanel useEffect (1) ...")

        const itemsCollection = firestoreDB.collection('/cards')
        setLoading(true)

        const unsubscribe = itemsCollection.onSnapshot((docSnapshot) => {
            // console.log("docSnapshot:", docSnapshot.docs)
            let parsedItems = []

            docSnapshot.docs.forEach((doc) => {

                parsedItems.push({
                    id: doc.id,
                    ...doc.data()
                })

            })
            setLoading(false)
            // console.log('parsedItems:', parsedItems)
            setCards(parsedItems)

        })
        return () => {

            // Clean up the listener subscription
            console.log("Clean up the Items useEffect listener subscription...")
            unsubscribe()

        }

    }, [])


    const GetCards = () => {

        if (loading) {
            return <ReactSpinner />
        }
        else {
            const listCards = cards.map((card) => {
                return <Card key={card.id} card={card} />
            })
            return listCards
        }
    }

    return (
        <div className='CardsPanel'>
            {GetCards()}
        </div>
    )

}

const Card = (props) => {

    const { card } = props
    console.log("Card:", card)

    const [selection, setSelection] = useState(0)
    const media = [{ text: 'Comment', data: card.comment }, { text: 'Instruction', data: card.imageURL }, { text: 'Performance', data: card.imageURL2 }, { text: 'Actions', data: null }]

    const [clickedClass, setClickedClass] = useState('')
    // const vidEl = useRef(null)
    // const collection = '/cards/'

    const deleteCard = () => {

        
        console.log('Delete Card...')
        deleteFSDocandFBStorage(card)
        // let url = firebaseStorage.refFromURL(card.imageURL)
        // let url2 = firebaseStorage.refFromURL(card.imageURL2)
        // deleteFSDocId(collection, card.id)
        // if (card.imageURL !== '') {
        //     let url = firebaseStorage.refFromURL(url)
        // }
        // if (card.imageURL2 !== '') {
        //     let url2 = firebaseStorage.refFromURL(card.imageURL2)
        // }

    }

    const handleClick = (e) => {

        console.log('Cards handleClick e:', e.target.id + ' : ', e);

        switch (e.target.id) {
            case 'vidView': {

                (selection === 3) ? setSelection(0) : setSelection(selection + 1)
                console.log('Se;ecyion:', selection);
                break;
            }

            // case 'actions': {
            //     console.log('Actions panel clicked...');
            //     break;
            // }

            case 'card-delete': {
                // console.log('Actions Delete Button clicked...');
                deleteCard()
                break;
            }

            default: {

                (clickedClass === '') ? setClickedClass('clicked') : setClickedClass('')

            }

        }

    }

    // const launchLink = (url) => {

    //     console.log("launchLink ... imageURL:", url)
    //     window.open(url, '_blank')

    // }

    const getMedia = () => {

        switch (selection) {
            case 0: {

                return card.comment

            }
            case 1:

                if (card.imageURL !== '') {
                    return (
                        <MyVideo src={card.imageURL} />
                    )
                }
                else {
                    return 'No video upload'
                }

            case 2:

                if (card.imageURL2 !== '') {
                    return (
                        <MyVideo src={card.imageURL2} />
                    )
                }
                else {
                    return 'No video upload'
                }

            case 3:
                return <ActionsPanel />

            default: return null
        }
    }


    return (
        <div className="flip-card" >
            <div className={`flip-card-inner ${clickedClass}`} onClick={(e) => handleClick(e)}>

                <div id='card' className="flip-card-front">
                    <Image src={bicycleblue} height={350} width={240} mode={'cover'} />
                </div>
                <div className="flip-card-back">
                    <div className='flip-card-content'>
                        <h1>{card.title}</h1>

                        <div className='cardRatingPanel'>
                            <RatingsPanel rating={card.rating} />
                        </div>
                        <p id='vidView'>{media[selection].text}</p>
                        <div>
                            {getMedia()}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )


}

export { CardsPage as default }