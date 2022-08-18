import { isError, set } from "lodash";
import React from "react";
import { useState } from "react";
import "./styles.scss";
import moment from "moment";
import InputCT from "../../components/inputCT";

const Exercise = () => {
  const [enableStart, setEnableStart] = useState("");
  const [enableStop, setEnableStop] = useState("");
  const [step, setStep] = useState(0);
  const [disableStart, setDisableStart] = useState("");
  const [disableStop, setDisableStop] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [arrayOfTime, setArrayOfTime] = useState([]);
  const [hoverGroup, setHoverGroup] = useState(null);
  const [clickGroup, setClickGroup] = useState(null);
  const [timeChoose, setTimeChoose] = useState(null);

  const handleValueChange = (e) => {
    if (e.target.name === "enableStartTime") {
      setEnableStart(e.target.value);
    }
    if (e.target.name === "enableOverTime") {
      setEnableStop(e.target.value);
    }

    if (e.target.name === "chooseStep") {
      setStep(parseInt(e.target.value));
    }

    if (e.target.name === "disableStartTime") {
      setDisableStart(e.target.value);
    }

    if (e.target.name === "disableOverTime") {
      setDisableStop(e.target.value);
    }
  };

  // const isHasMinute = (time) => {
  //   if (time.includes(":")) {
  //     return true;
  //   }
  //   return false;
  // };

  const countGroupLength = (array, num) => {
    return array.filter((item) => item.group === num).length;
  };

  const hanleSubmit = (e) => {
    e.preventDefault();

    const arrayOfTimeValue = [];
    let startEnableHours = 0;
    let stopEnableHours = 0;
    let startDisableHours = 0;
    let stopDisableHours = 0;

    startEnableHours = Number(enableStart);

    stopEnableHours = Number(enableStop);

    startDisableHours = Number(disableStart);
    stopDisableHours = Number(disableStop);

    if (
      !Number.isInteger(startEnableHours) ||
      !Number.isInteger(stopEnableHours) ||
      !Number.isInteger(startDisableHours) ||
      !Number.isInteger(stopDisableHours)
    ) {
      setIsError(true);
      alert("Emty or Wrong input data type");
      return;
    }
    if (
      startEnableHours < 0 ||
      stopEnableHours < 0 ||
      startDisableHours < 0 ||
      stopDisableHours < 0 ||
      startEnableHours > 24 ||
      stopEnableHours > 24 ||
      startDisableHours > 24 ||
      stopDisableHours > 24
    ) {
      setIsError(true);
      alert("Time must be >= 0 or <= 24");
      return;
    }

    if (
      startEnableHours > stopEnableHours ||
      startDisableHours > stopDisableHours ||
      startDisableHours < startEnableHours ||
      stopDisableHours > stopEnableHours
    ) {
      setIsError(true);
      alert("Disable time inclues in enable time");
      return;
    }

    let i = 0;

    //active time
    while (startEnableHours <= stopEnableHours) {
      arrayOfTimeValue.push({
        time: startEnableHours,
        index: i,
        enable: true,
      });

      startEnableHours = startEnableHours + 0.5;
      i = i + 1;
    }

    //inactive time, merge 2 array
    for (let index = 0; index < arrayOfTimeValue.length; index++) {
      if (startDisableHours == arrayOfTimeValue[index].time) {
        arrayOfTimeValue[index].enable = false;
        startDisableHours = startDisableHours + 0.5;
      }

      if (startDisableHours >= stopDisableHours) {
        break;
      }
    }

    //make a group with step

    let groupIndex = 0;

    for (let index = 0; index < arrayOfTimeValue.length; index++) {
      if (index % step == 0 && index != 0) {
        groupIndex = groupIndex + 1;
      }
      arrayOfTimeValue[index].group = groupIndex;
    }

    //disable all if group has at least enable false item or group length < step
    for (let index = 0; index < arrayOfTimeValue.length; index++) {
      if (arrayOfTimeValue[index].enable === false) {
        let currentGroup = arrayOfTimeValue[index].group;
        for (let j = 0; j < arrayOfTimeValue.length; j++) {
          if (arrayOfTimeValue[j].group === currentGroup) {
            arrayOfTimeValue[j].enable = false;
          }
        }
      }
      if (
        countGroupLength(arrayOfTimeValue, arrayOfTimeValue[index].group) < step
      ) {
        let currentGroup = arrayOfTimeValue[index].group;
        for (let j = 0; j < arrayOfTimeValue.length; j++) {
          if (arrayOfTimeValue[j].group === currentGroup) {
            arrayOfTimeValue[j].enable = false;
          }
        }
      }
    }
    setIsShow(true);
    setIsError(false);
    setArrayOfTime(arrayOfTimeValue);
  };

  const onHoverBlock = (groupNum) => {
    setHoverGroup(groupNum);
  };

  const onClickBlock = (groupNum) => {
    //setHoverGroup(null);

    setClickGroup(groupNum);
    const chooseArray = arrayOfTime.filter((item) => item.group === groupNum);

    const startTime = chooseArray[0].time;
    const endTime = chooseArray[chooseArray.length - 1].time;

    setTimeChoose({ startTime: startTime, endTime: endTime });
  };

  const onHoverOut = () => {
    setHoverGroup(null);
  };

  return (
    <div className="mainClass position-relative">
      <div className="position-fixed smallDiv dropdown">
        <div>
          Start Choose:{" "}
          {timeChoose
            ? moment()
                .startOf("day")
                .add(parseFloat(timeChoose.startTime), "hours")
                .format("HH:mm")
            : ""}
        </div>
        <div>
          Over Choose:{" "}
          {timeChoose
            ? moment()
                .startOf("day")
                .add(parseFloat(timeChoose.endTime), "hours")
                .format("HH:mm")
            : ""}
        </div>
      </div>
      <h1 className="text-center title"> Booking slot</h1>

      <form
        action=""
        className="d-flex justify-content-center align-items-center"
        onSubmit={(e) => hanleSubmit(e)}
      >
        <InputCT
          label="Start"
          id="enableStartTime"
          type="text"
          placeholder="Enter the time"
          name="enableStartTime"
          onChange={(e) => handleValueChange(e)}
        />
        <InputCT
          label="Over"
          id="enableOverTime"
          type="text"
          placeholder="Enter the time"
          name="enableOverTime"
          onChange={(e) => handleValueChange(e)}
        />
        <InputCT
          label="Duration"
          id="chooseStep"
          type="text"
          placeholder="Enter steps number"
          name="chooseStep"
          onChange={(e) => handleValueChange(e)}
        />
        <InputCT
          label="Start Disable"
          id="disableStartTime"
          type="text"
          placeholder="Enter the time"
          name="disableStartTime"
          onChange={(e) => handleValueChange(e)}
        />
        <InputCT
          label="Over Disable"
          id="disableOverTime"
          type="text"
          placeholder="Enter the time"
          name="disableOverTime"
          onChange={(e) => handleValueChange(e)}
        />

        <button type="submit" className="mt-3">
          Show
        </button>
      </form>

      <div className="container d-flex flex-column justify-content-center align-items-center  ">
        <div className="overflowDiv">
          {isShow && !isError ? (
            arrayOfTime.map((item, index) => {
              return (
                <div
                  key={index}
                  groupname={item.group}
                  className={
                    item.enable && item.group === clickGroup
                      ? "  timeActiveBlock timeActiveBlockHover timeClickBlock"
                      : item.group === hoverGroup && item.enable
                      ? "  timeActiveBlock timeActiveBlockHover"
                      : item.enable
                      ? "timeActiveBlock"
                      : "timeInactiveBlock "
                  }
                  onMouseOver={() => onHoverBlock(item.group)}
                  onMouseOut={!clickGroup ? () => onHoverOut() : () => {}}
                  onClick={
                    item.enable ? () => onClickBlock(item.group) : () => {}
                  }
                >
                  <div>
                    {" "}
                    {moment()
                      .startOf("day")
                      .add(parseFloat(item.time), "hours")
                      .format("HH:mm")}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-danger text-center ">
              Invalid input or nothing to show{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercise;
