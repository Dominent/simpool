import { CircularProgress } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import ApplicationContext from '../../../../ApplicationContext';
import { initializeChart } from '../Helpers/helpers';

const LineChart = ({ type }) => {
  const [context, setContext] = useContext(ApplicationContext);
  const [dataPoints, setDataPoints] = useState([]);

  const { filter, reloading } = context;

  useEffect(() => {
    setContext((state) => ({
      ...state,
      reloading: {
        ...state.reloading,
        [type]: true
      }
    }))

    initializeChart(type, filter)
      .then(data => {
        setDataPoints(data)
        setContext((state) => ({
          ...state,
          reloading: {
            ...state.reloading,
            [type]: false
          }
        }))
      });
  }, [filter])


  return reloading[type] ? <CircularProgress></CircularProgress> :
    <Chart
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={[
        [
          { type: 'number', label: 'x' },
          { type: 'number', label: 'values' },
          { id: 'i0', type: 'number', role: 'interval' },
          { id: 'i1', type: 'number', role: 'interval' },
          { id: 'i2', type: 'number', role: 'interval' },
          { id: 'i2', type: 'number', role: 'interval' },
          { id: 'i2', type: 'number', role: 'interval' },
          { id: 'i2', type: 'number', role: 'interval' },
        ],
        [1, 100, 90, 110, 85, 96, 104, 120],
        [2, 120, 95, 130, 90, 113, 124, 140],
        [3, 130, 105, 140, 100, 117, 133, 139],
        [4, 90, 85, 95, 85, 88, 92, 95],
        [5, 70, 74, 63, 67, 69, 70, 72],
        [6, 30, 39, 22, 21, 28, 34, 40],
        [7, 80, 77, 83, 70, 77, 85, 90],
        [8, 100, 90, 110, 85, 95, 102, 110],
      ]}
      options={{
        intervals: { style: 'sticks' },
        legend: 'none',
      }}
    />

}

export default LineChart;