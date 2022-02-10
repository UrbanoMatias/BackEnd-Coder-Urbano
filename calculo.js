function random() {
    let min = 1;
    let max = 1000;
    let randomNumber = Math.floor(Math.random() * (max - min) + min);
    return randomNumber
}
process.send(random())