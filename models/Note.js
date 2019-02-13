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
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'Notes.json'), JSON.stringify(Note));
        });
    };

    static fetchAll(callback) {
        delete require.cache[require.resolve('../Data/Notes.json')]
        const arr = require('../Data/Notes.json');
        callback(arr);
    };
};

module.exports = Note;