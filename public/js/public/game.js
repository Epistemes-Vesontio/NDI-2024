document.addEventListener('DOMContentLoaded', () => {
    const introPopup = document.createElement('div');
    introPopup.id = "intro-popup";
    introPopup.classList.add('popup');
    introPopup.innerHTML = `
        <div class="popup-content">
            <h3>Bienvenue dans le jeu !</h3>
            <p>
                Ce jeu fait un parallèle entre les océans et le corps humain. Cliquez sur les organes pour répondre 
                à des questions qui influenceront l'équilibre environnemental. Prenez des décisions éclairées pour 
                sauver la planète !
            </p>
            <button id="start-intro">Commencer</button>
        </div>
    `;
    document.body.appendChild(introPopup);

    const startIntroButton = document.getElementById('start-intro');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const questionTitle = document.getElementById('question-title');
    const choicesContainer = document.getElementById('choices');
    const closePopup = document.getElementById('close-popup');
    const feedbackElement = document.createElement('div');
    feedbackElement.id = "feedback";
    popup.appendChild(feedbackElement);

    const endScreen = document.createElement('div');
    endScreen.id = "end-screen";
    endScreen.classList.add('hidden');
    document.body.appendChild(endScreen);

    const indicators = {
        nivo: 100,
        ph: 100,
        poisson: 100,
        thermo: 100
    };

    const updateIndicators = () => {
        const nivoReal = indicators.nivo === 100 ? 0 : ((100 - indicators.nivo) / 100) * 10;
        const phReal = indicators.ph === 100 ? 0 : -3 + (indicators.ph / 100) * 3;
        const thermoReal = indicators.thermo === 0 ? 5 : (100 - indicators.thermo) / 20;
        const poissonReal = indicators.poisson;

        document.getElementById('nivo').textContent = nivoReal.toFixed(1) + 'm';
        document.getElementById('ph').textContent = phReal.toFixed(1);
        document.getElementById('poisson').textContent = poissonReal + '%';
        document.getElementById('thermo').textContent = thermoReal.toFixed(1) + '°C';

        if (Object.values(indicators).some(value => value <= 0)) {
            showEndScreen();
        }
    };

    

    const showEndScreen = () => {
        popup.classList.add('hidden');
        overlay.classList.remove('active');
    
        const getImpactMessage = () => {
            let messages = [];

            if (indicators.nivo <= 20) {
                messages.push("La montée des eaux a submergé de nombreuses zones côtières, causant des migrations massives et la perte de biodiversité terrestre.");
            } else if (indicators.nivo >= 80) {
                messages.push("Le niveau des océans est stable, offrant des conditions favorables aux écosystèmes côtiers.");
            }

            if (indicators.ph <= 20) {
                messages.push("L'acidité des océans est critique, détruisant les récifs coralliens et menaçant les espèces marines dépendantes.");
            } else if (indicators.ph >= 80) {
                messages.push("L'acidité des océans est maîtrisée, permettant la régénération des récifs coralliens et des écosystèmes marins.");
            }

            if (indicators.poisson <= 20) {
                messages.push("La biodiversité marine s'est effondrée, mettant en danger la chaîne alimentaire et les communautés dépendantes de la pêche.");
            } else if (indicators.poisson >= 80) {
                messages.push("La biodiversité marine est florissante, garantissant un écosystème équilibré et résilient.");
            }

            if (indicators.thermo >= 80) {
                messages.push("La température des océans a considérablement augmenté, provoquant le blanchiment des coraux et des conditions hostiles pour de nombreuses espèces marines.");
            } else if (indicators.thermo <= 20) {
                messages.push("La température des océans est stable, limitant les effets néfastes du changement climatique sur la faune marine.");
            }

            return messages.join("<br>");
        };

        const nivoReal = indicators.nivo === 100 ? 0 : ((100 - indicators.nivo) / 100) * 10;
        const phReal = indicators.ph === 100 ? 0 : -3 + (indicators.ph / 100) * 3;
        const thermoReal = indicators.thermo === 0 ? 5 : (100 - indicators.thermo) / 20;

        const resultMessage = getImpactMessage();

        endScreen.innerHTML = `
            <h2>Résumé des indicateurs</h2>
            <p><strong>Niveau des océans monté de</strong> ${nivoReal.toFixed(1)} m</p>
            <p><strong>Acidité des océans :</strong> ${phReal.toFixed(1)}pH en moins</p>
            <p><strong>Biodiversité marine </strong> ${indicators.poisson}% restante</p>
            <p><strong>Température des océans </strong> +${thermoReal.toFixed(1)}°C</p>
            <h3>Impact environnemental :</h3>
            <p>${resultMessage}</p>
            <button id="restart-game">Recommencer</button>
        `;
        endScreen.classList.remove('hidden');

        document.body.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'restart-game') {
                location.reload();
            }
        });
    };
    
    startIntroButton.addEventListener('click', () => {
        introPopup.remove();
    });
    
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
                            "Feedback": "Bonne décision ! La pisciculture durable réduit la pression sur les écosystèmes marins. (ODD 14: Vie aquatique)"
                        },
                        {
                            "Name": "Permettre la pêche sans réglementation",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -8 },
                                { "Cle": "ph", "Valeur": -100 }
                            ],
                            "Feedback": "Mauvaise décision ! Cela accélère l'épuisement des ressources marines. (ODD 14: Vie aquatique)"
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
                            "Feedback": "Très bon choix ! Cela encourage la transition vers des pratiques durables. (ODD 12: Consommation et production responsables)"
                        },
                        {
                            "Name": "Soutenir toutes les formes de pêche",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -32 },
                                { "Cle": "ph", "Valeur": -20 }
                            ],
                            "Feedback": "Dommage ! Cela détruit les habitats marins à long terme. (ODD 14: Vie aquatique)"
                        }
                    ]
                },
                {
                    "Name": "De grandes quantités de plastique se retrouvent dans l'estomac des animaux marins. Comment y remédier ?",
                    "Choix": [
                        {
                            "Name": "Interdire les plastiques à usage unique",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 12 },
                                { "Cle": "ph", "Valeur": 5 }
                            ],
                            "Feedback": "Excellente décision ! Cela protège la faune marine et améliore la qualité de l'eau. (ODD 14: Vie aquatique)"
                        },
                        {
                            "Name": "Ignorer le problème",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -15 },
                                { "Cle": "ph", "Valeur": -10 }
                            ],
                            "Feedback": "Mauvais choix ! La pollution plastique continue de menacer les écosystèmes marins. (ODD 14: Vie aquatique)"
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
                            "Feedback": "Excellent choix ! Réduire les plastiques protège la biodiversité. (ODD 14: Vie aquatique)"
                        },
                        {
                            "Name": "Autoriser les rejets pour stimuler l'économie",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -30 },
                                { "Cle": "ph", "Valeur": -20 }
                            ],
                            "Feedback": "Mauvais choix ! Ces rejets détruisent les récifs coralliens et nuisent aux écosystèmes. (ODD 14: Vie aquatique)"
                        }
                    ]
                },
                {
                    "Name": "Les émissions de gaz à effet de serre augmentent, réduisant l'oxygène dissous dans l'eau. Quelle mesure adoptez-vous ?",
                    "Choix": [
                        {
                            "Name": "Encourager les énergies renouvelables",
                            "Effects": [
                                { "Cle": "thermo", "Valeur": -10 },
                                { "Cle": "poisson", "Valeur": 5 }
                            ],
                            "Feedback": "Excellente initiative ! Réduire les gaz à effet de serre protège les océans et améliore leur santé. (ODD 13: Lutte contre le changement climatique)"
                        },
                        {
                            "Name": "Continuer à utiliser des combustibles fossiles",
                            "Effects": [
                                { "Cle": "thermo", "Valeur": 20 },
                                { "Cle": "poisson", "Valeur": -10 }
                            ],
                            "Feedback": "Mauvais choix ! Cela aggrave la désoxygénation des océans et la perte de biodiversité. (ODD 13: Lutte contre le changement climatique)"
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
                                { "Cle": "poisson", "Valeur": -34 },
                                { "Cle": "thermo", "Valeur": -15 }
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
                                { "Cle": "thermo", "Valeur": -42 },
                                { "Cle": "nivo", "Valeur": 6 }
                            ],
                            "Feedback": "Très bon choix ! Cela réduit les émissions de gaz à effet de serre. (ODD 13: Lutte contre le changement climatique)"
                        },
                        {
                            "Name": "Ne rien changer aux pratiques actuelles",
                            "Effects": [
                                { "Cle": "thermo", "Valeur": 10 },
                                { "Cle": "nivo", "Valeur": -32 }
                            ],
                            "Feedback": "Mauvaise décision ! Cela accélère la montée des eaux. (ODD 13: Lutte contre le changement climatique)"
                        }
                    ]
                },
                {
                    "Name": "La pollution sonore des océans perturbe les espèces marines. Que proposez-vous ?",
                    "Choix": [
                        {
                            "Name": "Réguler les activités maritimes pour réduire le bruit",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": 8 },
                                { "Cle": "thermo", "Valeur": -2 }
                            ],
                            "Feedback": "Excellent choix ! Réduire la pollution sonore améliore la vie des espèces marines. (ODD 14: Vie aquatique)"
                        },
                        {
                            "Name": "Ne rien faire",
                            "Effects": [
                                { "Cle": "poisson", "Valeur": -10 },
                                { "Cle": "thermo", "Valeur": 5 }
                            ],
                            "Feedback": "Mauvais choix ! La pollution sonore continue de perturber les écosystèmes marins. (ODD 14: Vie aquatique)"
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
                                { "Cle": "ph", "Valeur": -24 },
                                { "Cle": "poisson", "Valeur": -13 }
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
                                { "Cle": "thermo", "Valeur": -30 }
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
                                { "Cle": "poisson", "Valeur": -42 },
                                { "Cle": "ph", "Valeur": -15 }
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
            const question = organData.Questions.shift();
            questionTitle.textContent = question.Name;
            choicesContainer.innerHTML = '';
            feedbackElement.textContent = '';

            let choiceClicked = false;
            closePopup.style.display = 'none';

            question.Choix.forEach((choix) => {
                const button = document.createElement('button');
                button.textContent = choix.Name;

                button.addEventListener('click', () => {
                    if (!choiceClicked) {
                        applyEffects(choix.Effects);
                        feedbackElement.textContent = choix.Feedback;
                        choiceClicked = true;
                        closePopup.style.display = 'block';

                        const allButtons = choicesContainer.querySelectorAll('button');
                        allButtons.forEach(btn => btn.disabled = true);
                    }
                });

                choicesContainer.appendChild(button);
            });

            popup.dataset.currentOrgane = organe;
            popup.classList.remove('hidden');
            overlay.classList.add('active');
        } else {
            popup.dataset.currentOrgane = organe;
        }
    };

    const closePopupAction = () => {
        const currentOrgane = popup.dataset.currentOrgane;
        if (currentOrgane && data[currentOrgane]?.Questions.length === 0) {
            const organeDiv = document.querySelector(`.question.${currentOrgane}`);
            if (organeDiv) {
                organeDiv.style.display = 'none';
            }
        }
        popup.classList.add('hidden');
        overlay.classList.remove('active');

        if (Object.values(data).every(org => org.Questions.length === 0)) {
            showEndScreen();
        }

        popup.dataset.currentOrgane = '';
    };

    closePopup.addEventListener('click', closePopupAction);

    Object.keys(data).forEach(organe => {
        const div = document.querySelector(`.question.${organe}`);
        if (div) {
            div.addEventListener('click', () => openPopup(organe));
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
