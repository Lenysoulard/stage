const number = document.querySelector('h5 + p');
if (number){
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

    fetch('/users/sexe')
    .then(response => response.json())
    .then(data => {
        const value = Object.entries(data);
        const transformedValue = value.map(([key, value]) => {
            console.log(key);
            if (key === 'maleCount') {
                console.log('Homme');
                key = 'Homme';
            } else if (key === 'femaleCount') {
                key = 'Femme';
            } else if (key === 'otherCount') {
                key = 'Autre';
            } else if (key === 'noneCount') {
                key = 'Non spécifié';
            }
            return [key, value];
        });
        const values = [
            [ 'Sexe','Nombre de personnes'],
             ...transformedValue
        ];
        piechart('piechart', values );
    }).catch(err => {
        console.error(err);
    });

    fetch('/users/age')
    .then(response => response.json())
    .then(data => {
        const values = [
            ['Age', 'Nombre de personnes'],
            ['10-20', data[0]],
            ['20-30', data[1]],
            ['30-40', data[2]],
            ['40-50', data[3]],
            ['50-60', data[4]],
            ['60-70', data[5]],
            ['70-80', data[6]],
            ['80-90', data[7]],
            ['90+', data[8]]
        ];
        piechart('piechartage', values);
    }).catch(err => {
        console.error(err);
    });


    
    
}

function piechart(divId, values){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => drawChart(divId, values));

    
}

function drawChart(divId, values) {
        
    const data = google.visualization.arrayToDataTable(values);

    const options = {
        'title':'Répartion du sexe des personnes ayant répondu aux dilemmes',
        'titleTextStyle': {color: 'white', fontSize: 15, bold: true, italic: false},
        'legend': {position: 'right', textStyle: {color: 'white', fontSize: 12}},
        'width':550,
        'height':400,
        'backgroundColor': 'transparent',
        'pieHole': 0.5,
    };

    const chart = new google.visualization.PieChart(document.getElementById(divId));

    chart.draw(data, options);
}