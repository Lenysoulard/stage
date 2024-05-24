const btn_suivant = document.getElementById('btn-suivant');
const choixtab = [];
const idDilemmeDefautDejaVu = [];
let count = 0;
const countMax = 9;
let answerTime = 0;
const useAnswerTime = document.querySelector('main > div').dataset.time;
const useBtnCouleur = document.querySelector('main > div').dataset.btnCouleur;
const incarnationAlreadySeen = [];
const incarnation = ['qu\'un robot humanoïde', 'que vous-même', 'qu\'une autre personne du même age et sexe que vous'];
let incarnationBool = false;

onload = () => {
    const random = Math.floor(Math.random() * incarnation.length);
    const element = incarnation[random];
    showIncaration(element);
    incarnationAlreadySeen.push(element);
    incarnation.splice(random, 1)
}




if (btn_suivant)
btn_suivant.addEventListener('click', async function() {
    if (count == 0 || incarnationBool) {
        hideIncarnation();
        answerTime = Date.now();
        document.getElementById('dilemme').classList.remove('collapse');
        incarnationBool = false;
        if (!incarnationBool)count++;
    }
    else if (count%(countMax/3) == 0 && count != 1 && count != 9 && !incarnationBool) {
        if (AnChoiceIsChecked()) {
            incarnationBool = true;
            await DilemmesHandler();
            const random = Math.floor(Math.random() * incarnation.length);
            const element = incarnation[random];
            incarnationAlreadySeen.push(element);
            incarnation.splice(random, 1);
            showIncaration(element);

            // Uncheck all choices
            document.getElementsByName('reponse').forEach(radio => { radio.checked = false});
        }else {
            alert('Veuillez faire un choix avant de continuer');
        }
    }
    else if (count < countMax  && count > 0) {
        if (AnChoiceIsChecked()) {
            await DilemmesHandler();
            answerTime = Date.now();
        } else {
            alert('Veuillez faire un choix avant de continuer');
        }
    }
    else if (count == countMax) {
        if (AnChoiceIsChecked()) {
            pushChoixTab();
            document.getElementById('dilemme').remove();
            document.getElementById('form').classList.remove('collapse');
            btn_suivant.remove();
        } else {
            alert('Veuillez faire un choix avant de continuer');
        }
    }
    
});

function getAnswerTime() {
    if (useAnswerTime == 'true')
    return (Date.now() - answerTime)/1000;
}


function showIncaration(element) {
    const incarnation = document.getElementById('incarnation');
    const dilemme = document.getElementById('dilemme');
    const oldspan = document.getElementById('movingSpan')
    if (oldspan) oldspan.remove();
    const p = incarnation.lastElementChild;
    const span = document.createElement('span');
    span.textContent = element;
    span.id='movingSpan';
    p.textContent = '';
    p.appendChild(document.createTextNode("Vous allez maintenant répondre aux dilemmes en tant ")); // Ajoute le texte avant le span
    p.appendChild(span); // Ajoute le span au paragraphe
    p.appendChild(document.createTextNode(". C'est à dire que vous allez devoir répondre en fonction de ce que vous pensez "+ element +" devrait, selon vous, répondre")); // Ajoute un point après le span
    dilemme.classList.add('collapse');
    incarnation.classList.remove('hide-incarnation');
}

async function DilemmesHandler() {
    const idDilemme = document.getElementById('dilemme').dataset.idDefaut;
    if (!idDilemmeDefautDejaVu.includes(idDilemme)) {
        idDilemmeDefautDejaVu.push(idDilemme);
    }
    pushChoixTab();

    // Uncheck all choices
    document.getElementsByName('reponse').forEach(radio => { radio.checked = false});

    // fetch new dilemme
    const divDilemme = document.getElementById('contexte');
    if (divDilemme && !divDilemme.closest('template')) {
        divDilemme.remove();
    }
    await showNewDilemme();
    if (!incarnationBool)count++;
}

function pushChoixTab() {
    const id_dilemme_defaut = document.getElementById('dilemme').dataset.idDefaut;
    const Listchoix = document.getElementsByName('reponse');
    const time = getAnswerTime();
    Listchoix.forEach(choixElement => {
        if (choixElement.checked) {
            const choix = choixElement.value;
            choixtab.push({time, id_dilemme_defaut, choix});
        }
    });
}

function AnChoiceIsChecked() {
    const choix = document.getElementsByName('reponse');
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
        // Fetch dilemme defaut data
        const response = await fetch('/dilemme_defaut/' + (count+1));
        const data = await response.json();

        // Set dataset attributes for dilemme element
        document.getElementById('dilemme').dataset.idDefaut = data.id;
        
        // Replace dilemme description with new dilemme description
        document.getElementById('dilemme').querySelector('#dilemme > div > p').textContent = data.description;

    } catch (err) {
        throw new Error(err);
    }
}


// Form submit event listener
if (document.getElementById('form'))
document.getElementById('form').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const age = document.getElementById('age').value;
    const sexe = document.getElementById('sexe').value;
    const ville = document.getElementById('ville').value;
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
        body: JSON.stringify({age, sexe, ville, region, pays, education, occupation, commentaire}),
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

function hideIncarnation() {
    const iaElement = document.getElementById('movingSpan');
    const content = document.getElementById('incarnation');
    const dilemmeElement = document.getElementById('dilemme');

    // Déplace l'IA
    dilemmeElement.firstElementChild.appendChild(iaElement);
    if (incarnationAlreadySeen[incarnationAlreadySeen.length-1] == 'qu\'un robot humanoïde') {
        iaElement.textContent = 'Robot';
    } else if (incarnationAlreadySeen[incarnationAlreadySeen.length-1] == 'que vous-même') {
        iaElement.textContent = 'Vous-même';
    }
    else {
        iaElement.textContent = 'Autre personne';
    }
  
    // Ajoute les classes pour déplacer et cacher
    iaElement.classList.add('move-to-top-right');
    content.classList.add('hide-incarnation');

}
