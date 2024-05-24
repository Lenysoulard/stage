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


const btn_close = document.querySelector('#sidebar-modif > div:first-child');

if (btn_close) {
    btn_close.addEventListener('click', () => {
        document.querySelectorAll('#sidebar-modif > *:not(:nth-child(2))').forEach((element) => {
            element.style.display = 'none';
            if (element.classList.contains('d-flex')) element.classList.remove('d-flex');
        });
        document.getElementById('sidebar-modif').style.width = '60px';
        document.getElementById('sidebar-modif').addEventListener('transitionend', () => {
            document.querySelector('#sidebar-modif > div:nth-child(2)').style.width = '25px';
        });
        document.querySelector('#sidebar-modif > div:nth-child(2)').classList.add('d-flex');
        document.querySelector('#sidebar-modif > div:nth-child(2)').classList.add('btn-open');
        document.querySelector('#sidebar-modif > div:nth-child(2)').classList.remove('collapse');
        
    });
}

const btn_open = document.querySelector('#sidebar-modif > div:nth-child(2)');

if (btn_open) {
    btn_open.addEventListener('click', () => {
        document.querySelectorAll('#sidebar-modif > *:not(:nth-child(2))').forEach((element) => {
            element.style.display = 'block';
        });
        document.getElementById('sidebar-modif').style.width = '15%';
        document.getElementById('sidebar-modif').addEventListener('transitionend', () => {
            document.querySelector('#sidebar-modif > div:nth-child(2)').style.width = '0';
        });
        document.querySelector('#sidebar-modif > div:nth-child(2)').classList.add('collapse');
        document.querySelector('#sidebar-modif > div:first-child').classList.add('d-flex');
        document.querySelector('#sidebar-modif > div:nth-child(2)').classList.remove('d-flex');
        document.querySelector('#sidebar-modif > div:nth-child(2)').classList.remove('btn-open');
    });
}

const btn_modif = document.querySelectorAll('.edit');

if (btn_modif.length > 0) {
    btn_modif.forEach((element) => {
        element.addEventListener('click', () => {
            const id = element.parentElement.parentElement.getAttribute('data-id');
            element.parentElement.previousElementSibling.previousElementSibling.classList.add('d-flex');
            element.parentElement.previousElementSibling.previousElementSibling.classList.remove('collapse');
            const textarea = element.parentElement.previousElementSibling.previousElementSibling.firstElementChild;
            textarea.classList.remove('collapse');
            textarea.style.height = (textarea.scrollHeight+10) + 'px';
            element.parentElement.previousElementSibling.classList.add('collapse');
            textarea.nextElementSibling.classList.remove('collapse');
            textarea.nextElementSibling.addEventListener('click', () => fetchEditDilemme(textarea, id, element),{ once: true })
            
        });
    });
}

function fetchEditDilemme(textarea, id, element){
    textarea.blur();
    fetch(`/dilemme_defaut/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({description: textarea.value}),
    }).then((response) => {
        if (response.ok) {
            textarea.classList.add('collapse');
            element.parentElement.previousElementSibling.classList.remove('collapse');
            element.parentElement.previousElementSibling.textContent = textarea.value;
            textarea.nextElementSibling.classList.add('collapse');
            element.parentElement.previousElementSibling.previousElementSibling.classList.remove('d-flex');
            element.parentElement.previousElementSibling.previousElementSibling.classList.add('collapse');
        }else {
            throw new Error('Erreur lors de la modification');
        }
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
}


const btn_delete = document.querySelectorAll('.delete');

if (btn_delete.length > 0) {
    btn_delete.forEach((element) => {
        element.addEventListener('click', () => {
            const clone = document.getElementById('template-delete-confirm').content.cloneNode(true).firstElementChild;
            element.closest('main').appendChild(clone);
            clone.querySelector('.btn-yes').addEventListener('click', () => {
                fetchDeleteDilemme(element, clone);
            });
            clone.querySelector('.btn-no').addEventListener('click', () => {
                clone.remove();
            });
        });
    });
}


function fetchDeleteDilemme(element, clone2){
    const id = element.parentElement.parentElement.getAttribute('data-id');
    fetch(`/dilemme_defaut/${id}`, {
        method: 'DELETE',
    }).then((response) => {
        if (response.ok) {
            element.parentElement.parentElement.remove();
            element.remove();
            clone2.remove();
        } else {
            throw new Error('Erreur lors de la suppression');
        }
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
}

const btn_add = document.querySelector('.add');

if (btn_add) {
    btn_add.addEventListener('click', () => {
        const cloneAdd = document.getElementById('template-add-form').content.cloneNode(true).firstElementChild;
        btn_add.parentElement.parentElement.appendChild(cloneAdd);
        cloneAdd.querySelector('.btn-yes').addEventListener('click', () => {
            const description = cloneAdd.querySelector('textarea').value;
            fetch('/dilemme_defaut', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({description}),
            })
            .then((response) => response.json())
            .then((data) => {  
                cloneAdd.remove();    
                const clone = document.getElementById('template-dilemme').content.cloneNode(true).firstElementChild;
                clone.setAttribute('data-id', data.id);
                console.log(data);
                clone.querySelector('.description').textContent = data.description;
                clone.querySelector('.edit').addEventListener('click', () => {
                    const id = clone.getAttribute('data-id');
                    clone.querySelector('.description').classList.add('d-flex');
                    clone.querySelector('.description').classList.remove('collapse');
                    const textarea = clone.querySelector('.description').firstElementChild;
                    textarea.classList.remove('collapse');
                    textarea.style.height = (textarea.scrollHeight+10) + 'px';
                    clone.querySelector('.description').nextElementSibling.classList.remove('collapse');
                    clone.querySelector('.description').nextElementSibling.addEventListener('click', () => fetchEditDilemme(textarea, id, clone.querySelector('.edit')), { once: true });
                    
                });  
                clone.querySelector('.delete').addEventListener('click', () => {
                    const cloneDelete = document.getElementById('template-delete-confirm').content.cloneNode(true).firstElementChild;
                    clone.closest('main').appendChild(cloneDelete);
                    cloneDelete.querySelector('.btn-yes').addEventListener('click', () => {
                        fetchDeleteDilemme(clone.querySelector('.delete'), cloneDelete);
                    });
                    cloneDelete.querySelector('.btn-no').addEventListener('click', () => {
                        cloneDelete.remove();
                    });
    
                });
                btn_add.parentElement.parentElement.insertAdjacentElement('beforeend', clone);
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
        cloneAdd.querySelector('.btn-no').addEventListener('click', () => {
                cloneAdd.remove();
        });
    });
}