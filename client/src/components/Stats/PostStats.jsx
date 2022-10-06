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


const PostStats = () => {

    const posts = useSelector((state) => state.posts);

    let premiumPost = posts?.filter((p) => p?.premium === true)
    let standardPost = posts?.filter((p) => p?.premium === false)

    

    const [userData, setUserData] = useState({
        labels: [`Standard`, `Premium`],
        datasets: [{
            label: "Posts",
            data: [standardPost?.length, premiumPost?.length],
            backgroundColor: getDataColors(),
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

export default PostStats 
