import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import ApplicationContext from '../../../../ApplicationContext';
import { initializeChart } from '../Helpers/helpers';

const BarChart = ({ type }) => {
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
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['City', '2010 Population', '2000 Population'],
                ['New York City, NY', 8175000, 8008000],
                ['Los Angeles, CA', 3792000, 3694000],
                ['Chicago, IL', 2695000, 2896000],
                ['Houston, TX', 2099000, 1953000],
                ['Philadelphia, PA', 1526000, 1517000],
            ]}
            options={{
                title: 'Population of Largest U.S. Cities',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0,
                },
                vAxis: {
                    title: 'City',
                },
            }}
            rootProps={{ 'data-testid': '1' }}
        />
}

export default BarChart;