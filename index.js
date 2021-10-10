const title = "javascriptCalender";

const date = new Date();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth() + 1;
const today = date.getDate();

const showCalender = document.getElementById("table");

const array = (num) => Array.from({ length: num }, (_, i) => i);
const begin = "beforebegin";
const end = "beforeend";

const createRow = (contents) => {
  const result = ['<tr class="l-week">', ...contents, "</tr>"].map(
    (content) => content
  );
  return result;
};

const createDays = () => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  const result = array(7).map((num) => {
    if (days[num] === "土") {
      return `<th class="cell week saturday">${days[num]}</th>`;
    }
    if (days[num] === "日") {
      return `<th class="cell week sunday">${days[num]}</th>`;
    }
    return `<th class="cell week"> ${days[num]}</th>`;
  });
  return createRow(result);
};

const createWeekDays = (year, month) => {
  //引数によるカレンダー作成
  const startDate = new Date(year, month - 1, 1); //2020/4/1
  const endDate = new Date(year, month, 0); // 2020/4/30
  const endDayCount = endDate.getDate(); //30
  const stDate = startDate.getDate(); //1
  const startDay = startDate.getDay(); // 何曜日からスタートしているか　ex 月 == 1
  // 当該月の前月と来月の情報取得
  const lastMonth = month - 1; //3
  const lastMonthEndDate = new Date(year, lastMonth, 0); // 3/31
  const lastMonthEndDateCount = lastMonthEndDate.getDate();
  const overDay = lastMonthEndDateCount - startDay; //28

  const tabs = {
    0: '<td class="cell saturday">',
    1: '<td class="cell">',
    2: '<td class="cell before">', //色を薄く
    3: '<td class="cell today">', //色を薄く
    4: "</td>",
    6: '<td class="cell sunday">',
  };

  let beforeMonthday = overDay + 1;
  let nextMonthDay = 1;
  let dayCount = stDate; //1

  const result = array(6).map((w) => {
    const rowDays = array(7).map((d) => {
      // 前月の日付
      if (w === 0 && d < startDay) {
        const tmp = tabs[2] + beforeMonthday + tabs[4];
        beforeMonthday += 1;
        return tmp;
      }
      // 来月の日付
      if (dayCount > endDayCount) {
        const tmp = tabs[2] + nextMonthDay + tabs[4];
        nextMonthDay += 1;
        return tmp;
      }
      // 当該月の日付
      if (month === thisMonth && dayCount === today) {
        const tmp = tabs[3] + dayCount + tabs[4];
        dayCount++;
        return tmp;
      }
      if (d === 0 || d === 6) {
        const tmp = tabs[d] + dayCount + tabs[4];
        dayCount++;
        return tmp;
      }
      const tmp = tabs[1] + dayCount + tabs[4];
      dayCount++;
      return tmp;
    });
    return createRow(rowDays);
  });
  return result;
};

const createMonthCalender = (year, month) => {
  const result = [
    "<tbody>",
    `<tr class="head"><th>${month}月</th></tr>`,
    createDays(),
    createWeekDays(year, month),
    "</tbody>",
  ]
    .join()
    .replace(/,/g, "\t");

  return result;
};

showCalender.insertAdjacentHTML(
  begin,
  `<h2 class="catch">${title}<span class="strong">${thisYear}</span></h2>`
);
array(12).forEach((num) => {
  showCalender.insertAdjacentHTML(end, createMonthCalender(thisYear, num + 1));
});
