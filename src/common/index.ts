export const asc:(arr: Array<number|string>) => Array<any> = (arr) => {
    arr.sort((a,b)=> {
        return +a-+b
    });
    return arr;
}