const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder')

fsPromises.readdir(folderPath, {
    withFileTypes: true
}).then(res => {
    res.forEach(el => {
        if(el.isFile()) {
            
            const filePath = path.join(__dirname, 'secret-folder', el.name)
            const fileName = path.basename(filePath);
            const ext = path.extname(filePath);
            
            fsPromises.stat(filePath).then(elStat => {
                console.log(`${fileName.replace(ext, '')} - ${ext.replace('.', '')} - ${elStat.size} bytes`)
            })
        }
    })
});
