document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const questionTitle = document.getElementById('question-title');
    const choicesContainer = document.getElementById('choices');
    const closePopup = document.getElementById('close-popup');
    const feedbackElement = document.createElement('div');
    feedbackElement.id = "feedback";
    popup.appendChild(feedbackElement);

    const indicators = {
        nivo: 100,
        ph: 100,
        poisson: 100,
        thermo: 100
    };

    const updateIndicators = () => {
        document.getElementById('nivo').textContent = indicators.nivo;
        document.getElementById('ph').textContent = indicators.ph;
        document.getElementById('poisson').textContent = indicators.poisson;
        document.getElementById('thermo').textContent = indicators.thermo;
    };
    const data = {
        "estomac": {
            "Questions": [
                {
                    "Name": "Les terriens veulent légaliser la surpêche. Quelle mesure souhaitez-vous prendre ?",
                    "Choix": [
                        {
                            "Name": "Lancer un programme de pisciculture durable",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 10 },
                                { "Cle": "ph", "Valeur": 8 }
                            ],
                            "Feedback": "Bonne décision ! La pisciculture durable réduit la pression sur les écosystèmes marins."
                        },
                        {
                            "Name": "Permettre la pêche sans réglementation",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -8 },
                                { "Cle": "ph", "Valeur": -10 }
                            ],
                            "Feedback": "Mauvaise décision ! Cela accélère l'épuisement des ressources marines."
                        }
                    ]
                },
                {
                    "Name": "Un pays souhaite subventionner des techniques de pêche non durables. Que proposez-vous ?",
                    "Choix": [
                        {
                            "Name": "Subventionner uniquement la pêche responsable",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 7 },
                                { "Cle": "thermo", "Valeur": 5 }
                            ],
                            "Feedback": "Très bon choix ! Cela encourage la transition vers des pratiques durables."
                        },
                        {
                            "Name": "Soutenir toutes les formes de pêche",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -12 },
                                { "Cle": "ph", "Valeur": -7 }
                            ],
                            "Feedback": "Dommage ! Cela détruit les habitats marins à long terme."
                        }
                    ]
                }
            ]
        },
        "poumon": {
            "Questions": [
                {
                    "Name": "Une grande usine veut déverser ses plastiques dans l'océan. Comment réagissez-vous ?",
                    "Choix": [
                        {
                            "Name": "Interdire strictement les rejets",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 10 },
                                { "Cle": "ph", "Valeur": 5 }
                            ],
                            "Feedback": "Excellent choix ! Réduire les plastiques protège la biodiversité."
                        },
                        {
                            "Name": "Autoriser les rejets pour stimuler l'économie",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -10 },
                                { "Cle": "ph", "Valeur": -8 }
                            ],
                            "Feedback": "Mauvais choix ! Ces rejets détruisent les récifs coralliens et nuisent aux écosystèmes."
                        }
                    ]
                },
                {
                    "Name": "Les déchets de plastique augmentent dans les océans. Quelle action prenez-vous ?",
                    "Choix": [
                        {
                            "Name": "Mettre en place un plan de nettoyage des plages",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 8 },
                                { "Cle": "thermo", "Valeur": 6 }
                            ],
                            "Feedback": "Bravo ! Nettoyer les plages limite l’impact des plastiques sur la faune."
                        },
                        {
                            "Name": "Ne pas intervenir",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -8 },
                                { "Cle": "thermo", "Valeur": -6 }
                            ],
                            "Feedback": "Mauvais choix ! Les plastiques continueront de polluer les océans."
                        }
                    ]
                }
            ]
        },
        "cerveau": {
            "Questions": [
                {
                    "Name": "Les océans se réchauffent dangereusement. Que faites-vous pour réduire ce phénomène ?",
                    "Choix": [
                        {
                            "Name": "Promouvoir les énergies renouvelables",
                            "Effects": [
                                { "Cle": "thermo", "Valeur": -8 },
                                { "Cle": "nivo", "Valeur": 6 }
                            ],
                            "Feedback": "Très bon choix ! Cela réduit les émissions de gaz à effet de serre."
                        },
                        {
                            "Name": "Ne rien changer aux pratiques actuelles",
                            "Effects": [
                                { "Cle": "thermo", "Valeur": 10 },
                                { "Cle": "nivo", "Valeur": -6 }
                            ],
                            "Feedback": "Mauvaise décision ! Cela accélère la montée des eaux."
                        }
                    ]
                }
            ]
        },
        "coeur": {
            "Questions": [
                {
                    "Name": "Les coraux blanchissent à cause de l’acidification. Quelle mesure prenez-vous ?",
                    "Choix": [
                        {
                            "Name": "Réduire les émissions de CO₂",
                            "Effects": [
                                { "Cle": "ph", "Valeur": 10 },
                                { "Cle": "poisson", "Valeur": 8 }
                            ],
                            "Feedback": "Excellent choix ! Cela protège les récifs coralliens et leur biodiversité."
                        },
                        {
                            "Name": "Ignorer le problème",
                            "Effects": [
                                { "Cle": "ph", "Valeur": -8 },
                                { "Cle": "poisson", "Valeur": -5 }
                            ],
                            "Feedback": "Mauvais choix ! Les récifs risquent de disparaître complètement."
                        }
                    ]
                }
            ]
        },
        "foie": {
            "Questions": [
                {
                    "Name": "Une marée noire menace une région. Que décidez-vous ?",
                    "Choix": [
                        {
                            "Name": "Mobiliser une réponse rapide pour limiter les dégâts",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 5 },
                                { "Cle": "thermo", "Valeur": 7 }
                            ],
                            "Feedback": "Bonne décision ! Cela réduit les dommages écologiques."
                        },
                        {
                            "Name": "Ne pas intervenir immédiatement",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -10 },
                                { "Cle": "thermo", "Valeur": -9 }
                            ],
                            "Feedback": "Dommage ! Les habitats marins sont gravement affectés."
                        }
                    ]
                }
            ]
        },
        "rein": {
            "Questions": [
                {
                    "Name": "Les métaux lourds s'accumulent dans les océans. Quelle solution proposez-vous ?",
                    "Choix": [
                        {
                            "Name": "Renforcer les réglementations industrielles",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 8 },
                                { "Cle": "ph", "Valeur": 6 }
                            ],
                            "Feedback": "Très bon choix ! Cela limite la pollution des écosystèmes marins."
                        },
                        {
                            "Name": "Ignorer la pollution",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -7 },
                                { "Cle": "ph", "Valeur": -6 }
                            ],
                            "Feedback": "Mauvais choix ! Les écosystèmes marins continueront de se dégrader."
                        }
                    ]
                }
            ]
        }
    };
    

    const applyEffects = (effects) => {
        effects.forEach(effect => {
            if (indicators.hasOwnProperty(effect.Cle)) {
                indicators[effect.Cle] += effect.Valeur;
                if (indicators[effect.Cle] > 100) indicators[effect.Cle] = 100;
                if (indicators[effect.Cle] < 0) indicators[effect.Cle] = 0;
            }
        });
        updateIndicators();
    };

    const openPopup = (organe) => {
        const organData = data[organe];
        if (organData && organData.Questions.length > 0) {
            const question = organData.Questions.shift(); // Supprime la question après affichage
            questionTitle.textContent = question.Name;
            choicesContainer.innerHTML = '';
            feedbackElement.textContent = ''; // Réinitialise le feedback

            let choiceClicked = false;
            closePopup.style.display = 'none'; // Cache le bouton "Fermer"

            question.Choix.forEach((choix) => {
                const button = document.createElement('button');
                button.textContent = choix.Name;

                button.addEventListener('click', () => {
                    if (!choiceClicked) {
                        applyEffects(choix.Effects);
                        feedbackElement.textContent = choix.Feedback;
                        choiceClicked = true;
                        closePopup.style.display = 'block'; // Affiche le bouton "Fermer"
                        // Désactiver tous les boutons
                        const allButtons = choicesContainer.querySelectorAll('button');
                        allButtons.forEach(btn => btn.disabled = true);
                    }
                });

                choicesContainer.appendChild(button);
            });

            popup.dataset.currentOrgane = organe; // Stocke l'organe actuellement ouvert
            popup.classList.remove('hidden');
            overlay.classList.add('active');
        } else {
            popup.dataset.currentOrgane = organe;
        }
    };

    const closePopupAction = () => {
        const currentOrgane = popup.dataset.currentOrgane; // Récupère l'organe actif
        if (currentOrgane && data[currentOrgane]?.Questions.length === 0) {
            const organeDiv = document.querySelector(`.question.${currentOrgane}`);
            if (organeDiv) {
                organeDiv.style.display = 'none'; // Masque l'organe
            }
        }
        popup.classList.add('hidden');
        overlay.classList.remove('active');
        popup.dataset.currentOrgane = ''; // Réinitialise l'organe actif
    };

    closePopup.addEventListener('click', () => {
        closePopupAction();
    });

    Object.keys(data).forEach(organe => {
        const div = document.querySelector(`.question.${organe}`);
        if (div) {
            div.addEventListener('click', () => {
                openPopup(organe);
            });
        }
    });

    updateIndicators();

    const questionDivs = Array.from(document.querySelectorAll('.question'));
    let currentIndex = 0;

    const playSequentialAnimation = () => {
        questionDivs.forEach(div => div.classList.remove('animate'));

        questionDivs[currentIndex].classList.add('animate');

        currentIndex = (currentIndex + 1) % questionDivs.length;
    };

    setInterval(playSequentialAnimation, 1400);
});
