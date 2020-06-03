const days = ["日", "月", "火", "水", "木", "金", "土"]

const thisYear = new Date().getFullYear()

const showCalender = document.getElementById('table');

// document.querySelector('#js-calendar-body').innerHTML= calendarHtml

for(let i=1;i<=12;i++){
    // console.log(createCalender(thisYear, i))
    let a = createCalender(thisYear,i)
    // showCalender.insertAdjacentHTML('beforeend', '<div>createCalender(thisYear,i)</div>');
    showCalender.insertAdjacentHTML('beforeend',a)

}

// createCalender2020(3)

function createCalender(year,month){
    //引数によるカレンダー作成
    const startDate = new Date(year, month - 1, 1) //2020/4/1
    const endDate = new Date(year, month, 0) // 2020/4/30
    const endDayCount = endDate.getDate() //30
    const stDate = startDate.getDate() //1
    const startDay = startDate.getDay()
    //通常
    const atab = '<td class="cell">'
    const btab = '</td>'
    //例外
    const lastMonth = month - 1 //3
    const lastMonthEndDate = new Date(year, lastMonth, 0) // 3/31
    const lastMonthEndDateCount = lastMonthEndDate.getDate()
    const overDay = lastMonthEndDateCount - startDay //28
    let beforeMonthday = overDay + 1
    let nextMonthDay = 1
    // console.log(overDay)
    const batab = '<td class="cell before">'
    const bbtab = '</td>'
    let dayCount = stDate //1
    let calendarHtml = ''
    
    calendarHtml +='<tbody>'
    
    calendarHtml += '<tr class="head"><th>' + month +'月</th></tr>'
    
    calendarHtml += '<tr class="l-week">'
    for(let m = 0;m < 7; m++){
        calendarHtml+='<th class="cell week">'+days[m]+'</th>'
    }
    calendarHtml += '</tr>'
    for (let w = 0; w < 6; w++) {
        calendarHtml += '<tr class="l-week">'
        for (let d = 0; d < 7; d++) {
            if (w === 0 && d < startDay) {
                calendarHtml += batab + beforeMonthday + bbtab
                beforeMonthday += 1
            } else if (dayCount > endDayCount) {
                calendarHtml += batab + nextMonthDay + bbtab
                nextMonthDay += 1
            } else {
                calendarHtml += atab + dayCount + btab
                dayCount++
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</tbody>'
    return calendarHtml
}

