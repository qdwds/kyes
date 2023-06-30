import { JsonRpcProvider, Wallet } from "ethers";
import { random } from "./src/random";
import { inertWallet } from "./sql/sql";
import { cex_newtoken_dingding_api } from "./ding";
import moment from "moment";


const bscProvider = new JsonRpcProvider("https://bsc-mainnet.nodereal.io/v1/87191eb7cee442ae988f6576b6555de6");
const ethProvider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/lkxGAuyXM0k6BgpTVmne15PetcKkFTo3");
const arbProvider = new JsonRpcProvider("https://arbitrum.blockpi.network/v1/rpc/public");

const start = async () => {
    const privateKey = random();
    const nonces = [];
    const wallet = new Wallet(privateKey);

    const bscSigner = wallet.connect(bscProvider);
    const ethSigner = wallet.connect(ethProvider);

    try {
        const bscNonce = await bscSigner.getNonce();
        nonces.push(bscNonce)
    } catch (error) {
        console.log(`nodereal: ${error}`);
    }
    try {
        const ethNonce = await ethSigner.getNonce();
        nonces.push(ethNonce)
    } catch (error) {
        console.log(`alchemy: ${error}`);
    }

    var nowNonce = nonces.filter(element => element > 0);

    if (nowNonce.length > 0) {
        cex_newtoken_dingding_api(privateKey)
    }
    const data = {
        address: wallet.address,
        privateKey,
        nonce: nowNonce.length
    }
    // console.log({
    //     ...data,
    //     nonces,
    //     nowNonce,
    // });

    await inertWallet(data);
}

const main = async () => {

    const now = moment(new Date()).utcOffset(8).format('YYYY年MM月DD日 HH:mm:ss');
    console.log(`${now}：开始监控钱包!`);
    while (true) {
        await start();
    }
}



main();