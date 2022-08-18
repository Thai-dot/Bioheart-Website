import { atom, selector, selectorFamily } from 'recoil';
import moment from "moment";
import {getHeartRates} from "../../../utils/getDataForChart";
import fetchHeartRateAverage from "../../../services/apollo/functions/fetchHeartRateAverage";
import fetchNearestTimeHasActivity from "../../../services/apollo/functions/fetchNearestTimeHasActivity";
import {getDecimalHoursFromMiliSec} from "../../../utils/getDecimalHours";

const defaultHeartRateIndex = {
  hrv: 0,
  resting: 0,
}

const defaultDataConfig1  = {
  title: {
    text: "Heart Rate Chart",
    align: "left",
  },

  series: [
    {
      
      data:[],
      color: "#EF2641",
      marker: {
        enabled: false,
      },
      lineWidth: 0.5,
      // zones: [
      //   {
      //     value: 14,
      //     color: "#EF2641",
      //   },
      //   {
      //     dashStyle: "dash",
      //   },
      // ],
      //show marker in last point
    },
    {
      data:[],
      color: "#EF2641",
      marker:{
        fillColor: '#FFFFFF',
        lineWidth: 1,
        lineColor: null, // inherit from series,
        symbol: "circle",
      }
    },
    {
      type: "arearange",
      data: [],
      color: "#EF2641",
      fillOpacity: 0.3,
      zIndex: 0,
      marker: {
        enabled: false,
      },
      lineWidth: 0,
      linkedTo: ":previous",
    },
  ],

  chart: {
    width: 860,
    height: 160,
  },
  
  legend: {
    enabled: false,
  },
  xAxis: {
    type: "linear",
    min: 0,
    max: 24,
    tickInterval: 4,
    //format 12 hour
    labels: {
      formatter: function () {
        return moment()
          .startOf("day")
          .add(parseFloat(this.value), "hours")
          .format("h A");
      },
    },
  },
  yAxis:{
    type: "linear",

    tickInterval: 40,

    title: {
      text: "",
    },
    
  },
  plotOptions:{
    line: {
      dashStyle: "solid",
    }
  },
  accessibility: {
    enabled: false
  },
}

const defaultDataConfig2 = {
  title: {
    text: "Activity chart",
    align: "left",
  },
  subtitle: {
    text: "Today",
    align: "right",
  },
  series: [
    {
      data: [
        // [20, 20],
        // [19.6, 45],
      ],
    },
  ],
  chart: {
    type: "column",
    width: 860,
    height: 190,
  },

  legend: {
    enabled: false,
  },
  xAxis: {
    type: "linear",
    min: 0,
    max: 24,
    tickInterval: 4,
    //format 12 hour
    labels: {
      formatter: function () {
        return moment()
          .startOf("day")
          .add(parseFloat(this.value), "hours")
          .format("h A");
      },
    },
  },
  yAxis: {
    min: 0,
    max: 60,
    tickInterval: 20,
    title: {
      text: "",
    },

    gridLineDashStyle: "longdash",
  },
  plotOptions: {
    column: {
      stacking: "normal",
    },
    series: {
      pointWidth: 20,
      pointPadding: 0,
      //groupPadding: 0
    },
  },
  accessibility: {
    enabled: false
  },
}

const defaultHeartRatesAverage = {
  activity: -1,  
  ceiledActiveMinutes:[],
  sumOfDuration: 0,

}

const heartRateIndexState = atom({
  key: 'heartRateIndexState',
  default: defaultHeartRateIndex,
});

const heartRatesAverageState = atom({
  key: 'heartRatesAverage',
  default: defaultHeartRatesAverage,
});

const dataConfig1State = atom({
  key: 'dataConfig1',
  default: defaultDataConfig1,
});

const dataConfig2State = atom({
  key: 'dataConfig2',
  default: defaultDataConfig2,
});

export const getHeartRateIndex = selector({
  key: 'getHeartRateIndex',
  get:  async({get}) => {
    const heartRateIndex = get(heartRateIndexState);
    const data = await getHeartRates();
    const endTime = data[4];
    const fromTime = data[3];
    const getIndex = await fetchHeartRateAverage(fromTime,endTime,420);
   
    const {heartRateAverage} = getIndex;

    const {hrv, resting} = heartRateAverage;

    return {
      hrv,
      resting,
    };
  }
})

export const getHeartRatesAverage = selector({
  key: 'getHeartRatesAverage',
  get: async ({get}) => {
    const nearest = await fetchNearestTimeHasActivity(420);


    //get the end of that day
    
    const endOfTheDay  = moment(nearest.time).utc().endOf("day").toDate().valueOf();
    
    console.log(moment(nearest.time).format("YYYY-MM-DD HH:mm:ss"), endOfTheDay)
   const data = await fetchHeartRateAverage(nearest.time,endOfTheDay,420);
   //format nearest time to YYYY-MM-DD HH:mm:ss
   const {heartRateAverage} = data;
   const {activity, ceiledActiveMinutes} = heartRateAverage;
   const sumOfDuration = ceiledActiveMinutes.reduce((a, b) => a + b.duration, 0);
   console.log(sumOfDuration)

    const heartRatesAverage = get(heartRatesAverageState);
    console.log(data);
    return {
      ...heartRatesAverage,
      sumOfDuration,
      activity,
      ceiledActiveMinutes,
    }
  }

})

export const getDataConfig1 = selector(
  {
    key: 'updateDataConfig1',
    get: async ({ get }) => {
      const dataConfig1 = get(dataConfig1State);
      const data = await getHeartRates();
      const lastItem = data[0].pop()
      let areaRanges = [];
      for(let i = 0; i < data[1].length; i++){
        data[1][i].push(data[2][i][1])
      }
     areaRanges = data[1]

     console.log(data[0])
      return {...dataConfig1, series: [
        {
          ...dataConfig1.series[0],
          data:data[0],
        },
        {
          ...dataConfig1.series[1],
          data:[lastItem],
        },
        {
          ...dataConfig1.series[2],
          data: areaRanges,

        },
      ],};
    }
  }

)

export const getDataConfig2 = selectorFamily(
  {
  key: 'updateDataConfig2',
  get: dataForChart => async ({ get }) => {
    const dataConfig2 = get(dataConfig2State);

    const formatDataForChart = dataForChart.map(({
      duration: y,
      time: x
    }) => ({
      x:getDecimalHoursFromMiliSec(x),
      y
    }));
  


    return {...dataConfig2, series: [
      {
        ...dataConfig2.series[0],
        data:formatDataForChart,
      },
    ],};
  }

  }
)
