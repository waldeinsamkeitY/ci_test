/*
 * @Description: 描述
 * @Author: YS
 * @Date: 2023-02-17 17:00:21
 * @LastEditors: YS
 * @LastEditTime: 2023-02-17 17:56:58
 */
const arr = ['', 2, 2, '', '', 2, '', undefined]



function arrTrim(arr) {
    if (arr.length === 0) return arr
    const first = 0
    const last = arr.length - 1
    while (first !== last) {
        if (!!arr[first] && arr[first] !== 0 && first === 0) {
            arr.slice(first, 0)
        }
    }
}