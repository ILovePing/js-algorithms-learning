export default function(ascArr: Array<number>, percent:number):number {
    const H = (ascArr.length - 1) * percent + 1,
        h = Math.floor(H),
        v = +ascArr[h - 1],
        e = H - h;
    return e ? v + e * (ascArr[h] - v) : v;
}
/**
 * 
 * 1、将数据从小到大排序，计为数组a（1 to n），n代表数据的长度
 * 2、确定四分位数的位置：b= 1+(n-1) × 0.25= 2.25，b的整数部分计为c b的小数部分计为d
 * 计算Q1：Q1=a(c)+[a(c+1)-a(c)]*d=a(1)+[a(2)-a(1)] *0.25 =15+（36-15）×（2.25-2）=20.25
 * 四分位差 = Q3 - Q1
 */