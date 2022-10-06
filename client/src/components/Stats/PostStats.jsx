import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from 'react-redux';

const getDataColors = opacity =>{
    const colors = [
         '#CDEBA4',
         '#E5BF7C',
         '#8CA174',
         "#ffc8dd"
    ];
    return colors.map(color => opacity ? `${color + opacity}` : color)
}


const PostStats = () => {

    const posts = useSelector((state) => state.posts);

    let premiumPost = posts?.filter((p) => p?.premium === true)
    let premiumPostsText = premiumPost?.filter((p) => p?.pics?.length === 0)
    let premiumPostsImg = premiumPost?.filter((p) => p?.pics?.length > 0)

    let standardPost = posts?.filter((p) => p?.premium === false)
    let standardPostText = standardPost?.filter((p) => p?.pics?.length === 0)
    let standardPostImg = standardPost?.filter((p) => p?.pics?.length > 0)

    

    const [userData, setUserData] = useState({
        labels: [ `Premium Text`, `Premium Img`, `Standard Text`,`Standard Img` ],
        datasets: [{
            label: "Posts",
            data: [premiumPostsText?.length, premiumPostsImg?.length, standardPostText?.length,standardPostImg?.length],
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
