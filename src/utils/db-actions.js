import firebase, { firestoreDB, firebaseStorageRef, firebaseStorage } from '../utils/firebase.js'

export var deleteFSDocandFBStorage = (card) => {

    const collection = '/cards/'

    console.log(`Deleting item at ${collection} with id: ${card.id}`);
    firestoreDB.collection(collection).doc(card.id).delete()
        .then(() => {
            console.log("Document successfully deleted! ... now remove images");
            // Go on to provide additional db changes if needed
            //   firestoreDB.collection("votes").doc(id).delete().then(() => {
            //     console.log("Votes deleted!");
            //   }).catch(function(error) {
            //     console.error("Error removing votes: ", error);
            //   })
            if (card.imageURL !== '') {
                let url = firebaseStorage.refFromURL(card.imageURL)
                deleteFBStorageItem(url.fullPath)
                console.log('URL:', url.fullPath)
            }
            else {
                console.log("No perf media to delete")
            }
            if (card.imageURL2 !== '') {
                let url2 = firebaseStorage.refFromURL(card.imageURL2)
                deleteFBStorageItem(url2.fullPath)
                console.log('URL2:', url2.fullPath)
            }
            else {
                console.log("No instruction media to delete")
            }


        })
        .catch(function (error) {
            console.error("Error removing document: ", error);
        });

}


export var deleteFSDocId = (collection, id) => {

    console.log(`Deleting item at ${collection} with id: ${id}`);
    firestoreDB.collection(collection).doc(id).delete().then((res) => {
        console.log("Document successfully deleted! ... res", res);
        // Go on to provide additional db changes if needed
        //   firestoreDB.collection("votes").doc(id).delete().then(() => {
        //     console.log("Votes deleted!");
        //   }).catch(function(error) {
        //     console.error("Error removing votes: ", error);
        //   })

    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

}

export var deleteFBStorageItem = (url) => {

    console.log(`Deleting Storage item at ${url}`)

    var imgRef = firebaseStorageRef.child(url);

    console.log("imgRef:", imgRef)
    imgRef.delete().then(function () {
        // File deleted successfully 
        console.log(`File at ${url} deleted`)
    }).catch(function (error) {
        // error   
        console.log(`Error deleting File at ${url} - ${error}`)

    })

}

export let addCat = (cat1Cat, catName) => {

    console.log(`addCat: Adding category to FS ... ${cat1Cat}/${catName}`)
    // Atomically add a new region to the "regions" array field.
    let ref = firestoreDB.collection("items").doc(cat1Cat);
    ref.update({
        colls: firebase.firestore.FieldValue.arrayUnion(catName)
    })

}

export var addItem = (dbPath, desc, comment, value, aDate, imageFile) => {

    const dateStamp = (aDate !== '') ? new Date(aDate) : new Date()

    let autoID = firestoreDB.collection(dbPath).doc().id;

    let filePath = (imageFile.name !== '') ? `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}` : ''

    firestoreDB.collection(dbPath).doc(autoID)
        // add items to FS
        .set({

            desc: desc,
            comment: comment,
            value: value,
            date: dateStamp,
            imageURL: filePath

        })
        // load the image to FB Storage
        .then((ref) => {

            console.log(`Does this execute first? imageFile:${imageFile}`)
            if (imageFile.name !== '') {
                filePath = `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}`

                let userImagesRef = firebaseStorageRef.child(filePath);
                console.log("reference:", userImagesRef)

                let task = userImagesRef.put(imageFile)
                task.on('state_changed',
                    function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("%:", percentage);
                        console.log("In progress");

                    },
                    function error() {
                        console.log("Error with file upload!");
                        firestoreDB.collection(dbPath).doc(ref.id).update('')
                    },
                    function complete() {
                        console.log("Upload complete");
                    }
                );
            }

            return autoID

        })
    // moved the promise return to the component - Promises only resolve once

}

export var uploadMedia = (dbPath, autoID, media, field) => {

    let filePath = `${dbPath}/${autoID}-${field}.${media.name.split('.').pop()}`
    let userImagesRef = firebaseStorageRef.child(filePath);
    console.log("reference:", userImagesRef)

    let task = userImagesRef.put(media)
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("%:", percentage);
            console.log("In progress");

        },
        function error() {
            console.log("Error with file upload!");
            // firestoreDB.collection(dbPath).doc(ref.id).update('')
        },
        function complete() {
            console.log("Upload complete");
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log("downloadURL:", downloadURL);
                firestoreDB.collection(dbPath).doc(autoID).update({
                    // firestoreDB.collection("cards").doc(user.uid).update({
                    [field]: downloadURL
                })
            })
        }
    );


}

export var addCard = (dbPath, title, comment, rating, media1, media2) => {

    let autoID = firestoreDB.collection(dbPath).doc().id;

    // let filePath = (imageFile.name !== '') ? `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}` : ''

    // console.log("filepath:", filePath)

    return firestoreDB.collection(dbPath).doc(autoID)
        // add items to FS
        .set({

            title: title,
            comment: comment,
            rating: rating,
            imageURL: '',
            imageURL2: ''

        })
        // load the image to FB Storage
        .then((ref) => {

            console.log(`Does this execute first? imageFile:${media1}`)
            if (media1.name !== '') {

                uploadMedia(dbPath, autoID, media1, 'imageURL')

            }
            if (media2.name !== '') {

                uploadMedia(dbPath, autoID, media2, 'imageURL2')

            }

            return autoID

        })

    // moved the promise return to the component - Promises only resolve once

}


export var addCard_good = (dbPath, title, comment, rating, imageFile) => {

    let autoID = firestoreDB.collection(dbPath).doc().id;

    // let filePath = (imageFile.name !== '') ? `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}` : ''

    // console.log("filepath:", filePath)

    return firestoreDB.collection(dbPath).doc(autoID)
        // add items to FS
        .set({

            title: title,
            comment: comment,
            rating: rating,
            imageURL: ''

        })
        // load the image to FB Storage
        .then((ref) => {

            console.log(`Does this execute first? imageFile:${imageFile}`)
            if (imageFile.name !== '') {
                let filePath = `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}`

                let userImagesRef = firebaseStorageRef.child(filePath);
                console.log("reference:", userImagesRef)

                let task = userImagesRef.put(imageFile)
                task.on('state_changed',
                    function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("%:", percentage);
                        console.log("In progress");

                    },
                    function error() {
                        console.log("Error with file upload!");
                        firestoreDB.collection(dbPath).doc(ref.id).update('')
                    },
                    function complete() {
                        console.log("Upload complete", ref);
                        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log("downloadURL:", downloadURL);
                            firestoreDB.collection(dbPath).doc(autoID).update({
                                // firestoreDB.collection("cards").doc(user.uid).update({
                                imageURL: downloadURL
                            })
                        })
                    }
                );
            }

            return autoID

        })

    // moved the promise return to the component - Promises only resolve once

}



export var addCardOLD = (dbPath, title, comment, rating, imageFile) => {

    let autoID = firestoreDB.collection(dbPath).doc().id;

    let filePath = (imageFile.name !== '') ? `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}` : ''
    console.log("filepath:", filePath)

    return firestoreDB.collection(dbPath).doc(autoID)
        // add items to FS
        .set({

            title: title,
            comment: comment,
            rating: rating,
            imageURL: filePath

        })
        // load the image to FB Storage
        .then((ref) => {

            console.log(`Does this execute first? imageFile:${imageFile}`)
            if (imageFile.name !== '') {
                filePath = `${dbPath}/${autoID}.${imageFile.name.split('.').pop()}`

                let userImagesRef = firebaseStorageRef.child(filePath);
                console.log("reference:", userImagesRef)

                let task = userImagesRef.put(imageFile)
                task.on('state_changed',
                    function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("%:", percentage);
                        console.log("In progress");

                    },
                    function error() {
                        console.log("Error with file upload!");
                        firestoreDB.collection(dbPath).doc(ref.id).update('')
                    },
                    function complete() {
                        console.log("Upload complete");
                    }
                );
            }

            return autoID

        })

    // moved the promise return to the component - Promises only resolve once

}



export let getDownloadLink = (filePath) => {

    console.log("getDownloadLink...filepath:", filePath)

    if (filePath !== '') {
        firebaseStorageRef.child(filePath).getDownloadURL()
            .then((url) => {
                console.log("getDownloadLink...url:", url)
                return url

            })
    }

}
