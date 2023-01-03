const dateChecker = (date: string) => {
    const due = date.split('-');
    const newDate = new Date();
    newDate.setFullYear(Number(due[0]), Number(due[1]) - 1, Number(due[2]));
    return newDate;
}

export default dateChecker
