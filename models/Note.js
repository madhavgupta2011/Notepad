const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'Notes.json');
const Note = class Note {
    constructor(title) {
        this.title = title;
    };

    save() {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return [];
            }
            const Note = JSON.parse(fileContent);            
            Note.push(this);
            fs.writeFile(path.join(__dirname, '..', 'data', 'Notes.json'), JSON.stringify(Note), (err) => {
                if (err) {
                    return console.log(err);
                }
            })
        });
    };

    static fetchAll(callback) {
        delete require.cache[require.resolve('../Data/Notes.json')]
        var myArr = require('../Data/Notes.json');
        callback(myArr);
        // fs.readFile(p,(err,fileContent)=>{
        //     if(err){
        //         return [];
        //     }
        //     const Note = JSON.parse(fileContent);
        //     callback(Note);  
        // })
    };
};

module.exports = Note;