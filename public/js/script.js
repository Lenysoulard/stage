const btn_suivant = document.getElementById('btn-suivant');
const choixtab = [];
const idDilemmeDefautDejaVu = [];
let count = 0;
let countMax = 0;
let countIncarnation = 0;
let countDilemme = 0;
let answerTime = 0;
const useAnswerTime = document.querySelector('main > div').dataset.time;
const useBtnCouleur = document.querySelector('main > div').dataset.btnCouleur;
const incarnationAlreadySeen = [];
let incarnation = [];
let incarnationBool = false;
let dilemmesId = [];


if (btn_suivant){
     onload = async () => {
        let element = {};
        fetch('/incarnation')
        .then(response => response.json())
        .then(data => {
            incarnation = data;
            let random = Math.floor(Math.random() * incarnation.length);
            while (incarnationAlreadySeen.includes(incarnation[random])) {
                random = Math.floor(Math.random() * incarnation.length);
            }
            element = incarnation[random];
            incarnationAlreadySeen.push(element);
            incarnation.splice(random, 1);
            showIncaration2(element);
        }).catch(err => console.error(err));

        const reposne = await fetch('/dilemmes_defaut');
        const data = await reposne.json();
        dilemmesId = data.map(dilemme => dilemme.id);
        dilemmesId.sort((a, b) => a - b);
        const reponseNumber = await fetch('/incarnation/count');
        const dataNumber = await reponseNumber.json();
        countIncarnation = dataNumber;
        countMax = dilemmesId.length * countIncarnation;
        countDilemme = dilemmesId.length;
        await showNewDilemme();
    }
btn_suivant.addEventListener('click', async function() {
    if (count == 0 || incarnationBool) {
        hideIncarnation();
        answerTime = Date.now();
        document.getElementById('dilemme').classList.remove('collapse');
        incarnationBool = false;
        if (!incarnationBool)count++;
    }
    else if (count%(countDilemme) == 0 && count != 1 && count != countMax && !incarnationBool) {
        if (AnChoiceIsChecked()) {
            incarnationBool = true;
            await DilemmesHandler();
            const random = Math.floor(Math.random() * incarnation.length);
            const element = incarnation[random];
            incarnationAlreadySeen.push(element);
            incarnation.splice(random, 1);
            showIncaration2(element);

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
            document.getElementById('incarnation').remove();
            document.getElementById('form').classList.remove('collapse');
            btn_suivant.remove();
        } else {
            alert('Veuillez faire un choix avant de continuer');
        }
    }
    
});
}

function getAnswerTime() {
    if (useAnswerTime == 'true')
    return (Date.now() - answerTime)/1000;
}


function showIncaration2(element) {
    const incarnationDiv = document.getElementById('incarnation');
    switch (count) {
        case 0: incarnationDiv.firstElementChild.textContent = 'Première étape';
        break;
        case 3: incarnationDiv.firstElementChild.textContent = 'Deuxième étape';
        break;
        case 6: incarnationDiv.firstElementChild.textContent = 'Troisième étape';
        break;
    }
    incarnationDiv.firstElementChild.classList.remove('collapse');
    incarnationDiv.firstElementChild.classList.remove('hide-title');
    incarnationDiv.querySelector('div').style.padding = '';

    let img = '/img/';
    let alt;
    let className;

    if (element.id == 1) {
        img += 'robot.jpg';
        alt = 'Robot humanoïde';
        className = "img-robot";
    } else if (element.id == 2) {
        img += 'homme-femme.jpeg';
        alt = 'Vous-même';
        className = "img-homme-femme";
    }
    else {
        img += 'autre.jpg';
        alt = 'Autre personne';
        className = "img-autre";
    }

    incarnationDiv.querySelector('img').src = img;
    incarnationDiv.querySelector('img').alt = alt;
    incarnationDiv.querySelector('img').classList.add(className);
    document.getElementById('incarnation').dataset.idIncarnation = element.id;
    document.getElementById('incarnation').querySelector('p').textContent = element.description;
    const dilemme = document.getElementById('dilemme');
    
    dilemme.classList.add('collapse');
    incarnationDiv.style = '';
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
    const id_incarnation = document.getElementById('incarnation').dataset.idIncarnation;
    const time = getAnswerTime();
    Listchoix.forEach(choixElement => {
        if (choixElement.checked) {
            const choix = choixElement.value;
            choixtab.push({time, id_incarnation, id_dilemme_defaut, choix});
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
        const id = dilemmesId[(count%countDilemme)];

        const response = await fetch('/dilemme_defaut/' + id);
        const data = await response.json();

        const dilemme = document.getElementById('dilemme');

        // Set dataset attributes for dilemme element
        dilemme.dataset.idDefaut = data.id;
        
        // Replace dilemme description with new dilemme description
        dilemme.querySelector('p').textContent = data.description;

        dilemme.firstElementChild.textContent = 'Dilemme n°'+ (count+1) +'/'+ countMax;

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
    const pays = document.getElementById('pays').value;
    const education = document.getElementById('education').value;
    const information = document.getElementById('information').value;
    const commentaire = document.getElementById('commentaire').value;
    
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({age, sexe, ville, pays, education, information, commentaire}),
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
    const content = document.getElementById('incarnation');
    content.firstElementChild.classList.add('hide-title');
    content.firstElementChild.addEventListener('transitionend', () => {
        console.log('transitionend');
        content.firstElementChild.classList.add('collapse');
    });
    content.style.margin = '2rem 0 0 0';
    content.querySelector('p').style.marginTop = '15px';
    content.querySelector('div').style.padding = '5px';
}
