import axios from "axios";

export async function initializeChart(type, filter) {
    const { data } = await axios.get(`https://test.simpool.io/simpool/data?type=${type}&filter=${filter}`);

    return data;
}