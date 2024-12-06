document.addEventListener('DOMContentLoaded', () => {

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

            localStorage.setItem('weather_data', JSON.stringify(data, null, 2));
            console.log(localStorage.getItem('weather_data'));

            updateUI(data, coords);
        } catch (error) {
            console.error('Erreur lors de la récupération des données météo:', error);
        }
    }

    function updateUI(data, coords) {
        const dateBar = document.getElementById('date-bar');
        const temperature = document.getElementById('temperature');
        const geolocation = document.getElementById('geolocation');

        const currentDate = new Date().toLocaleDateString();
        dateBar.textContent = currentDate;

        const currentTemperature = data.hourly.temperature_2m[0];
        temperature.textContent = `${currentTemperature}°C`;

        geolocation.textContent = `Lat: ${Math.floor(coords.latitude)} Lon: ${Math.floor(coords.longitude)}`;

        // draw chart
    }

    fetchWeatherData();
    localStorage.clear();
});
