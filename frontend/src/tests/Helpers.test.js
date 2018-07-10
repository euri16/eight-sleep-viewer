import styles from '../components/App.css';
import { between, calcPercentage, secondsToHours, 
        findStyle, findScoreStyle, findStyleWithMinValue,
        getArrayFirstItem } from "../helpers/Helpers"

it('between function', () => {
    expect(between(5, 3, 10)).toBeTruthy()
    expect(between(1, 3, 10)).toBeFalsy()
});

it('calculate percentage', () => {
    expect(calcPercentage(20, 100)).toEqual(20)
    expect(calcPercentage(5, 20)).toEqual(25)
});

it('seconds to hours', () => {
    expect(secondsToHours(7200)).toEqual("2.0")
    expect(secondsToHours(14400)).toEqual("4.0")
    expect(secondsToHours("")).toEqual("0.0")
    expect(secondsToHours(true)).toEqual("0.0")
});

it('find style', () => {
    expect(findStyle(2, 10)).toEqual(styles.errorDetailValue)
    expect(findStyle(3, 10)).toEqual(styles.errorDetailValue)
    expect(findStyle(5, 10)).toEqual(styles.warningDetailValue)
    expect(findStyle(8, 10)).toEqual(styles.successDetailValue)

    expect(findScoreStyle(2, 5)).toEqual(styles.errorDetailValue)
    expect(findScoreStyle(3, 5)).toEqual(styles.warningDetailValue)
    expect(findScoreStyle(4.5, 5)).toEqual(styles.successDetailValue)

    expect(findStyleWithMinValue(5, 10)).toEqual(styles.successDetailValue)
    expect(findStyleWithMinValue(7, 10)).toEqual(styles.warningDetailValue)
    expect(findStyleWithMinValue(3, 10)).toEqual(styles.errorDetailValue)
});

it('array first item', () => {
    expect(getArrayFirstItem([5, 4, 3])).toEqual(5)
    expect(getArrayFirstItem(null)).toEqual("")
});
