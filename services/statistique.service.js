import { getNumberOfReponse as getNumber, getReponseExport } from '../repositories/reponse.repository.js';
import { getDilemmeDefautById } from '../repositories/dilemme_defaut.repository.js'; 
import { getIncarnationById } from "../repositories/incarnation.repository.js";
import ExportReponse from '../models/export_reponse.model.js';

import archiver from 'archiver';
import path from 'path';
import fs from 'fs';


export const getNumberOfReponse = async () => {
    try {
        return await getNumber();
    } catch (err) {
        throw new Error(err);
    }
}

export const getExport = async () => {
    try {
        const exports = await getReponseExport();
        const rows = exports.rows;
        rows.map((exportReponse) => {
            return new ExportReponse(
                exportReponse.id,
                exportReponse.age,
                exportReponse.sexe,
                exportReponse.ville,
                exportReponse.pays,
                exportReponse.education,
                exportReponse.information,
                exportReponse.commentaire,
                exportReponse.dilemmes
            );
        });
        return {rows, fields: exports.fields};
    } catch (err) {
        throw new Error(err);
    }
}

export const dataToCSVV1 = (rows, fields) => {
    const headers = fields.map(header => header.name);
    const records = rows.map(item => [
        item.id,
        item.age,
        item.sexe,
        item.ville,
        item.region,
        item.pays,
        item.education,
        item.information,
        item.commentaire.replace(/;/g, ','), // Replace commas to avoid CSV format issues
        JSON.stringify(item.dilemmes).replace(/;/g, ',') // Convert dilemmes to JSON and handle commas
    ].join(';'));
    const csvContent = [headers.join(';'), ...records].join('\n');
    
    const filePath = 'download/output.csv';
    
    writeFile(filePath, csvContent)
        .catch(err => console.error('Error writing CSV file:', err));
}

import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

export const dataToCSVV2 = async (rows, fields) => {
    const headers = fields
        .filter(header => header.name !== 'dilemmes')
        .map(header => header.name);

    const idpersonnes = rows.map(item => item.id);
    const records = rows.map(item => [
        item.id,
        item.age,
        item.sexe,
        item.ville,
        item.pays,
        item.education,
        item.information,
        item.commentaire.replace(/;/g, ','), // Replace semicolons to avoid CSV format issues
    ].join(';'));

    const csvContent = [headers.join(';'), ...records].join('\n');
    const filePath = path.join('download', 'infospersonne.csv');
    
    try {
        await writeFile(filePath, csvContent);
    } catch (err) {
        console.error('Error writing CSV file:', err);
    }

    const headersDilemmes = ['id personne', 'choix', 'temps de réponse', 'incarnation', 'dilemme'];
    const recordsDilemmes = await Promise.all(rows.map(async (reponse, index) => {
        const dilemmeRecords = await Promise.all(reponse.dilemmes.map(async (reponseDilemme) => {
            const [dilemmeDefaut, incarnation] = await Promise.all([
                getDilemmeDefautById(reponseDilemme.id_dilemme_defaut),
                getIncarnationById(reponseDilemme.id_incarnation)
            ]);
            return `${idpersonnes[index]};${reponseDilemme.choix};${reponseDilemme.time ?? 'Pas de temps de réponse'};${incarnation[0].description};${dilemmeDefaut[0].description}`;
        }));
        return dilemmeRecords.join('\n');
    }));

    const csvContentDilemmes = [headersDilemmes.join(';'), ...recordsDilemmes].join('\n');
    const filePathDilemmes = path.join('download', 'dilemmes.csv');
    
    try {
        await writeFile(filePathDilemmes, csvContentDilemmes);
    } catch (err) {
        console.error('Error writing CSV file:', err);
    }

    const archivePath = path.join('download', 'export.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream(archivePath);

    return new Promise((resolve, reject) => {
        output.on('close', () => {
            console.log(archive.pointer() + ' total bytes');
            console.log('Data has been archived successfully');
            resolve(archivePath);
        });

        archive.on('error', err => {
            reject(new Error(err));
        });

        archive.file(filePath, { name: 'infospersonne.csv' });
        archive.file(filePathDilemmes, { name: 'dilemmes.csv' });

        archive.pipe(output);
        archive.finalize();
    });
};


export const dataToJSON = async (rows, fields) => {
    // Création des données JSON pour les informations personnelles
    const jsonPersonnes = rows.map(item => ({
        id: item.id,
        age: item.age,
        sexe: item.sexe,
        ville: item.ville,
        pays: item.pays,
        education: item.education,
        information: item.information,
        commentaire: item.commentaire.replace(/;/g, ',') // Remplacer les point-virgules pour éviter les problèmes de format
    }));
    const jsonDilemmes = [];
    for (const reponse of rows) {
        const jsonData = await Promise.all(reponse.dilemmes.map(async (reponseDilemme) => {
            const [dilemmeDefaut, incarnation] = await Promise.all([
                getDilemmeDefautById(reponseDilemme.id_dilemme_defaut),
                getIncarnationById(reponseDilemme.id_incarnation)
            ]);

            return {
                choix: reponseDilemme.choix,
                incarnation: incarnation[0].description,
                description: dilemmeDefaut[0].description,
                time: reponseDilemme.time ?? 'Pas de temps de réponse'
            };
        }));

        const jsonPersonne = jsonPersonnes.find(personne => personne.id === reponse.id);

        jsonDilemmes.push({
            infosPersonne: jsonPersonne,
            dilemmes: jsonData
        });
    }

    const filePathDilemmes = 'download/dilemmes.json';

    // Écrire les données des dilemmes dans un fichier JSON
    writeFile(filePathDilemmes, JSON.stringify(jsonDilemmes, null, 2))
        .then(() => console.log('JSON file for dilemmas has been written successfully'))
        .catch(err => console.error('Error writing JSON file:', err));

    return filePathDilemmes;
}




