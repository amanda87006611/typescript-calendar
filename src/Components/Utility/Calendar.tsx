import { useEffect, useState, useRef } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from "date-fns";
import styles from "./style/Calendar.module.scss";
import moment from "moment";

// import dayjs from "dayjs";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface Props {
  events: Event[];
  categories: Categories[];
}

interface Event {
  date: Date;
  events: {
    start_time: Date;
    end_time: Date;
    title: any;
    category: string;
  }[];
}

interface Categories {
  title: any;
  color: string;
}

const Calendar: React.FC<Props> = ({
  events,
  categories,
  // components,
  // onClick,
  // slotProps, // btn of 新增事件
  // activeSlotProps, // active狀態的新增事件
  // disabledSlotProps, //超出每日事件上限值 disabled狀態的新增事件
  // limit, //自定義事件的上限值
  // eventProps,
  // active,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());
  const [calendarWidth, setCalendarWidth] = useState(0);
  const wrapperRef = useRef(null);

  let resizeWidth = () => {
    let width: any = document.getElementById("calendar-head")?.clientWidth;
    setCalendarWidth(width);
  };

  useEffect(() => {
    resizeWidth();
    window.addEventListener("resize", resizeWidth);
    return () => window.removeEventListener("resize", resizeWidth);
  }, []);

  // useEffect(() => {
  //   if (active) {
  //     // setActiveDate(new Date(active?.startTime));
  //     setActiveDate(
  //       new Date(dayjs(active.start_at).format("YYYY/MM/DD").toString())
  //     );
  //   }
  // }, [active]);

  const getHeader = () => {
    return (
      <div className={styles.header} id='calendar-head'>
        <div
          onClick={() => {
            setActiveDate(subMonths(activeDate, 1));
            //   onClick("");
          }}
          className={styles.navigation}>
          <GoArrowLeft className={styles.navIcon} />
          {moment(activeDate).subtract(1, "M").format("YYYY")} 年
          {moment(activeDate).subtract(1, "M").format("MM")} 月
        </div>

        <div
          className={styles.todayButton}
          onClick={() => {
            setSelectedDate(new Date());
            setActiveDate(new Date());
          }}>
          {moment(activeDate).format("YYYY")} 年
          {moment(activeDate).format("MM")} 月
        </div>

        <div
          onClick={() => {
            setActiveDate(addMonths(activeDate, 1));
            // onClick("");
          }}
          className={styles.navigation}>
          {moment(activeDate).add(1, "M").format("YYYY")} 年{" "}
          {moment(activeDate).add(1, "M").format("MM")} 月
          <GoArrowRight className={styles.navIcon} />
        </div>
      </div>
    );
  };

  const getWeekDaysNames = () => {
    const weekStartDate = startOfWeek(activeDate);
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(
        <div key={day} className={`${styles.weekWrapper}`}>
          <div className={`${styles.day} ${styles.weekNames}`}>
            {format(addDays(weekStartDate, day), "E")}
          </div>
        </div>
      );
    }
    return <div className={styles.weekContainer}>{weekDays}</div>;
  };

  const generateDatesForCurrentWeek = (
    date: string,
    selectedDate: any,
    activeDate: any
  ) => {
    let currentDate: any = date;
    const week = [];
    for (let day = 0; day < 7; day++) {
      const cloneDate: any = currentDate;
      week.push(
        <div
          key={day}
          className={styles.dayContainer}
          ref={wrapperRef}
          onClick={() => {
            setSelectedDate(cloneDate);
          }}>
          <div
            className={`${styles.day} ${
              isSameMonth(currentDate, activeDate) ? "" : styles.inactiveDay
            } ${isSameDay(currentDate, selectedDate) ? styles.selectedDay : ""}
          ${isSameDay(currentDate, new Date()) ? styles.today : ""}`}>
            {format(currentDate, "d")}
          </div>
          {events?.map(
            (data) =>
              moment(new Date(data.date)).format("YYYY-MM-DD") ===
                moment(cloneDate).format("YYYY-MM-DD") &&
              data.events?.map(
                (item, idx) =>
                  item.title && (
                    <div
                      style={{ maxWidth: `${calendarWidth / 7 - 10}px` }}
                      key={`calendar${idx}`}
                      // onClick={() => onClick({ ...item, date: data.date })}
                      className={styles.events}>
                      <div
                        style={{
                          background: categories?.find(
                            (category) => category.title === item.category
                          )?.color,
                        }}
                        className={styles.spot}></div>
                      <span>
                        {item.start_time.getHours() >= 12 ? "下午 " : "上午"}
                        {item.start_time.getHours()}:
                        {item.start_time.getMinutes() === 0
                          ? "00"
                          : item.start_time.getMinutes()}
                        {"  "}
                        {item.title}
                      </span>
                    </div>
                  )
              )
          )}
        </div>
      );
      currentDate = addDays(currentDate, 1);
    }
    return week;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate: any = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
      );
      currentDate = addDays(currentDate, 7);
    }

    return <div className={styles.weekContainer}>{allWeeks}</div>;
  };

  return (
    <section id='section-outer'>
      {getHeader()}
      {getWeekDaysNames()}
      {getDates()}
    </section>
  );
};

export default Calendar;
