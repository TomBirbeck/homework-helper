import dateChecker from "./datechecker"
import dateDiffInDays from "./dateDifferenceDays"

const compareDates = (due: string) => {
    const dueDate = dateChecker(due)
    const today = new Date()
    const days = dateDiffInDays(today, dueDate)
    return days
}

export default compareDates