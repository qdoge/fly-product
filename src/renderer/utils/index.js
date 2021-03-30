const getTime = () => {
    let time = new Date();
    let month = timeStyle(parseInt(time.getMonth()) + 1);
    let day = timeStyle(time.getDate());
    let hours = timeStyle(time.getHours());
    let mins = timeStyle(time.getMinutes());
    let sds = timeStyle(time.getSeconds());
    return time.getFullYear() + '年' + month + '月' + day + '日' + hours + ':' + mins + ':' + sds;
}

const timeStyle = (str) => str < 10 ? '0' + str : str; 

const getTimeSimple = (t) => {
    let time = new Date(t);
    let month = timeStyle(parseInt(time.getMonth()) + 1);
    let day = timeStyle(time.getDate());
    return time.getFullYear() + '-' + month + '-' + day;
}

export { getTime, getTimeSimple };