export const MAP_DATA_SOURCE: Object = {
  chart: {
    caption: "Air Quality in districts of Pekin",
    subcaption: " 2013-2017",
    numbersuffix: "",
    includevalueinlabels: "1",
    labelsepchar: ": ",
    entityFillHoverColor: "#FFF9C4",
    theme: "fusion",
    },
    colorrange: {
      minvalue: "1",
      code: "#FFE0B2",
      gradient: "1",
      color: [{
        "minvalue": "0.5",
        "maxvalue": "1.0",
        "color": "#FFD74D"
    }, {
        "minvalue": "1.0",
        "maxvalue": "2.0",
        "color": "#FFD74D"
    }, {
        "minvalue": "2.0",
        "maxvalue": "3.0",
        "color": "#E65100"
    }]
    },
    data: [
      {
        id: "11", //CHANGPING
        value: "1"
      },
      {
        id: "1", //Dongcheng
        value: "1"
      },
      {
        id: "2", //Xicheng
        value: "1"
      },
      {
        id: "6", //	Shijingshan
        value: "1"
      }
    ]
};
