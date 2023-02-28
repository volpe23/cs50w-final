import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DateSelector({ onDateSelect }) {
    const [startDate, setStartDate] = useState(new Date())

    useEffect(() => {
        console.log(startDate);
        onDateSelect(startDate);
    }, [startDate])

    return (
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    )
}