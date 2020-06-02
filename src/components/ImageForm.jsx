import React from 'react'

import '../css/ImageForm.css'
import upload from '../images/upload.png'

const ImageForm = (props) => {

    const { id, /* myRef,  */labelText = 'Upload Media', onChange, mediaFileName = 'No file selected...' } = props
    console.log("Mediafilename:", mediaFileName)

    // const setFile = (e) => {
    //     // console.log("SetFile:", e + " ref:", myRef.current)
    //     onChange(e)

    // }

    return (

        // <div className='imageForm'>
        //     <label htmlFor="file-upload" >
        //     <img src={upload} alt="Upload" height="20" width="20"/> 
        //         { labelText }
        //     </label>

        //     <input ref={myRef} id="file-upload" type="file" accept='video/*,.ogg,.gif,.jpg,.jpeg,.png' onChange={(e) => setFile(e.target.files[0])} />
        //     <p>{mediaFileName}</p>
        // </div>

        <div className='imageForm'>
            <label htmlFor={id} >
            <img src={upload} alt="Upload" height="20" width="20"/> 
                { labelText }
            </label>

            <input /* ref={myRef} */ id={id} type="file" accept='video/*,.ogg,.gif,.jpg,.jpeg,.png' onChange={(e) => onChange(e.target.files[0])} />
            <p>{mediaFileName}</p>
        </div>

    )

}

export { ImageForm as default }
