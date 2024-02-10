function getDateFiveDaysFromNow() {
    // Create a new Date object for the current date
    var date = new Date();

    // Add five days to the current date
    date.setDate(date.getDate() + 5);

    // Get the day and month names in English
    var dayName = date.toLocaleString('en-US', { weekday: 'short' });
    var monthName = date.toLocaleString('en-US', { month: 'short' });

    // Return the date as a string in the format "Sun, Jan 14"
    return dayName + ', ' + monthName + ' ' + date.getDate();
};
export {getDateFiveDaysFromNow}