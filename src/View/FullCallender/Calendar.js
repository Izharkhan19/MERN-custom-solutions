import BreadcrumPath from "../../CommonComponents/BreadCrum";
import FullCalender from "./FullCalender";

function Calendar() {
  const pageNav = [
    {
      name: "Home",
      link: "/home",
      active: false,
    },
    {
      name: "Calender",
      link: "/calender",
      active: true,
    },
  ];
  function CalChange(data) {}

  return (
    <>
      <BreadcrumPath pageNav={pageNav} />
      <div className="meeting-catering-calendar">
        <FullCalender changeCallBack={CalChange} />
      </div>
    </>
  );
}

export default Calendar;
