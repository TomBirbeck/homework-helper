const reverseDate = (date:string) => {
    const split = date.split('-').reverse()
    return split.join('-')
    }

export default reverseDate