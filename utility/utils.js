
export const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=";


export function currentdate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}


export function convertStringtoDate(endDate, days) {
    const endate = new Date(endDate);
    // console.log("endDate-" + endate + "-days" + days)
    //..Subtracting 10days
    const SubDate = new Date(endate.setDate(endate.getDate() - days));
    console.log("Subtracted date", SubDate)

    //... converting Date To String
    const startdate = convertDatetoString(SubDate);
    console.log("final Subtracted date", startdate)
    return startdate;
}


function convertDatetoString(date) {
    let finaldate = new Date(date);
    let dd = finaldate.getDate();
    let mm = finaldate.getMonth() + 1; //January is 0!
    let yyyy = finaldate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    finaldate = yyyy + '-' + mm + '-' + dd;
    return finaldate;
}



export function dateAndMonthName(numeric) {
    let num = new Date(numeric);  // 2009-11-10
    let datenum = num.getDate();

    if (datenum < 10) {
        datenum = '0' + datenum;
    }
    let fdate = datenum + 'th' + ' ' + num.toLocaleString('en-us', { month: 'short' });
     console.log("final date of ", fdate);
    return fdate;
}

export function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}

