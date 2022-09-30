import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'


const colors = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
];

const UserStats = () => {

    const [userData, setUserData] = useState({
        labels: ["Plan 1", "Plan 2", "Plan 2"],
        datasets: [{
            label: "Ganancias",
            data: [10, 20, 30],
            backgroundColor: colors.map(c => c)
        }]
    })

    return (
        <>
            <Box
                w="300px"
                h="auto"
            >
                <Doughnut data={userData} />
            </Box>
        </>
    )
}

export default UserStats






// //-----------Config--------------
    // const config = {
    //     type: 'doughnut',
    //     data: data,
    //     options: {
    //         responsive: true,
    //         plugins: {
    //             legend: {
    //                 position: 'top',
    //             },
    //             title: {
    //                 display: true,
    //                 text: 'Chart.js Doughnut Chart'
    //             }
    //         }
    //     },
    // };
    // //-----------------------------

    // //-----------SetUp--------------
    // const DATA_COUNT = 5;
    // const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    // const data = {
    //     labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    //     datasets: [
    //         {
    //             label: 'Dataset 1',
    //             data: Utils.numbers(NUMBER_CFG),
    //             backgroundColor: Object.values(Utils.CHART_COLORS),
    //         }
    //     ]
    // };
    // //-----------------------------

    // //-----------Action--------------
