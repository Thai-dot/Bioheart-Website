import { atom, selector, selectorFamily } from "recoil";
import moment from "moment";
import { getCustomHeartRates } from "../../../utils/getDataForChart";
import getDecimalHours,{ getDecimalHoursFromMiliSec } from "../../../utils/getDecimalHours";

const defaultDateType = "Hour";
const defaultTime = {
  from: 0,
  end: 0,
};

const defaultChartHourConfig = {
  chart: {
    type: "scatter",
    zoomType: "xy",
  },
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    title: {
      enabled: false,
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true,
    labels: {
      formatter: function () {
        return moment()
          .startOf("day")
          .add(parseFloat(this.value), "hours")
          .format("h:mm A");
      },
    },
  },
  yAxis: {
    title: {
      enabled: false,
    },
    type: "linear",

    tickInterval: 40,
  },
  chart: {
    type: "scatter",
    height: 220,
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    crosshairs: {
      color: "#696A6B",
      dashStyle: "solid",
    },
    shared: true,
  },

  plotOptions: {
    scatter: {
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: "rgb(100,100,100)",
          },
        },
      },
      states: {
        hover: {
          marker: {
            enabled: false,
          },
        },
      },
    },
  },
  series: [
    {
      color: "#EF2641",
      data: [],
    },
  ],
  accessibility: {
    enabled: false,
  },
};

const defaultChartDateConfig = {
  title: {
    text: "",
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

const dateTypeState = atom({
  key: "DateTypeState",
  default: defaultDateType,
  dangerouslyAllowMutability: true,
});



const timeState = atom({
  key: "TimeState",
  default: defaultTime,
});

const chartHourConfigState = atom({
  key: "ChartHourConfigState",
  default: defaultChartHourConfig,
});

const chartDateConfigState  = atom({
  key: "ChartDateConfigState",
  default: defaultChartDateConfig,
});

export const getSetDateType = selector(
  {
    key: "getSetDateType",
    get: ({ get }) => get(dateTypeState),
    set: ({ set }, dateType) => {
      //console.log("set date type", dateType);
      return set(dateTypeState, dateType)
    },
    
  }
)

export const getChartConfig = selector({
  key: "getChartHourConfig",
  get: async ({ get, set }) => {
    const dateType = get(dateTypeState);
    //console.log("dateType", dateType);
    const time = get(timeState);
    const { from, end } = time;


    const result = await getCustomHeartRates(from, end, dateType);
    console.log(result);
    const { avgs, maxs, mins } = result;
    //console.log(avgs);
    

      const chartHourConfig = get(chartHourConfigState);
      const mainData = avgs.map(({ value: y, time: x }) => ({
      x: getDecimalHoursFromMiliSec(x),
      y,
    }));

    return {
      ...chartHourConfig,
      series: [
        {
          ...chartHourConfig.series[0],
          data: mainData,
        },
      ],
    };
  }


});

export const getChartConfig2 = selector({
  key: "getChartConfig2",
  get: async ({ get, set }) => {
    const dateType = get(dateTypeState);
    console.log("dateType", dateType);
    const time = get(timeState);
    const { from, end } = time;


    const result = await getCustomHeartRates(from, end, "Day");
    console.log(result);
    const { avgs, maxs, mins } = result;
    //console.log(avgs);
    let chartDateConfig = get(chartDateConfigState);
    const mainData = avgs.map(({ value: y, time: x }) => ({
      x:getDecimalHoursFromMiliSec(x) ,
      y,
    }));

    const lastItem = mainData.pop();

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

    //console.log(newMaxs);
    let areaRanges = [];
      for(let i = 0; i < newMaxs.length; i++){
        newMaxs[i].push(newMins[i][1])
      }
     areaRanges = newMaxs
    //console.log(areaRanges);

    return {...chartDateConfig, series: [
      {
        ...chartDateConfig.series[0],
        data:mainData,
      },
      {
        ...chartDateConfig.series[1],
        data:lastItem,
      },
      {
        ...chartDateConfig.series[2],
        data: areaRanges,

      },
    ],};
  }
});
