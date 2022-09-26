function difDataHora(params) {
    return params.split(/[a-zA-Z]/g);
}

function difTime(p1, p2) {
    return p1 - p2;
}

function validate(blackDate) {
    let date = new Date();
    date = JSON.parse(JSON.stringify(date));
    const blackArr = difDataHora(blackDate.toString().slice(0, 19));
    const arr = difDataHora(date.toString().slice(0, 19));
    const timeH = difTime(
        parseInt(arr[1].slice(0, 5).replace(':', ''), radix),
        parseInt(blackArr[1].slice(0, 5).replace(':', ''), radix),
    );

    const By = arr[0].split('-');
    const y = blackArr[0].split('-');

    const year = difTime(parseInt(By[0], radix), parseInt(y[0], radix));
    const month = difTime(parseInt(By[1], radix), parseInt(y[1], radix));
    const day = difTime(parseInt(By[2], radix), parseInt(y[2], radix));

    if (year !== 0 || month !== 0 || day !== 0) {
        return false;
    }
    if (timeH < 60) {
        return true;
    }
    return false;
}

export default validate;
