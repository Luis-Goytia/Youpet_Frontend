import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTurn, clearTurn, createTurn } from "../../../../Redux/actions";
import loading_dualring from "./loading_dualring.svg";

import timeSlots from "./timeSlotsCalculator";

import LoadingComponent from "./Loading";

import "./turns.css";
import Payment from "../../Payment";

function Times(props) {
  const { vetSelect, updateCalendar, setUpdateCalendar } = props;

  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [calcularSlots, setCalcularSlots] = useState(true);
  const [calcularTime, setCalcularTime] = useState(true);
  const [time, setTime] = useState([]);
  const [timesAvailable, setTimesAvailable] = useState([]);
  const [slotSelected, setSlotSelected] = useState(null);
  const [prevButton, setPrevButton] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);

  const { servId } = useParams();
  const dispatch = useDispatch();

  const Turns = useSelector((state) => state.turn);
  const createdTur = useSelector((state) => state.createdTurn);

  useEffect(() => {
    if (updateCalendar && vetSelect !== "none") {
      dispatch(getTurn({ vetSelect, servId }));
      setUpdateCalendar(false);
      setLoadingTimeSlots(true);
    }
  }, [servId, dispatch, Turns, vetSelect, updateCalendar, setUpdateCalendar]);

  useEffect(
    () => () => {
      setIsLoading(false);
      dispatch(clearTurn());
    },
    [dispatch]
  );

  useEffect(() => {
    setCalcularSlots(true);
  }, [props.date, Turns]);

  if (Turns[0] && calcularSlots) {
    const intervalo = Turns[0].service.timelapse;
    const turnsList = Turns[0].turn.map((tur) => {
      return {
        id: tur.id,
        initialDate: new Date(tur.inicialDate),
        finishDate: new Date(tur.finishDate),
      };
    });
    const initialDate = Turns[0].vet.inicialDate;
    const finishDate = Turns[0].vet.finishDate;

    setTimesAvailable(
      timeSlots(initialDate, finishDate, intervalo, turnsList, props.date)
    );
    setCalcularSlots(false);
    setCalcularTime(true);
  }

  if (timesAvailable && calcularTime) {
    setTime(timesAvailable);
    setCalcularTime(false);

    setTimeout(() => {
      setLoadingTimeSlots(false);
    }, "500");
  }

  const displayInfo = (e) => {
    setInfo(true);
    setEvent(e.target.innerText);
  };

  const handleClickTime = (e, times) => {
    setSlotSelected(times.realDate);
    displayInfo(e);

    const restoreButton = prevButton;

    if (prevButton !== null) {
      restoreButton.classList.remove("timeSlotButtonActive");
    }

    e.target.classList.add("timeSlotButtonActive");
    setPrevButton(e.target);
  };

  const handleClickTakeTurn = (e) => {
    if (prevButton === null) {
      console.log("Debes de elegir al menos 1 hora");
    } else {
      // const formDate =
      //   props.date.toDateString() + " " + event.substring(0, 5) + ":00";
      // let myDate = new Date(formDate);

      let startDate = new Date(slotSelected);

      let finishDate = new Date(slotSelected);
      finishDate.setMinutes(
        finishDate.getMinutes() + Turns[0].service.timelapse
      );
      const turnInfo = {
        timelapse: Turns[0].service.timelapse,
        globalprice: Turns[0].service.price,
        inicialDate: startDate.toUTCString(),
        finishDate: finishDate.toUTCString(),
        VetId: vetSelect,
        ServiceId: servId
      };

      dispatch(createTurn(turnInfo));
      setIsLoading(true);
    }
  };

  return (
    <div className="timeSlotContainer">
      <div className="d-flex flex-wrap justify-content-center">
        {vetSelect === "none" ? (
          <h3>Choose a vet first</h3>
        ) : loadingTimeSlots ? (
          <img
            src={loading_dualring}
            alt="Loading..."
            className="loadingTurnsTime"
          />
        ) : time?.length ? (
          time.map((times) => {
            return (
              <button
                key={times.id}
                type="button"
                onClick={(e) => handleClickTime(e, times)}
                className="timeSlotButton btn btn-outline-info"
              >
                {times.timeSlot}
              </button>
            );
          })
        ) : (
          <h3>No turns available</h3>
        )}
      </div>

      <div>
        {info ? `Turn selected at ${event} ${props.date.toDateString()}` : null}
      </div>

      {isLoading && (
        <Payment/>
      )}

      <div>
        <hr />
        <button
          className="text-decoration-none btn btn-dark"
          onClick={(e) => {
            handleClickTakeTurn(e);
          }}
        >
          Take turn
        </button>
      </div>
    </div>
  );
}

export default Times;
