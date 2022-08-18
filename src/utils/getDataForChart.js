import fetchHeartRates from "../services/apollo/functions/fetchHeartRates";
import getDecimalHours from "./getDecimalHours";
import moment from "moment";

export const getHeartRates = async () => {
  const result = await fetchHeartRates({
    fromTime: 0,
    endTime: 0,
    activityType: "All",
    type: "Day",
    utcOffset: 420,
  });

  const {avgs, maxs, mins,fromTime,endTime} = result;
 
  const newAvgs = avgs.map((avg) => {
    return [
      getDecimalHours(moment(avg.time).format("HH:mm")),
      avg.value,
    ];
  })

  
   const newMaxs = maxs.map((max) => {
    return [
      getDecimalHours(moment(max.time).format("HH:mm")),
      max.value,
    ];
  }
  )

  const newMins = mins.map((min) => {
    return [
       getDecimalHours(moment(min.time).format("HH:mm")),
       min.value,
    ];
  }
  )
  return [newAvgs, newMaxs, newMins,fromTime,endTime];
     
};

export const getCustomHeartRates = async (fromTime,endTime,type) => {
  const result = await fetchHeartRates({
    fromTime,
    endTime,
    activityType: "All",
    type,
    utcOffset: 420,
  });

  return result;

}