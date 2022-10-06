import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from 'react-redux';

const getDataColors = opacity =>{
    const colors = [
         '#CDEBA4',
         '#E5BF7C',
         '#8CA174'
    ];
    return colors.map(color => opacity ? `${color + opacity}` : color)
}


const UserStats = () => {

    const posts = useSelector((state) => state.posts);

    let premiumPost = posts?.filter((p) => p?.premium === true)
    let standardPost = posts?.filter((p) => p?.premium === false)

    

    const [userData, setUserData] = useState({
        labels: [ `Paying`, `Never pay`, "Pay 1 post"],
        datasets: [{
            label: "Posts",
            data: [60, 10,42 ],
            backgroundColor: getDataColors(20),
            borderColor: getDataColors()
        }]
    })

    const options = {
        plugins: {
            legend: { position: "left" }
        }
    }

    return (
        <>

            <Doughnut
                data={userData}
                options={options}
                canvas={"200px"} />

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
