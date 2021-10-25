import React from 'react';
import Charts from './Charts/Charts';
import Filter from './Filter/Filter';

const Dashboard = () => {
    // Use context provider 
    return (
        <>
           <Filter></Filter>
           <Charts></Charts>
        </>
    )
}

export default Dashboard;