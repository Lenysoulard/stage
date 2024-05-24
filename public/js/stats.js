const number = document.querySelector('h4 + p:not(#div-home p)');

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
        piechart('piechart', values, 'Répartion du sexe des personnes ayant répondu aux dilemmes', 80);
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
        piechart('piechartage', values, 'Répartition des âges des personnes ayant répondu aux dilemmes', 0);
    }).catch(err => {
        console.error(err);
    });


    
    
}

function piechart(divId, values, title, left){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(() => drawChart(divId, values, title, left));

    
}

function drawChart(divId, values, title, left) {
        
    const data = google.visualization.arrayToDataTable(values);

    const options = {
        'title': title,
        'titleTextStyle': {color: 'black', fontSize: 14, bold: true, italic: false},
        'legend': {position: 'right', textStyle: {color: 'black', fontSize: 12}},
        'width':390,
        'height':300,
        'backgroundColor': 'transparent',
        'pieHole': 0.5,
        'pieSliceTextStyle': {
            color: 'black',
          },
        'chartArea':{left: left,top: 60,width:'100%',height:'50%'}
    };

    const chart = new google.visualization.PieChart(document.getElementById(divId));

    chart.draw(data, options);
}