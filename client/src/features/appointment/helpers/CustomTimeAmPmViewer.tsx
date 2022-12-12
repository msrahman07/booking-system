import dayjs from 'dayjs';
interface IProps {
    time: Date;
}

const CustomTimeAmPmViewer = ({ time }: IProps) => {
    const hour = parseInt(time.toString().slice(0, 2));

    return (
        <>
            <span>

                {dayjs(new Date(new Date().toDateString() + " " + (time.toString()))).format('hh:mm A')}
            </span>
        </>
    )
}

export default CustomTimeAmPmViewer