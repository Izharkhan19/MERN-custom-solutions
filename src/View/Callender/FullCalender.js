import moment from "moment";
import { useEffect, useState } from "react";

export default function FullCalender(props) {
  let monthNames = [
    {
      F: "January",
      M: "Jan",
    },
    {
      F: "February",
      M: "Feb",
    },
    {
      F: "March",
      M: "Mar",
    },
    {
      F: "April",
      M: "Apr",
    },
    {
      F: "May",
      M: "May",
    },
    {
      F: "June",
      M: "Jun",
    },
    {
      F: "July",
      M: "Jul",
    },
    {
      F: "August",
      M: "Aug",
    },
    {
      F: "September",
      M: "Sep",
    },
    {
      F: "October",
      M: "Oct",
    },
    {
      F: "November",
      M: "Nov",
    },
    {
      F: "December",
      M: "Dec",
    },
  ];

  const [date, setdate] = useState(new Date());

  const [CalDisplayLalbe, setCalDisplayLalbe] = useState(
    monthNames[date.getMonth()].F + " " + date.getFullYear()
  );

  const [activeSelectedDate, setActiveSelectedDate] = useState(date);

  function handleSelectedDate(selDate) {
    setActiveSelectedDate(selDate);

    if (props.changeCallBack !== undefined && props.changeCallBack !== null) {
      props.changeCallBack(selDate);
    }
  }

  const [WeekDays, setWeekDays] = useState([]);

  function DayWeekView(date) {
    var lastDay = new Date(date);
    let d = new Date(date);
    d.setDate(d.getDate() - 1);
    var firstDay = new Date(d);
    let Dates = MakeFirstAndLastDate("Week", date);
    firstDay = Dates.StartDate;
    lastDay = Dates.EndDate;

    let WeekDays = [];
    for (
      var dt = firstDay;
      dt <= lastDay;
      dt = new Date(dt.setDate(dt.getDate() + 1))
    ) {
      WeekDays.push(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    }
    const WeekDay1 = WeekDays[1];
    setWeekDays(WeekDays);
  }

  function MakeFirstAndLastDate(fnviewType, date) {
    let StartDate = date;
    let EndDate = date;
    let CalenderViewStartDate = date;
    let CalenderViewEndDate = date;

    if (fnviewType === "Day") {
      EndDate = new Date(date);
      let d = new Date(date);
      d.setDate(d.getDate() - 1);
      StartDate = new Date(d);
      CalenderViewStartDate = new Date(date);
      CalenderViewEndDate = new Date(date);
    } else if (fnviewType === "Month" || fnviewType === "List") {
      StartDate = new Date(date.getFullYear(), date.getMonth(), 1);

      EndDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      CalenderViewStartDate = new Date(
        new Date(StartDate).setDate(StartDate.getDate() - StartDate.getDay())
      );
      CalenderViewEndDate = new Date(
        new Date(StartDate).setDate(StartDate.getDate() - StartDate.getDay())
      );
      CalenderViewEndDate = new Date(
        CalenderViewEndDate.setDate(CalenderViewEndDate.getDate() + 41)
      );
    } else if (fnviewType === "Week") {
      let dates = new Date(date);
      var first = dates.getDate() - dates.getDay();
      var last = first + 6;
      StartDate = new Date(dates.setDate(first));
      EndDate = new Date(dates.setDate(last));
      CalenderViewStartDate = StartDate;
      CalenderViewEndDate = EndDate;
    }

    return {
      viewType: fnviewType,
      StartDate: StartDate,
      EndDate: EndDate,
      CalenderViewStartDate: CalenderViewStartDate,
      CalenderViewEndDate: CalenderViewEndDate,
    };
  }

  function fnNextPrev(value) {
    let dates = new Date(date);

    if (value === 1) {
      dates = new Date(date);
      var first = dates.getDate() - dates.getDay();
      var firstDay = new Date(dates.setDate(first));
      firstDay.setDate(dates.getDate() + 7);
      setdate(firstDay);
      dates = new Date(firstDay);
      moment(firstDay).weekday(6).format("yyyy");
      setCalDisplayLalbe(
        monthNames[firstDay.getMonth()].F +
          "  " +
          moment(firstDay).weekday(6).format("yyyy")
      );
      DayWeekView(firstDay);
    } else if (value === -1) {
      dates = new Date(date);
      var first = dates.getDate() - dates.getDay();
      var firstDay = new Date(dates.setDate(first));
      firstDay.setDate(dates.getDate() - 7);
      setdate(firstDay);
      dates = new Date(firstDay);
      setCalDisplayLalbe(
        monthNames[firstDay.getMonth()].F +
          "  " +
          moment(firstDay).weekday(6).format("yyyy")
      );
      DayWeekView(firstDay);
    } else if (value === 0) {
      dates = new Date();
      var first = dates.getDate() - dates.getDay();
      var firstDay = new Date(dates.setDate(first));
      firstDay.setDate(dates.getDate());
      setdate(firstDay);
      dates = new Date(firstDay);

      setCalDisplayLalbe(
        monthNames[firstDay.getMonth()].F +
          "  " +
          moment(firstDay).weekday(6).format("yyyy")
      );
    }
    DayWeekView(firstDay);
  }

  useEffect(() => {
    DayWeekView(new Date());
    if (props.changeCallBack !== undefined && props.changeCallBack !== null) {
      props.changeCallBack(new Date());
    }
  }, []);

  return (
    <>
      <div className="calender_main">
        <div className="calender_buttons">
          <div className="text_start"></div>
          <div className="next_prev_align">
            <button onClick={() => fnNextPrev(-1)} className="prev btn_css">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-left"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>
            </button>
            <h4>{CalDisplayLalbe}</h4>
            <button onClick={() => fnNextPrev(1)} className="next btn_css">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-right"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="calender_body">
          <table
            className={`month-view-calender dayWeek-view-calender show-border-sticky viewtype-${"Week"}`}
          >
            <thead className="dayWeek_view_calender_thead">
              <tr>
                <th width={80} className="week_cell time_width"></th>
                {WeekDays.map((d, index) => (
                  <th className="week_cell" key={index}>
                    {moment(new Date(d)).format("ddd")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="day_week_body">
              <tr>
                <th width={80} className="week_cell time_width"></th>
                {WeekDays.map((d, index) => (
                  <td
                    className={`week_cell ${
                      moment(new Date(activeSelectedDate)).format(
                        "DD MM yyyy"
                      ) === moment(new Date(d)).format("DD MM yyyy") &&
                      "activDate"
                    }`}
                    onClick={() => handleSelectedDate(d)}
                    key={index}
                  >
                    {moment(new Date(d)).format("DD")}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
