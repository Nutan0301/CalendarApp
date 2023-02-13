import "./App.css";
import { StyledEvent } from "./ShowEvent.styled";

const ShowEvent = ({ height, top, label, color }) => {
  return (
    <>
      <StyledEvent
        className="StyledEvent"
        height={height}
        top={top}
        bgColor={color}
      >
        {label}
      </StyledEvent>
    </>
  );
};

export default ShowEvent;
