import { useState, useEffect } from "react";

const useNextWeekDates = () => {
  const [nextWeekDates, setNextWeekDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const dates = [];

    for (let i = 1; i <= 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      dates.push({
        day: nextDay.getDate(),
        month: nextDay.toLocaleString("default", { month: "long" }),
      });
    }

    setNextWeekDates(dates);
  }, []);

  return nextWeekDates;
};

export default useNextWeekDates;
