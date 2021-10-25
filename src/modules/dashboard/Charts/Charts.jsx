import React, { useEffect, useState } from 'react';
import './Charts.css';
import BarChart from './Type/BarChart';
import LineChart from './Type/LineChart';
import PieChart from './Type/PieChart';
import { TableChart } from './Type/TableChart';

import axios from 'axios';

const Charts = () => {
    const [layout, setLayout] = useState([]);

    useEffect(() => {
        async function initialize() {
            const { data } = await axios.get('https://test.simpool.io/simpool/layout');

            setLayout(data);
        }

        initialize()
    }, [])

    //TODO(PPavlov): Create a generic chart component to reduce code duplication
    const chartFactory = (type) => {
        switch (type) {
            case 'pie':
                return <PieChart type={type}></PieChart>
            case 'bar':
                return <BarChart type={type}></BarChart>
            case 'table':
                return <TableChart type={type}></TableChart>
            case 'line':
                return <LineChart type={type}></LineChart>
            default:
                throw new Error('Not Implemented Chart Type')
        }
    }

    return (
        <section className="Charts">
            <ul>
                {layout && layout.map(type => <li key={type}>
                    {chartFactory(type)}
                </li>)}
            </ul>
        </section>
    )
}

export default Charts;