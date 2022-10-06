import { useState } from 'react';
import { Doughnut } from "react-chartjs-2"
import { useSelector } from 'react-redux';

const getDataColors = opacity => {
    const colors = [
        '#CDEBA4',
        '#E5BF7C',
        '#8CA174'
    ];
    return colors.map(color => opacity ? `${color + opacity}` : color)
}

const UserStats = () => {

    const users = useSelector((state) => state.users)

    let nonPaying = []
    let payingOne = []
    let payingPlusTwo = []

    users?.map((u) => {

        let premiumPosts = u?.posts?.filter((p) => p?.premium === true)

        if (premiumPosts?.length === 0) {
            nonPaying?.push(u)
        }
         else if (premiumPosts?.length === 1) {
            payingOne?.push(u)
        }

    })

    const [userData, setUserData] = useState({
        labels: [ "Paying", `Not paying`],
        datasets: [{
            label: "Posts",
            data: [payingOne?.length, nonPaying?.length],
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