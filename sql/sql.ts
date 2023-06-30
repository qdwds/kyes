import { pool } from "./index";
import moment from "moment";


interface IWallet {
    address:string,
    privateKey:string,
    nonce:number
}
export const inertWallet = async (data:IWallet) =>{
    const now = moment(new Date()).utcOffset(8).format('YYYY年MM月DD日 HH:mm:ss');

    try{
        await pool.execute(
            "INSERT IGNORE INTO `wallets` (address, date, privateKey, nonce) VALUES(?,?,?,?)",
            [data.address,now, data.privateKey, data.nonce]
        )
    }catch (e) {
        console.log(`${now}：${e}`)
    }

}


export const query_evm_erc20 = async () =>{
    const [result] = await pool.query("SELECT * FROM `bsc_erc20`");
    return result;
}

inertWallet({
    address:"1",
    privateKey:"1",
    nonce:1
})