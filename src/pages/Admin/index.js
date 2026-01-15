import { useState, useEffect } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import axios from 'axios';
import { useThemeStore } from "../../utils/store";
import CanvasJSReact from '../../assets/js/canvasjs.react';
import './index.scss';
// require('dotenv').config();

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Admin = () => {
  const [theme,] = useThemeStore();
  const [accessChartOptions, setAccessChartOptions] = useState({});
  const [purchasedChartOptions, setPurchasedChartOptions] = useState({});
  const [reveuneChartOptions, setReveuneChartOptions] = useState({});
  const [timePeriod, setTimePeriod] = useState(1);

  const getExactNumber = (part) => {
    if (part[0] == "0") {
      return parseInt(part[1]);
    } else {
      return parseInt(part);
    }
  }

  const getOptions = (title, dataPoints) => {
    return {
      theme: theme == 'dark-theme' ? "dark1" : 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: title
      },
      axisY: {
        title: title,
        includeZero: false,
      },
      data: [
        {
          type: "scatter",
          markerSize: 20,
          xValueFormatString: timePeriod == 1 ? "YYYY-MM-DD" : timePeriod == 0 ? "YYYY-MM-DD HH o'clock" : "YYYY-MM",
          yValueFormatString: "#,##0.##",
          dataPoints: [
            ...dataPoints
          ]
        }
      ]
    };
  }

  const getDataPoints = (historyData) => {
    return historyData.map(item => {
      if (timePeriod == 1) {
        // day

        return {
          x: new Date(item._id),
          y: item.amountPerDate
        };
      } else if (timePeriod == 0) {
        // hour

        const parts = item._id.split(".");
        const year = parseInt(parts[0]);
        const month = getExactNumber(parts[1]) - 1;
        const date = getExactNumber(parts[2]);
        const hour = getExactNumber(parts[3]);
        console.log("date: ", new Date(year, month, date, hour))

        return {
          x: new Date(year, month, date, hour),
          y: item.amountPerDate
        }
      } else if (timePeriod == 2) {
        // month

        const parts = item._id.split(".");
        const year = parseInt(parts[0]);
        const month = getExactNumber(parts[1]) - 1;
        console.log("date: ", new Date(year, month))

        return {
          x: new Date(year, month),
          y: item.amountPerDate
        }
      }
    })
  }

  useEffect(() => {
    (async () => {
      console.log("timePeriod: ", timePeriod);
      const accessCountData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/accesses/get-counts/${timePeriod}`);
      let dataPoints = getDataPoints(accessCountData.data);
      const accessChartOptions = getOptions("Number of Access", dataPoints);
      setAccessChartOptions(accessChartOptions);

      const purchaseCountData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/buys/get-sold-counts/${timePeriod}`);
      dataPoints = getDataPoints(purchaseCountData.data);
      const purchasedChartOptions = getOptions("Number of Domains Purchased", dataPoints);
      setPurchasedChartOptions(purchasedChartOptions);

      const revenueData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/buys/get-revenue/${timePeriod}`);
      dataPoints = getDataPoints(revenueData.data)
      const reveuneChartOptions = getOptions("Revenue", dataPoints);
      setReveuneChartOptions(reveuneChartOptions);
    })();
  }, [theme, timePeriod]);


  return (
    <Box
      mt={'120px'}
      px={'50px'}
      style={{
        backgroundColor: theme == 'dark-theme' ? '#2A2A2A' : 'white',
      }}
    >
      <div className="statistics-header"
      >
        <Typography
          color={theme == 'dark-theme' ? 'white' : 'black'}
          fontSize={{ md: "2.999vw", xs: "2.5707vw" }}
        >
          Domain Buy Statistics
        </Typography>

        <Box
          className="period-wrapper"
        >
          <Typography
            color={theme == 'dark-theme' ? 'white' : 'black'}
            fontSize={{ md: "1.499vw", xs: "1.0707vw" }}
            border={theme == 'dark-theme' ? '1px solid white' : '1px solid black'}
            px={'20px'}
            py={'5px'}
            borderRadius={'15px'}
            onClick={() => setTimePeriod(2)}
          >
            Month
          </Typography>

          <Typography
            color={theme == 'dark-theme' ? 'white' : 'black'}
            fontSize={{ md: "1.499vw", xs: "1.0707vw" }}
            border={theme == 'dark-theme' ? '1px solid white' : '1px solid black'}
            px={'20px'}
            py={'5px'}
            borderRadius={'15px'}
            onClick={() => setTimePeriod(1)}
          >
            Day
          </Typography>

          <Typography
            color={theme == 'dark-theme' ? 'white' : 'black'}
            fontSize={{ md: "1.499vw", xs: "1.0707vw" }}
            border={theme == 'dark-theme' ? '1px solid white' : '1px solid black'}
            px={'20px'}
            py={'5px'}
            borderRadius={'15px'}
            onClick={() => setTimePeriod(0)}
          >
            Hour
          </Typography>
        </Box>

      </div>

      <Box
        className="access-count-chart"
        mb={'100px'}
      >
        <CanvasJSChart options={accessChartOptions}
        />
      </Box>

      <Box
        className="purchased-count-chart"
        mb={'100px'}
      >
        <CanvasJSChart options={purchasedChartOptions}
        />
      </Box>

      <Box
        className="revenue-chart"
        mb={'100px'}
      >
        <CanvasJSChart options={reveuneChartOptions}
        />
      </Box>
    </Box >
  );
}

export default Admin;
