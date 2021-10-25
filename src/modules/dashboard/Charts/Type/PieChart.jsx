import { CircularProgress } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import ApplicationContext from '../../../../ApplicationContext';
import { initializeChart } from '../Helpers/helpers';

const PieChart = ({ type }) => {
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
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7],
            ]}
            options={{
                title: 'My Daily Activities',
            }}
            rootProps={{ 'data-testid': '1' }}
        />
}

export default PieChart;