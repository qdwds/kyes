import mysql from "mysql2";
import moment from "moment";

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'sfwgxxx',
    password: 'q1101011',
    port: 3306,
    database: "blockchain",
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
});


connection.getConnection((err, conn) => {
    const now = moment(new Date()).utcOffset(8).format('YYYY年MM月DD日 HH:mm:ss');
    try{
        conn.connect((err) => {
            if (err) {
                console.log('连接失败~');
            } else {
                console.log('连接成功~');
            }
        })
    }catch (e) {
        console.log(`${now}：mysql2 ${e}`)
    }
})


export const pool = connection.promise();



