const path = require('path');
const fs = require('fs');
const {stdout, stdin} = process;

const filePath = path.join(__dirname, 'text.txt');

stdout.write('Please, enter text\n');
stdin.on('data', data => {
    fs.appendFile(filePath, data, err => {
        if(err) {
            throw err;
        }
        if(data.toString().trim() === 'exit') {
            finishWork();
        }
    })
    
})

process.on('SIGINT', finishWork);

function finishWork() {
    stdout.write('You have completed the program. Goodbye');
    process.exit();
}

