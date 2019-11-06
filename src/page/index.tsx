import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "../style/index.less"

class Index extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div>typescript</div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Index />, document.querySelector("#main"))


function dateFtt(fmt, date) {
    let o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };

    if (/(y+)/.test(fmt))
        // eslint-disable-next-line no-param-reassign
        fmt = fmt.replace(
            RegExp.$1,
            `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
        );

    // eslint-disable-next-line no-restricted-syntax
    for (let k in o)
        if (new RegExp(`(${k})`).test(fmt))
            // eslint-disable-next-line no-param-reassign
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : `00${o[k]}`.substr(`${o[k]}`.length)
            );
    return fmt;
}
