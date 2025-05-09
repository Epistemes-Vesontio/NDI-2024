document.addEventListener('DOMContentLoaded', () => {
    let index = 1;
    let indexDate = 3;
    let temperatureChartInstance = null;
    let precipitationChartInstance = null;
    let cloudCoverChartInstance = null;
    let windChartInstance = null;

    /**
     * Récupère la position de l'utilisateur en utilisant la géolocalisation du navigateur.
     * @returns {Promise} Une promesse qui résout avec les coordonnées de l'utilisateur ou rejette avec une erreur.
     */
    async function getUserLocation() {
        return { latitude: 47.25, longitude: 6.033333 };
    }

    /**
     * Récupère les données météorologiques en utilisant les coordonnées de l'utilisateur.
     */
    async function fetchWeatherData() {
        try {
            const coords = await getUserLocation();
            const { latitude, longitude } = coords;

            const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,uv_index_max&timezone=auto&past_days=3&forecast_days=3&models=meteofrance_seamless`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Erreur de réseau: ${response.status}`);
            }

            const data = await response.json();

            console.log ('Données météo:', data);

            localStorage.setItem('weather_data', JSON.stringify(data, null, 2));
            updateUI(data, coords);
        } catch (error) {
            console.error('Erreur lors de la récupération des données météo:', error);
        }

        // Mettre à jour les graphiques
        graphTemp();
        graphPrecipitation();
        graphCloudCover();
        graphWind();    

        // Cacher les graphiques sauf le premier
        const temperatureChart = document.getElementById('temperatureChart');
        const precipitationChart = document.getElementById('precipitationChart');
        const cloudCoverChart = document.getElementById('cloudCoverChart');
        const windChart = document.getElementById('windChart');

        // Fonction de la température, on affiche une image dans le div #icon-element
        const temperature = JSON.parse(localStorage.getItem('weather_data')).hourly.temperature_2m[0];
        const iconElement = document.getElementById('icon-element');
        if (temperature < 0) {
            iconElement.innerHTML = '<img src="/img/meteo/snowflake.svg" alt="snowflake">';
            // Changement du thème général dans le local storage
            localStorage.setItem('theme', 'snow');
        
        } else if (temperature < 10) {
            iconElement.innerHTML = '<img src="/img/meteo/cloud.svg" alt="cloud">';
            localStorage.setItem('theme', 'rain');
        } else if (temperature < 20) {
            iconElement.innerHTML = '<img src="/img/meteo/sun.svg" alt="sun">';
            localStorage.setItem('theme', 'clean');
        } else {
            iconElement.innerHTML = '<img src"/img/meteo/sun.svg" alt="sun">';
            localStorage.setItem('theme', 'clean');
        }
    }

    /**
     * Met à jour l'interface utilisateur avec les données météorologiques.
     * @param {Object} data - Les données météorologiques.
     * @param {Object} coords - Les coordonnées de l'utilisateur.
     */
    function updateUI(data, coords) {
        const dateBar = document.getElementById('date-bar');
        const temperature = document.getElementById('temperature');
        const geolocation = document.getElementById('geolocation');

        if(indexDate === 3){
            const currentDate = new Date().toLocaleDateString();
            dateBar.textContent = currentDate;
        }
        else{
            // Rendu : 06/12/2024
            // On Récupère la date pour avoir un JJ/MM/AAAA et pas AAAA-MM-JJ
            let otherdate = data.hourly.time[indexDate * 24].slice(0, 10);
            // On Met dans l'ordre JJ/MM/AAAA
            let date = otherdate.slice(8, 10) + '/' + otherdate.slice(5, 7) + '/' + otherdate.slice(0, 4);
            dateBar.textContent = date;
        }

        const currentTemperature = data.hourly.temperature_2m[indexDate];
        temperature.textContent = `${currentTemperature}°C`;

        geolocation.textContent = `Lat: ${Math.floor(coords.latitude)} Lon: ${Math.floor(coords.longitude)}`;
    }

    /**
     * Crée un graphique de température.
     */
    function graphTemp() {
        const data = JSON.parse(localStorage.getItem('weather_data'));
        const ctx = document.getElementById('temperatureChart').getContext('2d');

        if (temperatureChartInstance) {
            temperatureChartInstance.destroy();
        }

        temperatureChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.hourly.time.slice(indexDate * 24, (indexDate + 1) * 24).map(time => time.slice(11, 16)),
                datasets: [{
                    label: 'Température',
                    data: data.hourly.temperature_2m.slice(indexDate * 24, (indexDate + 1) * 24),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '°C'
                        }
                    }
                }
            }
        });
    }

    /**
     * Crée un graphique de précipitation.
     */
    function graphPrecipitation() {
        const data = JSON.parse(localStorage.getItem('weather_data'));
        const ctx = document.getElementById('precipitationChart').getContext('2d');

        if (precipitationChartInstance) {
            precipitationChartInstance.destroy();
        }

        precipitationChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.hourly.time.slice(indexDate * 24, (indexDate + 1) * 24).map(time => time.slice(11, 16)),
                datasets: [{
                    label: 'Précipitation',
                    data: data.hourly.precipitation.slice(indexDate * 24, (indexDate + 1) * 24),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'mm'
                        }
                    }
                }
            }
        });
    }

    /**
     * Crée un graphique de couverture nuageuse.
     */
    function graphCloudCover() {
        const data = JSON.parse(localStorage.getItem('weather_data'));
        const ctx = document.getElementById('cloudCoverChart').getContext('2d');

        if (cloudCoverChartInstance) {
            cloudCoverChartInstance.destroy();
        }

        cloudCoverChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.hourly.time.slice(indexDate * 24, (indexDate + 1) * 24).map(time => time.slice(11, 16)),
                datasets: [{
                    label: 'Couverture nuageuse',
                    data: data.hourly.cloud_cover.slice(indexDate * 24, (indexDate + 1) * 24),
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '%'
                        }
                    }
                }
            }
        });
    }

    /**
     * Crée un graphique de vitesse du vent.
     */
    function graphWind() {
        const data = JSON.parse(localStorage.getItem('weather_data'));
        const ctx = document.getElementById('windChart').getContext('2d');

        if (windChartInstance) {
            windChartInstance.destroy();
        }

        windChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.hourly.time.slice(indexDate * 24, (indexDate + 1) * 24).map(time => time.slice(11, 16)),
                datasets: [{
                    label: 'Vitesse du vent',
                    data: data.hourly.wind_speed_10m.slice(indexDate * 24, (indexDate + 1) * 24),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'km/h'
                        }
                    }
                }
            }
        });
    }

    /**
     * Gère les boutons pour changer de graphique.
     * @param {string} direction - La direction du bouton ('left' ou 'right').
     */
    function graphButton(direction) {

        if (direction === 'left') {
            index = (index === 1) ? 4 : index - 1;
        } else if (direction === 'right') {
            index = (index === 4) ? 1 : index + 1;
        }

        const temperatureChart = document.getElementById('temperatureChart');
        const precipitationChart = document.getElementById('precipitationChart');
        const cloudCoverChart = document.getElementById('cloudCoverChart');
        const windChart = document.getElementById('windChart');
    }

    /**
     * Gère les boutons pour changer de date.
     * @param {string} direction - La direction du bouton ('left' ou 'right').
     */
    function dateButton(direction) {
        graphButton('left');
        const data = JSON.parse(localStorage.getItem('weather_data'));
        const maxDays = Math.floor(data.hourly.time.length / 24);

        if (direction === 'left') {
            indexDate = (indexDate === 0) ? maxDays - 1 : indexDate - 1;
        } else if (direction === 'right') {
            indexDate = (indexDate === maxDays - 1) ? 0 : indexDate + 1;
        }

        const dateBar = document.getElementById('date-bar');
        dateBar.textContent = data.hourly.time[indexDate * 24].slice(0, 10);

        // Mettre à jour les graphiques
        graphTemp();
        graphPrecipitation();
        graphCloudCover();
        graphWind();

        updateUI(data, { latitude: 47.25, longitude: 6.033333 });
        graphButton('right');
    }

    const leftButtonDate = document.getElementById('left-button-date');
    const rightButtonDate = document.getElementById('right-button-date');

    leftButtonDate.addEventListener('click', () => {
        dateButton('left');
    });

    rightButtonDate.addEventListener('click', () => {
        dateButton('right');
    });

    // Récupérer les données météorologiques
    fetchWeatherData();

    // Gestion des boutons 
    const themeButtonSnow = document.getElementById('snow-theme');
    // Si on clique sur le bouton neige
    themeButtonSnow.addEventListener('click', () => {
        // On change le thème
        localStorage.setItem('theme', 'snow');

        // Rafraichir la page
        location.reload();

        // On change l'image
        const iconElement = document.getElementById('icon-element');
        iconElement.innerHTML = '<img src="/img/meteo/snowflake.svg" alt="snowflake">';
    });

    const themeButtonRain = document.getElementById('rain-theme');
    themeButtonRain.addEventListener('click', () => {
        // On change le thème
        localStorage.setItem('theme', 'rain');

        // Rafraichir la page
        location.reload();

        // On change l'image
        const iconElement = document.getElementById('icon-element');
        iconElement.innerHTML = '<img src="/img/meteo/cloud.svg" alt="cloud">';
    });

    const themeButtonClean = document.getElementById('sun-theme');
    themeButtonClean.addEventListener('click', () => {
        // On change le thème
        localStorage.setItem('theme', 'clean');

        // Rafraichir la page
        location.reload();

        // On change l'image
        const iconElement = document.getElementById('icon-element');
        iconElement.innerHTML = '<img src="/img/meteo/sun.svg" alt="sun">';
    });

    // Theme reset on affiche le theme par défaut
   const resetButton = document.getElementById('reset-theme');
    resetButton.addEventListener('click', () => {
         localStorage.setItem('theme', 'dark');
         location.reload();
    });
});
