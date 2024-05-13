const form = document.getElementById('form-modification');

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const temps_reponse = document.getElementsByName('temps_reponse')[0].checked;
        const bouton_couleur = document.getElementsByName('bouton_couleur')[0].checked;
        const reponse_ia = document.getElementsByName('reponse_IA')[0].checked;
        const data = {temps_reponse, bouton_couleur, reponse_ia};
        fetch('/admin/modifications', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data}),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erreur lors de la modification');
        }).then((data) => {
           const clone = document.getElementById('template-alert-success').content.cloneNode(true).firstElementChild;
           clone.querySelector('strong').textContent = data.message;
            document.body.querySelector('main').prepend(clone);
            setTimeout(() => {
                clone.style.opacity = 0;
                clone.addEventListener('transitionend', () => {
                    clone.remove();
                });
            }, 3000);
        }).catch((error) => {
            const clone = document.getElementById('template-alert-error').content.cloneNode(true).firstElementChild;
           clone.querySelector('strong').textContent = error.message;
            document.body.querySelector('main').prepend(clone);
            setTimeout(() => {
                clone.style.opacity = 0;
                clone.addEventListener('transitionend', () => {
                    clone.remove();
                });
            }, 3000);
        });
    });
}