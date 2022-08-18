import React, { useEffect } from "react";
import InputCT from "../../components/inputCT";
import ButtonCT from "../../components/buttonCT";
import "./styles.scss";
import useMergeState from "../../../utils/hooks/useMergeState";
import moment from "moment";
import handleUpdateProfile from "../../../services/apollo/functions/handleUpdateProfile";
import fetchMe from "../../../services/apollo/functions/fetchMe";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { mergeWith } from "lodash";
import { useSelector,useDispatch } from "react-redux";
import {updateProfileRequest} from "../../../redux/actions/login";

const AddProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch()

  const [state, setState] = useMergeState({
    userFirstName: "",
    userLastName: "",
    birthday: "",
    address: "",
    weight: 0,
    height: 0,
    gender: "Male",
    errorWarning: "",
    isProfileCompleted: true,
    isUpdateSuccess: false
  });

  const onChangeValue = (e) => {
    e.preventDefault();

    if (e.target.name === "userFirstName") {
      setState({
        userFirstName: e.target.value,
      });
    }
    if (e.target.name === "userLastName") {
      setState({
        userLastName: e.target.value,
      });
    }
    if (e.target.name === "Birthday") {
      setState({
        birthday: e.target.value,
      });
    }
    if (e.target.name === "Address") {
      setState({
        address: e.target.value,
      });
    }
    if (e.target.name === "Weight") {
      setState({
        weight: Number(e.target.value),
      });
    }
    if (e.target.name === "Height") {
      setState({
        height: Number(e.target.value),
      });
    }
    if (e.target.name === "Gender") {
      setState({
        gender: e.target.value,
      });
    }
  };

  const onHandleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log;

      if (state.userFirstName === "") {
        setState({
          errorWarning: "Invalid first name",
        });
        return;
      }
      if (state.userLastName === "") {
        setState({
          errorWarning: "Invalid last name",
        });
        return;
      }
      if (state.birthday === null||
        state.birthday === "" ||
        moment().diff(state.birthday, "years") <= 2
      ) {
        console.log(state.birthday)
        setState({
          errorWarning: "Invalid birthday",
        });
        return;
      }
      if (state.address === "") {
        setState({
          errorWarning: "Invalid address",
        });
        return;
      }
      if (state.weight <= 10 || Number.isInteger(state.weight) === false) {
        setState({
          errorWarning: "Invalid weight",
        });
        return;
      }
      if (state.height <= 30 || Number.isInteger(state.height) === false) {
        setState({
          errorWarning: "Invalid height",
        });
        return;
      }

      setState({
        errorWarning: "",
      });
      console.log(state);
      
      const user = await handleUpdateProfile({
        firstName: state.userFirstName,
        lastName: state.userLastName,
        birthday: moment(state.birthday).format("yyyy-MM-DD"),
        dateOfBirth: moment(state.birthday).format("yyyy-MM-DD"),
        contact: { address: state.address },
        address: { address: state.address },
        gender: state.gender,
        weight: parseFloat( state.weight),
        height: parseFloat( state.height),
      });
      if (user) {
        //history.push("/overview");
        setState({
          isUpdateSuccess:true
        })
      }

      dispatch(updateProfileRequest({
        firstName: state.userFirstName,
        lastName: state.userLastName,
        gender: state.gender,
        height: parseFloat( state.height),
        weight: parseFloat( state.weight),
        dateOfBirth: moment(state.birthday).format("yyyy-MM-DD"),
        address: { address: state.address }
      }))
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    const me = await fetchMe();
    console.log(me);
    if (me) {
      setState({
    userFirstName: me.firstName,
    userLastName: me.lastName,
    birthday: moment(me.dateOfBirth).format("yyyy-MM-DD"),
    address: me.address.address,
    weight: me.weight,
    height: me.height,
    gender: me.gender,
    isProfileCompleted: true,
      });
    }
  }, [state.isUpdateSuccess]);

  const stateStore = useSelector((state) => state)
  console.log(stateStore)

  return (
    <div className="container">
      <h1 className="text-center mt-3">
        {" "}
        {state.isProfileCompleted ? "Update your profile" : " Add your profile"}
      </h1>

      <form onSubmit={(e) => onHandleSubmit(e)} className="px-5 pt-5 formUpdateProfile" >
        {
          state.isProfileCompleted && (<div className="d-flex justify-content-end">
          <Link to="/overview">
            <button className="returnButton text-success fw-bold">Return</button>
          </Link></div>)
        }
        

        
        <InputCT
          label="First Name"
          id="userFirstName"
          type="text"
          placeholder="Enter your first name"
          name="userFirstName"
          value={state.userFirstName}
          onChange={(e) => onChangeValue(e)}
        />
        <InputCT
          label="Last Name"
          id="userLastName"
          type="text"
          placeholder="Enter your last time"
          name="userLastName"
          value={state.userLastName}
          onChange={(e) => onChangeValue(e)}
        />

        <InputCT
          label="Birthday"
          id="Birthday"
          type="date"
          placeholder="Enter your birthday"
          name="Birthday"
          value={state.birthday?moment(state.birthday).format("yyyy-MM-DD"):""}
          
          onChange={(e) => onChangeValue(e)}
        />

        <InputCT
          label="Address"
          id="Address"
          type="test"
          placeholder="Enter your address"
          name="Address"
          value={state.address}
          onChange={(e) => onChangeValue(e)}
        />
        <div className="d-flex justify-content-between align-items-censter">
          <InputCT
            label="Weight"
            id="Weight"
            type="text"
            placeholder="Enter your weight"
            name="Weight"
            value={state.weight}
            onChange={(e) => onChangeValue(e)}
          />
          <InputCT
            label="Height"
            id="Height"
            type="text"
            placeholder="Enter your height"
            name="Height"
            value={state.height}
            onChange={(e) => onChangeValue(e)}
          />
          <div className="d-flex flex-column">
            <label htmlFor="gender" className="fw-bold">
              {" "}
              Gender
            </label>
            <select
              onChange={(e) => onChangeValue(e)}
              name="gender"
              className="selectGender"
              id="gender"

            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        {state.errorWarning && (
          <div className="ms-2 text-danger"> {state.errorWarning}</div>
        )}
        {
          state.isUpdateSuccess && (
            <div className="ms-2 text-success"> Update success</div>
          )
        }
        <div className="w-100 d-flex justify-content-center ">
          <button type="submit" className="px-4 mt-4 addProfileButton fw-bold">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProfile;
