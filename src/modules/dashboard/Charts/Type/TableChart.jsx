import { CircularProgress } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import ApplicationContext from '../../../../ApplicationContext';
import { initializeChart } from '../Helpers/helpers';

export const TableChart = ({ type }) => {
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
            chartType="Table"
            loader={<div>Loading Chart</div>}
            data={[
                [
                    { type: 'string', label: 'Name' },
                    { type: 'number', label: 'Salary' },
                    { type: 'boolean', label: 'Full Time Employee' },
                ],
                ['Mike', { v: 10000, f: '$10,000' }, true],
                ['Jim', { v: 8000, f: '$8,000' }, false],
                ['Alice', { v: 12500, f: '$12,500' }, true],
                ['Bob', { v: 7000, f: '$7,000' }, true],
            ]}
            options={{
                showRowNumber: true,
            }}
            rootProps={{ 'data-testid': '1' }}
        />
}