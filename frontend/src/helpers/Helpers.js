import styles from '../components/App.css';

export function between(x, min, max) {
    return x >= min && x <= max;
}

export function calcPercentage(partialNumber, total) {
    return (partialNumber * 100) / total
}

export function secondsToHours(seconds) {
    return (((seconds) / 60) / 60).toFixed(1)
}

export function findStyle(value, maxValue) {
    if (between(value, 0, maxValue / 3)) return styles.errorDetailValue
    if (between(value, maxValue / 3, maxValue / 2)) return styles.warningDetailValue
    return styles.successDetailValue
}

export function findStyleWithMinValue(value, minValue) {
    if (value >= minValue) return styles.successDetailValue
    if (between(value, minValue / 2, minValue - .1)) return styles.warningDetailValue
    if (between(value, 0, minValue / 2)) return styles.errorDetailValue
    return styles.successDetailValue
}

export function getArrayFirstItem(options) {
    return !options || options.length === 0 ? "" : options[0]
}

export function performHttpCall(url, method, onSuccess, onError) {
    const options = {
        method: method,
        headers: new Headers({ 'content-type': 'application/json' })
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong ...');
        })
        .then(data => onSuccess(data))
        .catch(error => onError(error));
}