import { Button, FormControl, InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import React, { useContext, useState } from 'react';
import ApplicationContext from '../../../ApplicationContext';
import './Filter.css';

const Filter = () => {
    const [filter, setFilter] = useState(0);
    const [ context, setContext ] = useContext(ApplicationContext);

    const handleReload = () => {
        setContext({
            ...context,
            filter
        })
    }

    const { reloading } = context

    return (
        <section className="Filter">
            <FormControl className="filter-select">
                <InputLabel id="filter">Filter</InputLabel>
                <Select
                    labelId="filter"
                    value={filter}
                    label="Filter"
                    onChange={({ target: { value } }) => setFilter(value)}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={0}>All</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" onClick={handleReload}>Reload</Button>

            {Object.values(reloading).every(Boolean) && <CircularProgress />}
        </section>
    )
}

export default Filter;