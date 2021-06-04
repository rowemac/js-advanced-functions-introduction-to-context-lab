// Your code here
function createEmployeeRecord(array) {
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return record;
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, timeDateStamp ) {
    let [ date, hour ] = timeDateStamp.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeDateStamp) {
    let [ date, hour ] = timeDateStamp.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employeeRecord;
}

function hoursWorkedOnDate(employee, theDate) {
    let inDateTime = employee.timeInEvents.find(function(x){
        return x.date === theDate
    })

    let outDateTime = employee.timeOutEvents.find(function(x){
        return x.date === theDate
    })

    return (outDateTime.hour - inDateTime.hour) / 100;
}

function wagesEarnedOnDate(employee, theDate) {
    let wages = hoursWorkedOnDate(employee, theDate) * employee.payPerHour
    return wages
}

function allWagesFor(employee) {
    
    let daysWorked = employee.timeInEvents.map(function(x){
        return x.date
    })

    let allWages = daysWorked.reduce(function(accumulator, currentValue){
        return accumulator + wagesEarnedOnDate(employee, currentValue)
    }, 0)

    return allWages;

}

function calculatePayroll(arrayOfArrays) {
    return arrayOfArrays.reduce(function(accumulator, currentValue){
        return accumulator + allWagesFor(currentValue)
    })
}

function findEmployeeByFirstName(sourceArray, firstName) {
    let employee = sourceArray.find(firstName)
    return employee
}
