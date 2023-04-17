import { parse } from 'csv-parse';
import fs from 'node:fs'

async function createTasksFromCSV(filePath) {

    const stream = fs.createReadStream(filePath);

    const csvStream = parse({
        delimiter: ',',
        skipEmptyLines: true,
        fromLine: 2 ,
    });
    
    const linesParse = stream.pipe(csvStream);

    for await (const line of linesParse) {
        const [title, description] = line;
    
        await fetch('http://localhost:3333/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
          })
        })
    }
}

const FilePath = "./src/streams/tasks.csv"

createTasksFromCSV(FilePath)