const btn_suivant = document.getElementById('btn-suivant');
const choixtab = [];
let listIdContexteAlreadySeen = [];
const idDilemmeDefautDejaVu = [];
let count = 1;
btn_suivant.addEventListener('click', function() {
    if (count < 12 && AnChoiceIsChecked()) {
        const idDilemme = document.getElementById('dilemme').dataset.idDefaut;
        if (!idDilemmeDefautDejaVu.includes(idDilemme)) {
            idDilemmeDefautDejaVu.push(idDilemme);
        }
        pushChoixTab();

        // Uncheck all choices
        document.getElementById('choix1').checked = false;
        document.getElementById('choix2').checked = false;

        // fetch new default dilemme
        if (count%3==0) {
            const divDilemme = document.getElementById('contexte');
            if (divDilemme && !divDilemme.closest('template')) {
                divDilemme.remove();
            }
            showNewDilemme();
        }
        // fetch new contexte
        else{
            showContexte(idDilemme, count);
        }
        count++;
    }
    else if (count == 12) {
        pushChoixTab();
        document.getElementById('dilemme').remove();
        document.getElementById('form').classList.remove('collapse');
        btn_suivant.remove();
    }
    else{
        alert('Veuillez choisir un choix avant de continuer');
    }
});

function pushChoixTab() {
    const id_dilemme_defaut = document.getElementById('dilemme').dataset.idDefaut;
    const element = document.getElementById('contexte');
    const id_dilemme_contextualise = element && !element.closest('template') ? element.dataset.idContexte : null;
    const Listchoix = document.getElementsByName('choix');
    Listchoix.forEach(choixElement => {
        if (choixElement.checked) {
            const choix = choixElement.previousElementSibling.textContent;
            choixtab.push({id_dilemme_defaut, id_dilemme_contextualise, choix});
        }
    });
}

function AnChoiceIsChecked() {
    const choix = document.getElementsByName('choix');
    let checked = false;
    choix.forEach(choix => {
        if (choix.checked) {
            checked = true;
        }
    });
    return checked;
}

async function showNewDilemme() {
    try {
        // Get all dilemmes already seen ids
        const ids = idDilemmeDefautDejaVu.join('-');
        // Fetch dilemme defaut data
        const response = await fetch('/dilemmes_defaut/' + ids);
        const data = await response.json();

        // Get a random dilemme defaut from the retrieved data
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomDilemmeDefaut = data[randomIndex];

        // Set dataset attributes for dilemme element
        document.getElementById('dilemme').dataset.idDefaut = randomDilemmeDefaut.id;
        
        // Replace dilemme description with new dilemme description
        document.getElementById('dilemme').querySelector('#dilemme > div > p').textContent = randomDilemmeDefaut.description;

        // Replace choices with new dilemme choices
        document.getElementById('choix1').previousElementSibling.textContent = randomDilemmeDefaut.choix1;
        document.getElementById('choix2').previousElementSibling.textContent = randomDilemmeDefaut.choix2;

        // Clear the list of contexte already seen
        listIdContexteAlreadySeen = [];

    } catch (err) {
        throw new Error(err);
    }
}



async function showContexte(id, count) {
    try {
        // Fetch dilemme contextualise data by default dilemme id
        const response = await fetch('/dilemme_contextualise/defaut/' + id);
        const data = await response.json();

        // Get a random dilemme contexte from the retrieved data
        let randomDilemmeContexte;
        do{
            const randomIndex = Math.floor(Math.random() * data.length);
            randomDilemmeContexte = data[randomIndex];    
        }while(listIdContexteAlreadySeen.includes(randomDilemmeContexte.id));
        
        if (randomDilemmeContexte && !listIdContexteAlreadySeen.includes(randomDilemmeContexte.id)) {
            // Fetch contexte data by contexte id
            const responseContexte = await fetch('/contexte/' + randomDilemmeContexte.id_contexte);
            const dataContexte = await responseContexte.json();

            // Create new div with new contexte description
            if (count%3==1) {
                let clone = document.getElementById('contexte_template').content.cloneNode(true);
                clone = clone.firstElementChild;
                clone.querySelector('li').textContent = dataContexte.description;
                document.querySelector('#dilemme > *:nth-child(2)').insertAdjacentElement('afterend', clone);
            }
            // Create new li with new contexte description
            else if (count%3==2) {
                const contextediv = document.getElementById('contexte');
                const li = document.createElement('li');
                li.textContent = dataContexte.description;
                contextediv.querySelector('ul').appendChild(li);
            }
    
            // Set dataset attributes for dilemme and contexte elements
            document.getElementById('contexte').dataset.idContexte += " "  +randomDilemmeContexte.id;

            // Push the id of the dilemme contexte to the list of dilemmes already seen to avoid duplicates
            listIdContexteAlreadySeen.push(randomDilemmeContexte.id);
        }
    } catch (err) {
        throw new Error(err);
    }
}


document.getElementById('form').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const age = document.getElementById('age').value;
    const sexe = document.getElementById('sexe').value;
    const ville = document.getElementById('ville').value;
    const code_postal = document.getElementById('code_postal').value;
    const region = document.getElementById('region').value;
    const pays = document.getElementById('pays').value;
    const education = document.getElementById('education').value;
    const occupation = document.getElementById('occupation').value;
    const commentaire = document.getElementById('commentaire').value;
    
    

   
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({age, sexe, ville, code_postal, region, pays, education, occupation, commentaire}),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchReponse(data.id)
        .then(data => {
            document.getElementById('form').remove();
            let clone = document.getElementById('reponse_send_template').content.cloneNode(true);
            clone = clone.firstElementChild;
            document.querySelector('main > div').appendChild(clone);
        });
    })
    .catch(error => console.error('Erreur:', error));
});


async function fetchReponse(id_personne) {
    try {
        
        const dilemmes = choixtab;
        const response = await fetch('/reponse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_personne, dilemmes}),
        });
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err);
    }
}


