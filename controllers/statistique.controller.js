import { getNumberOfReponse, getExport, dataToCSVV1, dataToCSVV2, dataToJSON } from "../services/statistique.service.js";
import { promises as fsPromise } from 'fs';
import fs from 'fs';

export const numberOfReposne = async (req, res) => {
    try {
        if (!req.session.authenticated) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const number = await getNumberOfReponse();
        return res.status(200).json(number);
    } catch (err) {
        return res.status(501).json(number);
    }
}

export const exportReponse = async (req, res) => {
    try {
        if (!req.session.authenticated) {
            return res.status(403).send();
        }
        const requestedFormat = req.query.format;
        const {rows, fields} = await getExport();
        if (requestedFormat === 'csv') {
            const filePathDilemmes = await dataToCSVV2(rows, fields);
            const today = new Date().toISOString().slice(0, 10);
            const fileName = `dilemmes_${today}.zip`;
            
            // Read the file content
            const archiveStream = fs.createReadStream(filePathDilemmes);
            archiveStream.pipe(res);
            // Send the file as a response
            res.setHeader('Content-Type', 'application/zip');
            res.attachment(fileName);
            

            archiveStream.on('finish', () => {
                // Send the archive as a response
                res.send(csvData);
            });
            fsPromise.unlink(filePathDilemmes);
            fsPromise.unlink('download/dilemmes.csv');
            fsPromise.unlink('download/infospersonne.csv');
        } else {
                const filePathDilemmes = await dataToJSON(rows, fields);
                const today = new Date().toISOString().slice(0, 10);
                const fileName = `dilemmes_${today}.json`;
    
                // Read the file content
                const jsonData =  await fsPromise.readFile(filePathDilemmes, {encoding: 'utf-8'});
    
                // Send the file as a response
                res.setHeader('Content-Type', 'application/json');
                res.attachment(fileName);
                res.send(jsonData); 
                
                // Delete the file after sending it
                await fsPromise.unlink(filePathDilemmes);
        }
    } catch (err) {
        return res.status(501).json(err.message);
    }
}

