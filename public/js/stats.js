const number = document.querySelector('h5 + p');

fetch('/reponse/number')
    .then(response => response.json())
    .then(data => {
        let message = `Il y a actuellement ${data} réponses enregistrées.`;
        if (typeof data === 'object') {
            message = "Vous n'avez pas les droits pour accéder à cette ressource.";
        }
        number.textContent = message;
    })
    .catch(err => {
        console.error(err);
    });
