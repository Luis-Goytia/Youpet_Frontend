const timeSlotsCalculator = (
  initialDate,
  finishDate,
  interval,
  turnsList,
  selectedDate
) => {
  const dateInitial = new Date(initialDate);
  const datefinish = new Date(finishDate);
  let actualDateStart =
    selectedDate.toDateString() + " " + dateInitial.getHours() + ":00";
  let actualDateEnd =
    selectedDate.toDateString() + " " + datefinish.getHours() + ":00";
  let date = new Date(actualDateStart);

  let todayDate = new Date();
  let endDate = new Date(actualDateEnd);
  const intervalMinutes = interval;

  let datesAndTimes = [];
  let addInterval = true;
  let idDates = 0;
  let i = 0;

  let turnsListActual = turnsList.filter(tur => tur.initialDate.getDate() === date.getDate())

  

  do {

    if (i < turnsListActual.length) {
      
      if (turnsListActual[i].initialDate.getTime() === date.getTime()) {
        date = new Date(turnsListActual[i].finishDate);
        addInterval = false;
        i++;
      }
    }

    if (date.getDate() === todayDate.getDate() && date.getHours() < todayDate.getHours() ) {
       addInterval = false
       date = new Date(date.setMinutes(date.getMinutes() + intervalMinutes));
      
    }
    if (addInterval) {
      idDates++;
      datesAndTimes.push({
        id: idDates,
        realDate: date.toUTCString(),
        timeSlot: date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      date = new Date(date.setMinutes(date.getMinutes() + intervalMinutes));
    }

    addInterval = true;
  } while (date.getHours() < endDate.getHours() + 1);


 
  return datesAndTimes;
};

export default timeSlotsCalculator;
