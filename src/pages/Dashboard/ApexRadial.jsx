import React from "react";
import ReactApexChart from "react-apexcharts";
import "./dashboard.scss";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const ApexRadial = ({ dataColors, series }) => {
  const apexRadialColors = getChartColorsArray(dataColors);

  // const series = [88];
  const options = {
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1500,
        animateGradually: {
          enabled: true,
          delay: 300,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 500,
        },
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "13px",
            color: void 0,
            offsetY: 60,
          },
          value: {
            offsetY: 22,
            fontSize: "16px",
            color: void 0,
            formatter: function (e) {
              return e + "%";
            },
          },
        },
      },
    },
    colors: apexRadialColors,
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [" ماهانه"],
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height="200"
      className="apex-charts"
    />
  );
};

export default ApexRadial;
