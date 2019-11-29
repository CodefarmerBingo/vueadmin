import axios from 'axios';

// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
        traditional: true,
    }).then(res => res.data);
};

export {
    req
}