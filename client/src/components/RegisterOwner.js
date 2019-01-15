import React, { Component } from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
// this import style is required for proper codesplitting of firebase
import 'firebase/auth'

import { registerOwner } from '../actions' // for calling once all data is in
import { connect } from 'react-redux'
import Form from './Form/index'
import BreadCrumb from './BreadCrumb'
import SelectList from './common/SelectList'
import system from '../design/theme'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'cadence-20246.firebaseapp.com',
  databaseURL: 'https://cadence-20246.firebaseio.com',
  projectId: 'cadence-20246',
  storageBucket: 'cadence-20246.appspot.com',
  messagingSenderId: '143190395098'
}

// in case firebase was already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
}

class RegisterOwner extends Component {
  state = {
    oauthSuccess: false,
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    orgName: '',
    orgDescription: ''
  }
  // check that user is not already logged in?
  // render form with info
  // stage 1
  // create account with oauth ...
  // stage 2
  // direct to page where user fills in the rest of the info

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      //checks to see if user has registered yet
      if (firebase.auth().currentUser) {
        const { email, displayName } = firebase.auth().currentUser
        // In case user enters more than two names
        const firstName = displayName.split(' ')[0]
        const lastName = displayName.split(' ').slice(1)

        this.setState({ email, firstName, lastName, oauthSuccess: true })
      }
    })
  }
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('clicked')
  }

  render() {
    const {
      oauthSuccess,
      email,
      phone,
      firstName,
      lastName,
      orgName,
      orgDescription
    } = this.state
    const { handleChange, handleSubmit } = this

    console.log(this.state)

    if (!oauthSuccess) {
      return (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )
    } else {
      return (
        <Container>
          <BreadCrumb />
          <div className="wrapper">
            <h1 className="headerText" data-testid="register-form">
              Complete Registration
            </h1>
            <form type="submit" onClick={handleSubmit}>
              <Form.Group
                property="firstName"
                type="text"
                value={firstName}
                handleChange={handleChange}
                placeholder="First Name..."
                ariaLabel="first-name"
              >
                <Form.Label>First Name</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="lastName"
                type="text"
                value={lastName}
                handleChange={handleChange}
                ariaLabel="last-name"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="email"
                type="text"
                value={email}
                handleChange={handleChange}
                ariaLabel="email"
              >
                <Form.Label>Email</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="phone"
                type="number"
                value={phone}
                handleChange={handleChange}
                ariaLabel="phone"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="orgName"
                type="text"
                value={orgName}
                handleChange={handleChange}
                ariaLabel="org-name"
              >
                <Form.Label>Organizatoin Name</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <Form.Group
                property="orgDescription"
                type="text"
                value={orgDescription}
                handleChange={handleChange}
                ariaLabel="org-description"
              >
                <Form.Label>Organization Description</Form.Label>
                <Form.TextInput />
              </Form.Group>

              <button className="register">Register Organization</button>
            </form>
          </div>
        </Container>
      )
    }
  }
}

// probably don't need this either
const mapStateToProps = state => {
  return {}
}

const Container = styled('div')`
  width: 100%;
  min-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .wrapper {
    margin: 30px auto 0 auto;
    width: 100%;
    max-width: 900px;
    min-width: 500px;
    padding: ${system.spacing.container};
    .headerText {
      font-size: ${system.fontSizing.l};
      margin-bottom: 30px;
    }
    form {
      width: 100%;
      .form-group {
        .form-label {
          text-transform: uppercase;
          font-weight: bold;
          font-size: ${system.fontSizing.s};
        }
      }
      .drop-down {
        display: flex;
        flex-direction: column;
        height: 200px;
        label {
          text-transform: uppercase;
          font-weight: bold;
          font-size: ${system.fontSizing.s};
          margin: 20px 0 20px 0;
        }
        select {
          font-size: ${system.fontSizing.m};
          border: ${system.borders.transparent};
          border-radius: ${system.borders.radius};
          outline: none;
          cursor: pointer;
        }
      }
      .register {
        justify-content: flex-end;
        padding: ${system.spacing.standardPadding};
        background-color: ${system.color.primary};
        color: ${system.color.neutral};
        box-shadow: ${system.shadows.button};
        border-radius: ${system.borders.radius};
        border: ${system.borders.transparent};
        font-size: ${system.fontSizing.m};
        letter-spacing: 1px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          box-shadow: ${system.shadows.buttonHoverLight};
          background-color: ${system.color.hoverPrimary};
        }
      }
    }
  }
`

// do we need redux??
export default connect(
  mapStateToProps,
  { registerOwner }
)(RegisterOwner)
