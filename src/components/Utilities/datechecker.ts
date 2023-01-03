const dateChecker = (date: string) => {
    const due = date.split('-');
    const newDate = new Date();
    // console.log("date", date, "due", due)
    newDate.setFullYear(Number(due[2]), Number(due[1]) - 1, Number(due[0]));
    return newDate;
}

export default dateChecker
