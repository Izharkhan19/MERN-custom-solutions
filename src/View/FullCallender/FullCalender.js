import moment from "moment";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "./mycalender.css";

export default function FullCalender(props) {
  const [EventListModalShow, setEventListModalShow] = useState(false);

  const [modalShowActivity, setModalShowActivity] = useState(false);
  const [EventListDate, setEventListDate] = useState([]);
  const [EditActivityId, setEditActivityId] = useState(
    "00000000-0000-0000-0000-000000000000"
  );

  const SameDay = new Date();

  let dayNames = [
    {
      F: "Sunday",
      M: "Sun",
      S: "Su",
    },
    {
      F: "Monday",
      M: "Mon",
      S: "MO",
    },
    {
      F: "Tuesday",
      M: "Tue",
      S: "Tu",
    },
    {
      F: "Wednesday",
      M: "Wed",
      S: "We",
    },
    {
      F: "Thursday",
      M: "Thu",
      S: "Th",
    },
    {
      F: "Friday",
      M: "Fri",
      S: "Fr",
    },
    {
      F: "Saturday",
      M: "Sat",
      S: "Sa",
    },
  ];

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
  const [time, settime] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ]);
  const [viewtype, setviewtype] = useState("Month");
  const data = [];
  const [CalDisplayLalbe, setCalDisplayLalbe] = useState(
    monthNames[date.getMonth()].F + "-" + date.getFullYear()
  );

  function fnEventListModal(item) {
    setEventListDate(item);
    setEventListModalShow(true);
  }

  function fnGenerateCal(date, viewtype, data) {
    if (viewtype === "Day") {
      return DayWeekView(date, data);
    } else if (viewtype === "Month") {
      return MonthView(date, data);
    } else if (viewtype === "Week") {
      return DayWeekView(date, data);
    } else if (viewtype === "List") {
      return ListView(date, data);
    }
  }

  function DayWeekView(date, data) {
    var lastDay = new Date(date);
    let d = new Date(date);
    d.setDate(d.getDate() - 1);
    var firstDay = new Date(d);
    if (viewtype === "Week") {
      let Dates = MakeFirstAndLastDate("Week", date);
      firstDay = Dates.StartDate;
      lastDay = Dates.EndDate;
    }
    let WeekDays = [];
    for (
      var dt = firstDay;
      dt <= lastDay;
      dt = new Date(dt.setDate(dt.getDate() + 1))
    ) {
      WeekDays.push(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    }
    const WeekDay1 = WeekDays[1];
    return (
      <>
        {viewtype === "Day" && (
          <table
            className={`month-view-calender dayWeek-view-calender show-border-sticky viewtype-${viewtype}`}
          >
            <thead className="dayWeek_view_calender_thead">
              <tr>
                <th width={80} className="week_cell time_width"></th>
                <th className="week_cell">
                  {moment(new Date(WeekDay1)).format("ddd MM/DD")}
                </th>
              </tr>
            </thead>
            <tbody className="day_week_body">
              {time.map((t_item, t_index) => (
                <tr key={t_index}>
                  <td
                    className={`day_cell ${
                      moment(t_item, ["HH"]).format("hh a") ===
                      moment(SameDay, ["HH"]).format("hh a")
                        ? "active"
                        : ""
                    }`}
                  >
                    {/* {moment(t_item, ["HH"]).format("hh a")} */}
                    {moment(t_item, ["HH"]).format("hhA")}
                  </td>
                  <td
                    sd={new Date(new Date(WeekDay1).setHours(t_item))}
                    ed={new Date(new Date(WeekDay1).setHours(t_item + 1))}
                    className={`day_cell ${
                      moment(WeekDay1).format("MM-DD-yyyy") ===
                      moment(SameDay).format("MM-DD-yyyy")
                        ? "dayno today"
                        : "dayno"
                    }`}
                  >
                    <div className="event-cell">
                      {fnBindAllEvents(
                        data.filter(
                          (e) =>
                            new Date(e.start) <=
                              new Date(new Date(WeekDay1).setHours(t_item)) &&
                            new Date(e.end) >
                              new Date(new Date(WeekDay1).setHours(t_item))
                          // new Date(e.date) >= new Date(new Date(WeekDay1).setHours(t_item)) &&
                          // new Date(e.date) < new Date(new Date(WeekDay1).setHours(t_item + 1))
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {viewtype === "Week" && (
          <table
            className={`month-view-calender dayWeek-view-calender show-border-sticky viewtype-${viewtype}`}
          >
            <thead className="dayWeek_view_calender_thead">
              <tr>
                <th width={80} className="week_cell time_width"></th>
                {WeekDays.map((d, index) => (
                  <th className="week_cell">
                    {moment(new Date(d)).format("ddd MM/DD")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="day_week_body">
              {time.map((t_item, t_index) => (
                <tr key={t_index}>
                  <td
                    className={`day_cell ${
                      moment(t_item, ["HH"]).format("hh a") ===
                      moment(SameDay, ["HH"]).format("hh a")
                        ? "active"
                        : ""
                    }`}
                  >
                    {moment(t_item, ["HH"]).format("hhA")}
                  </td>
                  {WeekDays.map((d_item, index) => (
                    <td
                      sd={new Date(new Date(d_item).setHours(t_item))}
                      ed={new Date(new Date(d_item).setHours(t_item + 1))}
                      className={`day_cell ${
                        moment(d_item).format("MM-DD-yyyy") ===
                        moment(SameDay).format("MM-DD-yyyy")
                          ? "dayno today"
                          : "dayno"
                      }`}
                    >
                      <div className="event-cell">
                        {fnBindAllEvents(
                          data.filter(
                            (e) =>
                              new Date(e.start) <=
                                new Date(new Date(d_item).setHours(t_item)) &&
                              new Date(e.end) >
                                new Date(new Date(d_item).setHours(t_item))
                            // new Date(e.start) >= new Date(new Date(d_item).setHours(t_item)) &&
                            // new Date(e.end) <= new Date(new Date(d_item).setHours(t_item))
                            // new Date(e.date) >= new Date(new Date(d_item).setHours(t_item)) &&
                            // new Date(e.date) < new Date(new Date(d_item).setHours(t_item + 1))
                          )
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
  function fnBindAllEvents(data) {
    return (
      <>
        {data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(
            (ed, edindex) =>
              edindex < 2 && (
                <>
                  {TooltipState.action && TooltipState.id === ed.id ? (
                    <div className="tooltip-calendar" key={edindex}>
                      <div className="inner-tooltip-calendar">
                        <div className="tooltip-calendar-data">
                          <p>{ed.title}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <p
                    onMouseEnter={() => {
                      setTooltipState({
                        action: true,
                        id: ed.id,
                      });
                    }}
                    onMouseLeave={() =>
                      setTooltipState({
                        action: false,
                        id: ed.id,
                      })
                    }
                    onClick={(e) => {
                      setEditActivityId(ed.id);
                      setModalShowActivity(true);
                    }}
                    data-event-date={ed.date}
                    className="event_details"
                  >
                    {/* {formatAMPM(new Date(ed.date))} */}
                    {ed.title}
                  </p>
                </>
              )
          )}
        {data.length > 2 && (
          <p
            className="more_btn event_details"
            onClick={() => fnEventListModal(data)}
          >
            {data.length - 2}+ more
          </p>
        )}
      </>
    );
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
      // callback;
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

  const [TooltipState, setTooltipState] = useState({
    action: false,
    id: "",
  });

  function MonthView(date, data) {
    let Dates = MakeFirstAndLastDate("Month", date);
    var firstDay = Dates.StartDate;
    var lastDay = Dates.EndDate;
    var CalStart = Dates.CalenderViewStartDate;
    var CalEnd = Dates.CalenderViewEndDate;

    let DateRowArray = [];
    for (let r = 0; r < 6; r++) {
      let DateColArray = [];
      for (let c = 0; c < 7; c++) {
        DateColArray.push(new Date(CalStart));
        CalStart = new Date(CalStart.setDate(CalStart.getDate() + 1));
      }
      DateRowArray.push(DateColArray);
    }

    function fnBindAllEvents(data) {
      return (
        <>
          {data
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(
              (ed, edindex) =>
                edindex < 3 && (
                  <>
                    {TooltipState.action && TooltipState.id === ed.id ? (
                      <div className="tooltip-calendar" key={edindex}>
                        <div className="inner-tooltip-calendar">
                          <div className="tooltip-calendar-data">
                            <p>{ed.title}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <p
                      onMouseEnter={() => {
                        setTooltipState({
                          action: true,
                          id: ed.id,
                        });
                      }}
                      onMouseLeave={() =>
                        setTooltipState({
                          action: false,
                          id: ed.id,
                        })
                      }
                      className="event_details Red"
                      onClick={(e) => {
                        setEditActivityId(ed.id);
                        setModalShowActivity(true);
                      }}
                    >
                      {/* {formatAMPM(new Date(ed.date))} */}
                      {moment(ed.date).format("LT").replace(" ", "")}
                      &nbsp;{ed.title}
                    </p>
                  </>
                )
            )}
          {data.length > 3 && (
            <p
              className="more_btn event_details"
              onClick={() => fnEventListModal(data)}
            >
              {data.length - 3}+ more
            </p>
          )}
        </>
      );
    }

    return (
      <>
        <table className="month-view-calender">
          <thead>
            <tr>
              <th className="table_cell">{dayNames[0].M}</th>
              <th className="table_cell">{dayNames[1].M}</th>
              <th className="table_cell">{dayNames[2].M}</th>
              <th className="table_cell">{dayNames[3].M}</th>
              <th className="table_cell">{dayNames[4].M}</th>
              <th className="table_cell">{dayNames[5].M}</th>
              <th className="table_cell">{dayNames[6].M}</th>
            </tr>
          </thead>
          <tbody>
            {DateRowArray.map((r_item, row) => (
              <tr key={row}>
                {r_item.map((c_item, col) => (
                  <td
                    sd={c_item}
                    ed={
                      new Date(new Date(c_item).setDate(c_item.getDate() + 1))
                    }
                    className={
                      `${
                        c_item >= firstDay && c_item <= lastDay
                          ? ""
                          : "disable table_body_cell"
                      }` ||
                      `table_body_cell ${
                        moment(c_item).format("MM-DD-yyyy") ===
                        moment(SameDay).format("MM-DD-yyyy")
                          ? "dayno today"
                          : "dayno"
                      }`
                    }
                    key={col}
                  >
                    <div className="main-cell">
                      <div className="date-cell">{c_item.getDate()}</div>
                      <div className="event-cell">
                        {fnBindAllEvents(
                          data.filter(
                            (e) =>
                              new Date(e.date) >= c_item &&
                              new Date(e.date) <
                                new Date(
                                  new Date(c_item).setDate(c_item.getDate() + 1)
                                )
                          )
                        )}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  function fnNextPrev(value) {
    let dates = new Date(date);
    if (viewtype === "Month" || viewtype === "List") {
      if (value === 1) {
        dates = new Date(date);
        dates.setMonth(dates.getMonth() + 1);
        setdate(dates);
        setCalDisplayLalbe(
          monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
        );
      } else if (value === -1) {
        dates = new Date(date);
        dates.setMonth(dates.getMonth() - 1);
        setdate(dates);
        setCalDisplayLalbe(
          monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
        );
      } else if (value === 0) {
        dates = new Date();
        dates.setMonth(dates.getMonth());
        setdate(dates);
        setCalDisplayLalbe(
          monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
        );
      }
    } else if (viewtype === "Week") {
      if (value === 1) {
        dates = new Date(date);
        var first = dates.getDate() - dates.getDay();
        var firstDay = new Date(dates.setDate(first));
        firstDay.setDate(dates.getDate() + 7);
        setdate(firstDay);
        dates = new Date(firstDay);
        moment(firstDay).weekday(6).format("MMMM DD, yyyy");
        setCalDisplayLalbe(
          monthNames[firstDay.getMonth()].F +
            " " +
            firstDay.getDate() +
            " - " +
            moment(firstDay).weekday(6).format("MMMM DD, yyyy")
        );
      } else if (value === -1) {
        dates = new Date(date);
        var first = dates.getDate() - dates.getDay();
        var firstDay = new Date(dates.setDate(first));
        firstDay.setDate(dates.getDate() - 7);
        setdate(firstDay);
        dates = new Date(firstDay);
        setCalDisplayLalbe(
          monthNames[firstDay.getMonth()].F +
            " " +
            firstDay.getDate() +
            " - " +
            moment(firstDay).weekday(6).format("MMMM DD, yyyy")
        );
      } else if (value === 0) {
        dates = new Date();
        var first = dates.getDate() - dates.getDay();
        var firstDay = new Date(dates.setDate(first));
        firstDay.setDate(dates.getDate());
        setdate(firstDay);
        dates = new Date(firstDay);

        setCalDisplayLalbe(
          monthNames[firstDay.getMonth()].F +
            " " +
            firstDay.getDate() +
            " - " +
            moment(firstDay).weekday(6).format("MMMM DD, yyyy")
        );
      }
    } else if (viewtype === "Day") {
      if (value === 1) {
        dates = new Date(date);
        dates.setDate(dates.getDate() + 1);
        setdate(dates);
        setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
      } else if (value === -1) {
        dates = new Date(date);
        dates.setDate(dates.getDate() - 1);
        setdate(dates);
        setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
      } else if (value === 0) {
        dates = new Date();
        dates.setDate(dates.getDate());
        setdate(dates);
        setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
      }
    }

    if (props.changeCallBack !== undefined && props.changeCallBack !== null) {
      props.changeCallBack(MakeFirstAndLastDate(viewtype, dates));
    }
  }

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function fnViewChange(value) {
    let dates = new Date(date);
    if (value === "Week") {
      dates = new Date(date);
      var first = dates.getDate() - dates.getDay();
      var firstDay = new Date(dates.setDate(first));
      firstDay.setDate(dates.getDate());
      setdate(firstDay);
      dates = new Date(firstDay);
      setCalDisplayLalbe(
        monthNames[firstDay.getMonth()].F +
          " " +
          firstDay.getDate() +
          " - " +
          moment(firstDay).weekday(6).format("MMMM DD, yyyy")
      );
    } else if (value === "Day") {
      dates = new Date(date);
      dates.setDate(dates.getDate());
      setdate(dates);

      setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
    } else if (value === "Month" || value === "List") {
      dates = new Date(date);
      dates.setMonth(dates.getMonth());
      setdate(dates);
      setCalDisplayLalbe(
        monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
      );
    }
    setviewtype(value);
    if (props.changeCallBack !== undefined && props.changeCallBack !== null) {
      props.changeCallBack(MakeFirstAndLastDate(value, dates));
    }
  }

  function ListView(date, data) {
    let Dates = MakeFirstAndLastDate("List", date);
    var firstDay = Dates.StartDate;
    var lastDay = Dates.EndDate;
    var CalStart = Dates.CalenderViewStartDate;
    var CalEnd = Dates.CalenderViewEndDate;

    let month = date.getMonth();
    let year = date.getFullYear();
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    let lst = [];
    data.forEach((el1) => {
      for (let index = 0; index < days.length; index++) {
        const el2 = days[index];
        if (
          moment(el1.date).format("MM-DD-yyyy") ===
          moment(el2).format("MM-DD-yyyy")
        ) {
          lst.push(el1);
        } else {
          lst.push();
        }
      }
    });

    // groupdata

    const groups = lst.reduce((groups, elist) => {
      const date = moment(elist.date).format("MM-DD-yyyy");
      if (!groups[date]) {
        groups[date] = {
          date: date,
          eventlist: [],
        };
      }
      groups[date].eventlist.push(elist);
      return groups;
    }, {});

    return (
      <>
        {Object.keys(groups).length > 0 ? (
          Object.keys(groups).map((list_item, list_index) => (
            <table
              key={list_index}
              className="month-view-calender dayWeek-view-calender list-view-calender"
            >
              <thead className="list_head">
                <tr>
                  <th className="">
                    <span>{moment(groups[list_item].date).format("dddd")}</span>
                    <span>
                      {moment(groups[list_item].date).format("MMMM DD, yyyy")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="list_body">
                {groups[list_item].eventlist.length > 0 &&
                  groups[list_item].eventlist.map((e_item, e_index) => (
                    <tr key={e_index}>
                      <td className="">
                        <p>{moment(e_item.Date).format("hh:mmA")}</p>
                        <p className="dot-blue">{e_item.title}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ))
        ) : (
          <>
            <div className="no_data">
              <div>No Data Found.</div>
            </div>
          </>
        )}
      </>
    );
  }

  function EventListModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        size="xl"
        centered
        className="popupForm rightsideModal"
      >
        <Modal.Header closeButton>
          <h4>
            Event List (
            {moment(props.EventListDate[0].date).format("MM-DD-yyyy")})
          </h4>
        </Modal.Header>
        <Modal.Body className="">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {props.EventListDate.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
              ).map((data_item, data_index) => (
                <tr>
                  <td
                    onClick={(e) => {
                      setEditActivityId(data_item.id);
                      setModalShowActivity(true);
                      props.onHide();
                    }}
                  >
                    {data_item.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.onHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <div className="calender_main">
        <div className="calender_buttons">
          <div className="text_start">
            <button onClick={(e) => fnNextPrev(-1)} className="prev btn_css">
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
            <button onClick={(e) => fnNextPrev(1)} className="next btn_css">
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
            <button onClick={(e) => fnNextPrev(0)} className="btn_css">
              Today
            </button>
          </div>
          <div className="text_center">
            <h4> {CalDisplayLalbe}</h4>
          </div>
          <div className="text_end ">
            <button
              onClick={(e) => fnViewChange("Month")}
              className={`ms-2 btn_css ${
                viewtype === "Month" ? "view_active" : "month"
              }ms-2`}
            >
              Month
            </button>

            <button
              onClick={(e) => fnViewChange("Week")}
              className={`ms-2 btn_css ${
                viewtype === "Week" ? "view_active" : "week"
              }`}
            >
              Week
            </button>
            <button
              onClick={(e) => fnViewChange("Day")}
              className={`ms-2 btn_css ${
                viewtype === "Day" ? "view_active" : "day"
              }`}
            >
              Day
            </button>

            <button
              onClick={(e) => fnViewChange("List")}
              className={`ms-2 btn_css ${
                viewtype === "List" ? "view_active" : "list"
              }`}
            >
              List
            </button>
          </div>
        </div>
        <div className="calender_body">
          {fnGenerateCal(date, viewtype, data)}
        </div>
      </div>

      {EventListModalShow && (
        <EventListModal
          show={EventListModalShow}
          // bindList={MEvents}
          EventListDate={EventListDate}
          onHide={() => setEventListModalShow(false)}
        />
      )}
    </>
  );
}
