const dateChecker = (date: string) => {
    const due = date.split('/');
    console.log("date",date)
    const newDate = new Date();
    newDate.setFullYear(Number(due[2]), Number(due[1]) - 1, Number(due[0]));
    console.log("new", newDate)
    return newDate;

}

export default dateChecker
