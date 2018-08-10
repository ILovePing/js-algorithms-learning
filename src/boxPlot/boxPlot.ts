import { asc } from "../common"
import quantile from "./quantile"

interface Option{
    boundIQR?: string | number
}
interface Plot{
    range?: Array<number>
    low?: number
    q1?: number
    median?: number
    q3?: number
    high?: number
    date?: string
    outlier?: Array<number>
}
/**
 * example data 
 * {
 *  '20180101':[1,10,2,32,4444,212],
 *  '20180102':[2,12,22,322,42444,2122]
 * }
 * 
 * @export
 * @param {Array<object>} rawData 
 * @param {Option} [opt={}] 
 */
export default function (rawData:Array<object>, opt:Option = {}) {
    let boxData = [];
    let boundIQR = opt.boundIQR;
    let useExtreme = boundIQR === 'none' || boundIQR === 0;
    Object.keys(rawData).forEach(date => {
        let _plot: Plot = {
                date,
                outlier: []
            };
        let ascList = asc(rawData[date].slice());

        let Q1 = quantile(ascList, 0.25);
        let Q2 = quantile(ascList, 0.5);
        let Q3 = quantile(ascList, 0.75);
        let min = ascList[0];
        let max = ascList[ascList.length - 1];

        let bound = +(boundIQR == null ? 1.5 : boundIQR) * (Q3 - Q1);

        let low = useExtreme
            ? min
            : Math.max(min, Q1 - bound);
        let high = useExtreme
            ? max
            : Math.min(max, Q3 + bound);
        // organize plot 
        _plot.range = [low, Q1, Q2, Q3, high];
        _plot.low = low;
        _plot.q1 = Q1;
        _plot.median = Q2;
        _plot.q3 = Q3;
        _plot.high = high;
        // organize outlier
        ascList.map(value => {
            if(value < low || value > high){
                _plot.outlier.push(value);
            }
        })
            boxData.push(_plot);
    })
    return boxData;
}
