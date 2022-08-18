import React from "react";
import svgImg from "../../../../assets/images/svg/index";
import Button from "../../../components/buttonCT/index";
import "./styles.scss";


class RightFrame extends React.Component {
  constructor(){
    super();
    this.state = {
      isHidePassword: true,
      errorWarning: ""
    };
    this.inputRef1 = React.createRef();
    this.inputRef2 = React.createRef();
    this.onChangePass = this.onChangePass.bind(this);
    this.onErrorWarning = this.onErrorWarning.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   isValidEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  onChangePass(){
    this.setState({
      isHidePassword: !this.state.isHidePassword
    });
  }

  onErrorWarning(message){
    this.setState({
      errorWarning: message
    });
  }

  handleSubmit(e){
    e.preventDefault();
    
    const email = this.inputRef1.current.value;
    console.log(email);
    const password = this.inputRef2.current.value;
    console.log(password);
    if (!this.isValidEmail(email) ) {
      this.onErrorWarning('Email is not valid');
    }
    else if (password.length < 6) {
      this.onErrorWarning('Password is not valid');
    }
    else {
      this.onErrorWarning();
    }
  }

  render() {
    return (
      <div className="rightFrame">
      <h1>Sign In</h1>
      <p className="greyText mt-3">
        Please fill out all the fields below to sign in to your account.
      </p>
      <form onSubmit={(e)=>{this.handleSubmit(e)}}>
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
            ref={this.inputRef1}
          />
        </div>

        <div className="formControl">
          <label htmlFor="FormControlInput2" className="form-label">
            Password
          </label>
          <div className="d-flex justify-content-between align-items-center passBorder">
            <input
              type={this.state.isHidePassword ? 'password' : 'text'}
              className="form-control  passbar"
              id="FormControlInput2"
              placeholder="Enter Your Password"
              ref={this.inputRef2}
            />
            {this.state.isHidePassword ? (
              <img src={svgImg.eyeSlash} alt="eye" onClick={this.onChangePass} className="me-2" />
            ) : (
              <img
                src={svgImg.eye}
                alt="eyeSlash"
                onClick={this.onChangePass}
                className="me-2"
                
              />
            )}
          </div>
        </div>
      <p id="forgotPass">Forgot Password?</p>
      <button
        type="submit"
        className="rightFrameButton whiteTextButton"
        onClick={this.errorWarning}
      >
        Sign In
      </button>
      </form>
      {this.state.errorWarning && (
        <p className="errorWarning ms-3 text-warning">{this.state.errorWarning}</p>
      )}

      <div className="d-flex divCenter  align-items-center justify-content-center mt-2">
        <div className="stick me-2" />
        <div className="pb-1">Or</div>
        <div className="stick ms-2" />
      </div>

      <Button myButton={{img: svgImg.logoGoogle, name: "logo",style:"greyTextButton rightFrameButton blackBorder",content:"Sign In with Google" }} />
      <Button myButton={{img: svgImg.facebookLogo, name: "logo",style:"blueTextButton rightFrameButton",content:"Sign In with Facebook" }} />
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
  }
}

export default RightFrame;