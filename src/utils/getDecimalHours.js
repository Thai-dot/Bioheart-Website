

const  getDecimalHours = (stringTime) => {
  const time = stringTime.split(":");
  const hours = parseInt(time[0]);
  const minutes = parseInt(time[1]);

  return hours + minutes / 60;

}

export const getDecimalHoursFromMiliSec = (miliSec) => {
  const date = new Date(miliSec);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds / 3600;
}

export default getDecimalHours;