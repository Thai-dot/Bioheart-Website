import React, { useState,useRef,useEffect } from "react";
import "./styles.scss";
import svgImg from "../../../../assets/images/svg/index";
import Button from "../../../components/buttonCT/index";
import {Auth} from "@aws-amplify/auth";
import {Amplify} from "@aws-amplify/core";
import awsconfig from '../../../../aws-exports';
import awsmobile from '../../../../aws-mobile';
import { useHistory } from 'react-router-dom';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useSelector,useDispatch  } from 'react-redux';
import {loginRequest,loginSocialRequest} from "../../../../redux/actions/login";
import auth from "../../../../utils/auth"
import { Hub } from "@aws-amplify/core";

//Amplify.configure(awsconfig);
Amplify.configure(awsmobile);

const SignInSec = () => {
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [errorWarning, setErrorWarning] = useState('');
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const history = useHistory();


  //redux things...
  const getMe = useSelector((state) => state)
  const dispatch = useDispatch()
  

  const onChangePass = () => {
    setIsHidePassword(!isHidePassword);
  };

  const onErrorWarning = (message) => {
    setErrorWarning(message);
  };

  const isValidEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = inputRef1.current.value;
    
    const password = inputRef2.current.value;

    //biohearttest0@yopmail.com/00000000
    
    if (!isValidEmail(email) ) {
      onErrorWarning('Email is invalid');
    }
    else if (password.length < 6) {
      onErrorWarning('Password is invalid');
    }
    else {
      onErrorWarning();
    }

    Auth.signIn(email, password)
      .then(() => {
        dispatch(loginRequest());
      })
      .catch((err) => {
        
        console.log(err);
      });


  }

  useEffect(() => {
    if (auth.userId()) {
      if (!auth.isProfileCompleted()) {
        history.push('/setupProfile');
      } else {
        history.push('/overview');
      }
    }
  }, [getMe]);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload: { event } }) => {
      switch (event) {
        case "signIn":
          console.log('signIn');
          break;
        case "signOut":
          console.log('signOut');
          break;
      }
    });


    Auth.currentAuthenticatedUser()
      .then(() => {
        if (!auth.userId()) {
          dispatch(loginRequest());
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return unsubscribe;
  }, []);





const handleLoginFB = async () => {
  try {
    const user = await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook});
   
      //history.push('/overview');
      console.log('user signed in with facebook', user);

    
  } catch (error) {
    //onErrorWarning(error.message);
    console.log('error signing in', error);
  }
}

async function handleLoginGoogle() {
  try {
    const user = await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google });
   
      //history.push('/overview');
      console.log('user signed in with google', user);
    
  } catch (error) {
    console.log(error.message)
  }
}

useEffect(() => {
  const unsubscribe = Hub.listen("auth", async ({ payload: { event } }) => {
    switch (event) {
      case "signIn":
        {
          console.log('signIn');
            dispatch(loginSocialRequest());
                break;

        }
      case "signOut":
        console.log('signOut');
        break;
    }
  });


  
  return unsubscribe;
}, []);


  return (
    <div className="rightFrame">
      <h1>Sign In</h1>
      <p className="greyText mt-3">
        Please fill out all the fields below to sign in to your account.
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="formControl">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control inputBar"
            id="FormControlInput1"
            placeholder="Enter Your Email"
            tabIndex={0}
            ref={inputRef1}
            
          />
        </div>

        <div className="formControl">
          <label htmlFor="FormControlInput2" className="form-label">
            Password
          </label>
          <div className="d-flex justify-content-between align-items-center passBorder">
            <input
              type={isHidePassword ? 'password' : 'text'}
              ref={inputRef2}
              className="form-control  passbar"
              id="FormControlInput2"
              placeholder="Enter Your Password"
            />
            {isHidePassword ? (
              <img src={svgImg.eyeSlash} alt="eye" onClick={onChangePass} className="me-2" />
            ) : (
              <img
                src={svgImg.eye}
                alt="eyeSlash"
                onClick={onChangePass}
                className="me-2"

              />
            )}
          </div>
        </div>
      <p id="forgotPass">Forgot Password?</p>
      <button
        type="submit"
        className="rightFrameButton whiteTextButton"
        //onClick={() => signIn()}  
        onClick={() => dispatch(loginRequest({username: inputRef1.current.value, password: inputRef2.current.value}))}
      >
        Sign In
      </button>
      </form>
      {errorWarning && (
        <p className="errorWarning ms-3 text-warning">{errorWarning}</p>
      )}

      <div className="d-flex divCenter  align-items-center justify-content-center mt-2">
        <div className="stick me-2" />
        <div className="pb-1">Or</div>
        <div className="stick ms-2" />
      </div>

      <Button myButton={{img: svgImg.logoGoogle, name: "logo",style:"greyTextButton rightFrameButton blackBorder",content:"Sign In with Google" }} onClick={() => handleLoginGoogle()} />
      
      <Button myButton={{img: svgImg.facebookLogo, name: "logo",style:"blueTextButton rightFrameButton",content:"Sign In with Facebook" }} onClick={() => handleLoginFB()} />
      <Button myButton={{img: svgImg.appleLogo, name: "logo",style:"rightFrameButton",content:"Sign In with Apple" }} />


      <div className="greyText mt-4">
        By signing in, you agree to our
        <a href="/#" className="mx-1">
          Privacy policy
        </a>
        and
        <a href="/#" className="mx-1">
          Terms of use
        </a>
      </div>
    </div>
  );
};

export default SignInSec;
