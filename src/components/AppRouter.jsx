import React, { useEffect, useReducer } from 'react'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import firebase, { firestoreDB } from '../utils/firebase.js'
import { checkAuth } from '../utils/auth.js'

import { AuthContext } from '../context/AuthContext.js'
import { UserContext } from '../context/UserContext.js'

import authReducer from '../reducers/authReducer.js'
import userReducer from '../reducers/userReducer.js'

import CardsPage from './CardsPage.jsx'
import UserForm from './UserForm.jsx'
import About from './About.jsx'
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import NavMenu from './NavMenu.jsx'

const AppRouter = () => {

    const [userAuth, authDispatch] = useReducer(authReducer, null)
    const [user, userDispatch] = useReducer(userReducer, {})

    useEffect(() => { // Firebase User Watch

        console.log("AppRouter useEffect 1 - should run once [] - executes Firebase .auth().onAuthStateChanged ... ")

        firebase.auth().onAuthStateChanged((fbUser) => {
            
            if (fbUser) {

                console.log("Firebase User Found...", fbUser)
                console.log('Name:', fbUser.displayName + ', Userid:', fbUser.uid + ', Verified:', fbUser.verified)
                authDispatch({ type: 'LOGIN', uid: fbUser.uid })

            }
        })
        

    }, [])

    useEffect(() => {
        console.log(`AppRouter useEffect 2 ... monitor /user info - should run once and on - userAuth: ${userAuth}`)
        
        if (checkAuth(userAuth)) {
            console.log("userAuth:", userAuth.uid)
            // var userRef = firebaseRef.child(`users/${userAuth.uid}/info`)
            // console.log("userRef:", userRef)
            // Load user info from Firebase
            // userRef.on('value', (snap) => {
            //     console.log("SNAP:", snap.val())
            //     userDispatch({ type: 'SET_USER', user: snap.val() })

            // })

            // Load user info from Firestore
            const unsubscribeFSUsers = firestoreDB.collection('users').doc(userAuth.uid)
                .onSnapshot((doc) => {
                    console.log("Firestore /user data: ", doc.data())
                    userDispatch({ type: 'SET_USER', user: doc.data() })
                })
            return () => {
                // Clean up the listener subscription
                console.log("Clean up the /users listener subscription...")
                unsubscribeFSUsers();
            }
        }

    }, [userAuth])


    useEffect(() => {
        console.log(`AppRouter useEffect 3 ... monitor /admin state - should run once and on - userAuth: ${userAuth}`)
        
        if (checkAuth(userAuth)) {
            console.log("userAuth:", userAuth.uid)

            // Load user info from Firestore
            const unsubscribeFSAdmins = firestoreDB.collection('admins').doc(userAuth.uid)
                .onSnapshot((doc) => {

                    const adminFlag = doc.data() ? doc.data().admin : false 
                    console.log("Firestore /user - admin data: ", adminFlag)
                    userDispatch({ type: 'SET_USER_ADMIN', admin: adminFlag })

                })
            return () => {

                // Clean up the listener subscription
                console.log("Clean up the /admins listener subscription...")
                unsubscribeFSAdmins()

            }
        }

    }, [userAuth])


    const protect = (aComponent) => {

        console.log("Protect...", userAuth)
        if (userAuth) {

            console.log("User found - Returning Protected component...")
            return aComponent

        }
        else {

            console.log("You need to be logged in for that route ...")
            return LoginForm

        }
    }


    const onLogout = () => {

        console.log("onLogout ...")
        firebase.auth().signOut().then(() => {
            authDispatch({ type: 'LOGOUT' })

        }).then(console.log("Logged out of Firebase..."))
            .catch(function (error) {
                console.log("Logout of Firebase Error has occurred:", error)
            })

    }

    return (
        <Router>
            <div>

                <AuthContext.Provider value={{ userAuth, authDispatch }} >
                    <UserContext.Provider value={{ user }} >

                        {userAuth && <NavMenu onLogout={onLogout} />}

                        <Route path='/login' exact render={() => (
                            userAuth ?
                                <Redirect to="/" /> :
                                <Redirect to="/login" />
                        )} />

                        <Route path='/register' exact render={() => (
                            userAuth ?
                                <Redirect to="/" /> :
                                <Redirect to="/register" />
                        )} />

                        <Route path='/' exact component={protect(UserForm)} />
                        <Route path='/cards' exact component={protect(CardsPage)} />
                        <Route path='/about' component={About} />
                        <Route path='/login' component={LoginForm} />
                        <Route path='/register' component={RegisterForm} />

                    </UserContext.Provider>
                </AuthContext.Provider>
            </div>
        </Router>
    )
}


export { AppRouter as default }
