import "./App.css";
import moment from "moment";
import { useEffect, useState } from "react";
import ShowEvent from "./ShowEvent";
import { colors } from "./constants";

const App = () => {
  const [overlappinEvents, setOverlappingEvents] = useState([]);
  const [nonOverlappinEvents, setNonOverlappingEvents] = useState([]);

  const startTime = 9;
  const dayDurationInHrs = 9;
  const eventsArray = [
    { start: 30, end: 120 },
    { start: 300, end: 330 },
    { start: 290, end: 330 },
  ];

  // helpers to create 2 different set of arrays, one with over lapping time and other without
  // this is done to avoid overlapping of events on the UI and allow rendered events to scale their width along X axis
  const overlapping = (a, b) => {
    const getMinutes = (s) => {
      const p = s.split(":").map(Number);
      return p[0] * 60 + p[1];
    };
    return (
      getMinutes(a.end) > getMinutes(b.start) &&
      getMinutes(b.end) > getMinutes(a.start)
    );
  };
  const isOverlapping = (arr) => {
    let i, j;
    let overlappingArr = [];
    for (i = 0; i < arr.length - 1; i++) {
      for (j = i + 1; j < arr.length; j++) {
        if (overlapping(arr[i], arr[j])) {
          overlappingArr.unshift(arr[i], arr[j]);
          return overlappingArr;
        }
      }
    }

  };
  // the original event array is manipulated to have start and end in HH:mm format and 
  // also added color which generates a random hexcode per event
  const renderDay = (evArr) => {
    const t = moment("09:30", "HH:mm");
    const updatedEvents = evArr.map((obj, i) => ({
      ...obj,
      start: moment("09:00", "HH:mm").add(obj.start, "minutes").format("HH:mm"),
      end: moment("09:00", "HH:mm").add(obj.end, "minutes").format("HH:mm"),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    return updatedEvents;
  };

  useEffect(() => {
    const eventList = renderDay(eventsArray);
    setOverlappingEvents(isOverlapping(eventList));
    setNonOverlappingEvents(
      eventList.filter((elem) => {
        return isOverlapping(eventList).some((ele) => {
          return ele.start !== elem.start && ele.end !== elem.end;
        });
      })
    );
  }, []);

  // to generate a nice label from 9AM - 6PM
  const generateTimeLabel = (time) => {
    if (startTime + time < 12)
      return startTime + time < 10
        ? `0${time + startTime}:00 AM`
        : `${time + startTime}:00 AM`;
    if (startTime + time === 12) return `${time + startTime}:00 PM`;
    else return `${startTime + time - 12}:00 PM`;
  };

  return (
    <>
      <div className="cal-header" data-testid="header">Welcome to your calendar daily view</div>
      <div className="flex-container">
        <div className="event-flex">
          {overlappinEvents.map((ev) => (
            <ShowEvent
              height={`${
                (moment(ev.end, "HH:mm").diff(
                  moment(ev.start, "HH:mm"),
                  "minutes"
                ) /
                  30) *
                  60 -
                4
              }px`}
              top={`${
                (moment(ev.start, "HH:mm").diff(
                  moment("09:00", "HH:mm"),
                  "minutes"
                ) /
                  30) *
                  60 +
                17
              }px`}
              label={`Event:${ev.start}-${ev.end}`}
              color={ev.color}
            />
          ))}
        </div>
        <div className="event-flex">
          {nonOverlappinEvents.map((ev) => (
            <ShowEvent
              height={`${
                (moment(ev.end, "HH:mm").diff(
                  moment(ev.start, "HH:mm"),
                  "minutes"
                ) /
                  30) *
                  60 -
                4
              }px`}
              top={`${
                (moment(ev.start, "HH:mm").diff(
                  moment("09:00", "HH:mm"),
                  "minutes"
                ) /
                  30) *
                  60 +
                17
              }px`}
              label={`Event: ${ev.start}-${ev.end}`}
              color={ev.color}
            />
          ))}
        </div>
        {[...Array(dayDurationInHrs + 1).keys()].map((t) => (
          <>
            <div className="timeLabel" key={`$key-${t}`}>
              {generateTimeLabel(t)}
              <h3 className="hour-line"></h3>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default App;
