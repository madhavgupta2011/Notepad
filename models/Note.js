
//Declaration of the core modules required 
const fs = require('fs');
const path = require('path');

// Just for cross operating system error
const p = path.join(__dirname, '..', 'data', 'Notes.json');

const mongo = require('../util/database');

/*
=> Class - Note
=> Methods - save,fetchAll > static,findById > static
 */
const Note = class Note {
    constructor(title) {
        this.title = title;
    };

    //method responsible to get the file Contents from the JSON file and push the changes again to the JSON file
    save() {
        mongo.mongoConnect(client=>{
            const db = client.db('Notes');
            db.collection('ourNotes').insertOne(this).then(result=>{
                console.log(JSON.stringify(result.ops));
                client.close();
            })
            .catch(err=>console.log(err))
        })
        
        // fs.readFile(p, (err, fileContent) => {
        //     if (err) {
        //         return [];
        //     }
        //     const Note = JSON.parse(fileContent);            
        //     Note.push(this);
        //     fs.writeFile(path.join(__dirname, '..', 'data', 'Notes.json'), JSON.stringify(Note),(err)=>{
        //         console.log(err);
        //     });
        // });
    };

    //Method responsible to get all the tasks
    static fetchAll(callback) {
        mongo.mongoConnect(client =>{
            const db = client.db('Notes');
            db.collection('ourNotes').find().toArray().then(arr=>{
                client.close();
                console.log(arr);
                callback(arr);
            })
            .catch(err=>{
                console.log(err);
            });

        })
        // delete require.cache[require.resolve('../Data/Notes.json')]
        // const arr = require('../Data/Notes.json');

    };

    //Method responsible to get details about a single task
    /**
     * 
     * @param id 
     * @param callback 
     */
    static findById(id,callback){
        Note.fetchAll(tasks => {
            callback(tasks.find(task=>task._id==id));
        });
    }
};

//Exporting the class Note to be used in other files
module.exports = Note;