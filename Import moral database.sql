-- INSERT dilemmes_defaut
INSERT INTO dilemmes_defaut (description, choix_1, choix_2) VALUES (
    'Vous rencontrez une personne dont vous apprenez qu''elle conduit tous les jours sans permis dû à un retrait de permis.',
    'Vous dénoncez cette personne car cela est illégal',
    'Vous ne dénoncez pas cette personne, car cela ne vous concerne pas'
);

INSERT INTO dilemmes_defaut (description, choix_1, choix_2) VALUES (
    'Vous marchez dans la rue et vous apercevez un billet de 50 € tomber de la poche d''une personne.',
    'Vous ramassez le billet et le rendez à la personne',
    'Vous ramassez le billet et le gardez pour vous'
);

INSERT INTO dilemmes_defaut (description, choix_1, choix_2) VALUES (
    'Un collègue de bureau prend régulièrement divers objets qu''il ramène chez lui (informatique, papeterie, …).',
    'Vous le dénoncez à la direction de l''entreprise',
    'Vous ne dites rien, car cela ne vous concerne pas'
);

INSERT INTO dilemmes_defaut (description, choix_1, choix_2) VALUES (
    'Vous êtes en voiture et vous apercevez un accident et vous êtes le seul témoin.',
    'Vous vous arrêtez pour aider les victimes',
    'Vous ne vous arrêtez pas car cela ne vous concerne pas'
);

INSERT INTO dilemmes_defaut (description, choix_1, choix_2) VALUES (
    'Vous apprenez que votre entreprise ne respecte pas les lois concernant la protection de l''environnement.',
    'Vous dénoncez votre entreprise et risquez de perdre votre travail',
    'Vous ne dites rien pour conserver votre emploi'
);

INSERT INTO dilemmes_defaut (description, choix_1, choix_2) VALUES (
    'Vous êtes chez un marchand de glaces et vous remarquez qu''il n''y a plus qu''une glace du goût que vous voulez. Vous entendez derrière vous une personne qui compte lui aussi prendre la même glace que vous.',
    'Vous changez de type de glace pour laisser la dernière à l''autre personne',
    'Vous prenez la dernière glace quand même'
);

-- INSERT contexte

INSERT INTO contexte (description) VALUES (
    'La personne est obligée de prendre sa voiture pour emmener ses enfants à l''école et aller travailler.'
);

INSERT INTO contexte (description) VALUES (
    'La personne est âgée'
);

INSERT INTO contexte (description) VALUES (
    'La personne est le seul médecin des environs (vous êtes en campagne)'
);

INSERT INTO contexte (description) VALUES (
    'La personne est une personne connue'
);

INSERT INTO contexte (description) VALUES (
    'La personne est un collègue qui ne vous apprécie pas'
);

INSERT INTO contexte (description) VALUES (
    'Vous avez un rendez-vous et vous êtes en retard'
);

INSERT INTO contexte (description) VALUES (
    'Vous avez de bonnes compétences en secourisme'
);

INSERT INTO contexte (description) VALUES (
    'Vous arrêtez pourrait vous mettre en danger au vu de la situation'
);

INSERT INTO contexte (description) VALUES (
    'Vous habitez à l''étranger et vous avez un visa de travail assez strict'
);

INSERT INTO contexte (description) VALUES (
    'La personne est un enfant'
);

INSERT INTO contexte (description) VALUES (
    'La personne est un touriste étranger'
);

INSERT INTO contexte (description) VALUES (
    'La personne derrière vous est handicapé'
);

