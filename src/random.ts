const only = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    "a","b","c","d","e","f",
];

export const random = ()=> {
    let pass = '';
    for (let i = 0; i < 64; i++) {
        var x = Math.floor(Math.random() * only.length);
        pass += only[x];
    }
    return `0x${pass}`;
}