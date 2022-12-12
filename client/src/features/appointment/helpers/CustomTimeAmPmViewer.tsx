import React, { useState } from 'react'
interface IProps {
    time: Date;
}

const CustomTimeAmPmViewer = ({ time }: IProps) => {
    const hour = parseInt(time.toString().slice(0, 2));

    // const timeAMPMString = (time: Date) => {
    //     const hour = parseInt(time.toString().slice(0, 2))
    //     if (hour === 0) {
    //         setTimeString((12) + time.toString().slice(2, -3) + " AM")
    //     } else if (hour >= 12) {
    //         return (hour - 12) + time.toString().slice(2, -3) + " PM"
    //     } else {
    //         return "0" + (hour) + time.toString().slice(2, -3) + " AM"
    //     }
    // }
    return (
        <>
            {hour === 0
                &&
                <span>{(12) + time.toString().slice(2, -3) + " AM"}</span>
            }
            {hour > 0 && hour < 12
                &&
                <span>{hour >= 10 ? (hour) + time.toString().slice(2, -3) + " AM" :
                    "0" + (hour) + time.toString().slice(2, -3) + " AM"}</span>
            }
            {hour === 12
                &&
                <span>{(12) + time.toString().slice(2, -3) + " PM"}</span>
            }
            {hour > 12
                &&
                <span>{hour >= 22 ? (hour - 12) + time.toString().slice(2, -3) + " PM" :
                    "0" + (hour - 12) + time.toString().slice(2, -3) + " PM"
                }</span>
            }


        </>
    )
}

export default CustomTimeAmPmViewer