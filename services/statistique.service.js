import { getNumberOfReponse as getNumber, getReponseExport } from '../repositories/reponse.repository.js';
import { getDilemmeDefautById } from '../repositories/dilemme_defaut.repository.js'; 
import { getDilemmeContextualiseById } from '../repositories/dilemme_contextualise.repository.js';
import {getContexteById} from '../repositories/contexte.repository.js';
import ExportReponse from '../models/export_reponse.model.js';
import { writeFile } from 'fs/promises';
import archiver from 'archiver';
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
                exportReponse.region,
                exportReponse.pays,
                exportReponse.education,
                exportReponse.occupation,
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
        item.occupation,
        item.commentaire.replace(/;/g, ','), // Replace commas to avoid CSV format issues
        JSON.stringify(item.dilemmes).replace(/;/g, ',') // Convert dilemmes to JSON and handle commas
    ].join(';'));
    const csvContent = [headers.join(';'), ...records].join('\n');
    
    const filePath = 'download/output.csv';
    
    writeFile(filePath, csvContent)
        .catch(err => console.error('Error writing CSV file:', err));
}

export const dataToCSVV2 =  async (rows, fields) => {
    const headers = fields.map(header => header.name);
    const idpersonnes = rows.map(item => item.id);
    const records = rows.map(item => [
        item.id,
        item.age,
        item.sexe,
        item.ville,
        item.region,
        item.pays,
        item.education,
        item.occupation,
        item.commentaire.replace(/;/g, ','), // Replace commas to avoid CSV format issues // Convert dilemmes to JSON and handle commas
    ].join(';'));

    const csvContent = [headers.join(';'), ...records].join('\n');
    
    const filePath = 'download/infospersonne.csv';
    
    await writeFile(filePath, csvContent)
        .catch(err => console.error('Error writing CSV file:', err));

    const headersDilemmes = ['id','choix', 'id_dilemme_defaut', 'id_dilemme_contextualise'];
    
    const recordsDilemmes = [];
    let count = 0;
    for (const reponse of rows) {
        let dilemmeData = [];
        let contexte = [];
        let i = null;
        let dilemmeDefaut = { description: ''};
        for (const reponseDilemme of reponse.dilemmes) {
            if (i != reponseDilemme.id_dilemme_defaut) {
                dilemmeDefaut = await getDilemmeDefautById(reponseDilemme.id_dilemme_defaut);
                contexte = [];
            }
            let id = null;
            if (reponseDilemme.id_dilemme_contextualise != null){
                if ((reponseDilemme.id_dilemme_contextualise).length == 3 || (reponseDilemme.id_dilemme_contextualise).length == 2){
                    id = (reponseDilemme.id_dilemme_contextualise).slice(1);
                }else if ((reponseDilemme.id_dilemme_contextualise).length == 6){
                    id = (reponseDilemme.id_dilemme_contextualise).slice(4);
                }
                else if ((reponseDilemme.id_dilemme_contextualise).length == 4){
                    id = (reponseDilemme.id_dilemme_contextualise).slice(3);
                }
                else if ((reponseDilemme.id_dilemme_contextualise).length == 5){
                    if ((reponseDilemme.id_dilemme_contextualise)[2] == " "){
                        id = (reponseDilemme.id_dilemme_contextualise).slice(3);
                    }else{
                        id = (reponseDilemme.id_dilemme_contextualise).slice(4);
                    }
                }
            }
            if (id != null){
                const dilemmeContextualise = await getDilemmeContextualiseById(id);
                contexte.push((await getContexteById(dilemmeContextualise[0].id_contexte))[0].description);
            }
            dilemmeData.push(`${idpersonnes[count]};${reponseDilemme.choix};${dilemmeDefaut[0].description};${contexte.join(', ')}`);
            i = reponseDilemme.id_dilemme_defaut;
        }
        recordsDilemmes.push(dilemmeData.join('\n') + '\n');
        count++;
    }

    const csvContentDilemmes = [headersDilemmes.join(';'), ...recordsDilemmes].join('\n');

    const filePathDilemmes = 'download/dilemmes.csv';

    await writeFile(filePathDilemmes, csvContentDilemmes)
        .catch(err => console.error('Error writing CSV file:', err));

    const archivePath = 'download/export.zip';

    const archive = archiver('zip', { zlib: { level: 9 } });
    const output = fs.createWriteStream(archivePath);

    output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('Data has been archived successfully');
    });

    archive.on('error', err => {
        throw new Error(err);
    });

    archive.file(filePath, { name: 'infospersonne.csv' });
    archive.file(filePathDilemmes, { name: 'dilemmes.csv' });

    archive.pipe(output);
    await archive.finalize();
    return archivePath;
}


export const dataToJSON = async (rows, fields) => {
    // Création des données JSON pour les informations personnelles
    const jsonPersonnes = rows.map(item => ({
        id: item.id,
        age: item.age,
        sexe: item.sexe,
        ville: item.ville,
        region: item.region,
        pays: item.pays,
        education: item.education,
        occupation: item.occupation,
        commentaire: item.commentaire.replace(/;/g, ',') // Remplacer les point-virgules pour éviter les problèmes de format
    }));
    
    const jsonDilemmes = [];
    for (const reponse of rows) {
        let contexte = [];
        let dilemmeDefaut = { description: '' };
        let i = null;
        const jsonData = [];
        for (const reponseDilemme of reponse.dilemmes) {
            if (reponseDilemme.id_dilemme_defaut != i) {
                dilemmeDefaut = await getDilemmeDefautById(reponseDilemme.id_dilemme_defaut);
                contexte = [];
            }

            let id = null;
            if (reponseDilemme.id_dilemme_contextualise != null){
                if ((reponseDilemme.id_dilemme_contextualise).length == 3 || (reponseDilemme.id_dilemme_contextualise).length == 2){
                    id = (reponseDilemme.id_dilemme_contextualise).slice(1);
                }else if ((reponseDilemme.id_dilemme_contextualise).length == 6){
                    id = (reponseDilemme.id_dilemme_contextualise).slice(4);
                }
                else if ((reponseDilemme.id_dilemme_contextualise).length == 4){
                    id = (reponseDilemme.id_dilemme_contextualise).slice(3);
                }
                else if ((reponseDilemme.id_dilemme_contextualise).length == 5){
                    if ((reponseDilemme.id_dilemme_contextualise)[2] == " "){
                        id = (reponseDilemme.id_dilemme_contextualise).slice(3);
                    }else{
                        id = (reponseDilemme.id_dilemme_contextualise).slice(4);
                    }
                }
            }
            if (id) {
                const dilemmeContextualise = await getDilemmeContextualiseById(id);
                contexte.push(dilemmeContextualise && dilemmeContextualise.length ? (await getContexteById(dilemmeContextualise[0].id_contexte))[0].description : "Contexte non disponible");
            }

            jsonData.push({
                choix: reponseDilemme.choix,
                descriptionDefaut: dilemmeDefaut[0].description,
                contexte: contexte.join(', ')
            });
            i = reponseDilemme.id_dilemme_defaut;
        }
        const jsonPersonne = jsonPersonnes.find(personne => personne.id === reponse.id);
        jsonDilemmes.push({
            infosPersonne: jsonPersonne,
            dilemmes: [...jsonData]
        });
    }

    const filePathDilemmes = 'download/dilemmes.json';

    // Écrire les données des dilemmes dans un fichier JSON
    writeFile(filePathDilemmes, JSON.stringify(jsonDilemmes, null, 2))
        .then(() => console.log('JSON file for dilemmas has been written successfully'))
        .catch(err => console.error('Error writing JSON file:', err));

    return filePathDilemmes;
}
