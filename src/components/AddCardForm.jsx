import React, { useState } from 'react'

import { addCard } from '../utils/db-actions.js'

// import MatSelect from './MatSelect.jsx'
import MatInput from './MatInput.jsx'
import ImageForm from './ImageForm.jsx'
import MatButton from './MatButton.jsx'
import RatingsPanel from './RatingsPanel.jsx'

import '../css/AddCardForm.css'

const AddCardForm = (props) => {

    const { dbPath = '/cards'/* , categories=['cards', 'misc'] */ } = props

    const [title, setTitle] = useState("")
    const [comments, setComments] = useState("")
    const [media1, setMedia1] = useState(new File([""], ""))
    const [media2, setMedia2] = useState(new File([""], ""))
    // const [category, setCategory] = useState('cards')
    const [rating, setRating] = useState(1)

    // const media1 = useRef(null)
    // const media2 = useRef(null)

    const resetForm = () => {

        // setCategory('cards')
        setTitle('')
        setComments('')
        setRating(1)
        setMedia1(new File([""], ""))
        setMedia2(new File([""], ""))

    }

    const buttonAction = () => {

        console.log("Add card ...")
        console.log("dbPath:", `${dbPath}`)
        console.log("Title", title)
        console.log("Comments:", comments)
        console.log("Rating:", rating)
        console.log("Media File:", media1)
        console.log("Media File 2:", media2)

        addCard(dbPath, title, comments, rating, media1, media2)
        .then( (id) => {
            console.log('Added new ref: ', id);
            return id
        })
        .then(ref => {
            console.log('Added new document with ID: ', ref);
            resetForm()
        })
        .catch(function (error) {
            console.error("Error adding new document: ", error);
        });

        // addCard2(dbPath, title, comments, rating, media1, imageFile2)
        // .then( /* () => { */
        //     console.log('Added new ref: ')
        // //     return id
        // )
        // // .then(ref => {
        // //     console.log('Added new document with ID: ', ref);
            
        // // })
        // // .catch(function (error) {
        // //     console.error("Error adding new document: ", error);
        // // });
        // resetForm()

    }

    // const setMyImageFile = (aFile) => {
    //     console.log("setMyImageFile 2 ...")
    //     setImageFile2(aFile)

    // }

    const disableButton = () => {

        // const regex = /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/
        // console.log("test:", regex.test(value))

        return (title !== "") ? false : true

    }

    return (

        <div className='addCardForm'>

            {/* <MatSelect categories={categories} onChange={setCategory} /> */}
            <MatInput value={title} onChange={setTitle} /* onFocus={setMessage} */ type={"textarea"} label={"Title"} required />
            <MatInput value={comments} onChange={setComments} /* onFocus={setMessage} */ type={"textarea"} label={"Comments"} />
            <RatingsPanel rating = {rating} setRating={setRating}/>
            <ImageForm /* myRef={media1}  */id={'media-one'} mediaFileName={media1.name} onChange={setMedia1} labelText={'Upload instruction ...'}/>
            <ImageForm /* myRef={media2} */ id={'two'} mediaFileName={media2.name} onChange={setMedia2} labelText={'Upload performance ...'}/>
            <MatButton text={"Add"} onClick={buttonAction} disabled={disableButton()} />

        </div>

    )
}

export { AddCardForm as default }