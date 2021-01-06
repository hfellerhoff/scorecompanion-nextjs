// Date is in format XXXX–XX-XX
const getYearFromDate = (date: string) => {
    return parseInt(date ? date.substring(0, 4) : '0000')
}

export default getYearFromDate