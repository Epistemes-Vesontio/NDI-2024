//This file contain functions that can use in all pages

document.addEventListener('DOMContentLoaded', () => {

    const createSnowflake = (character = '*', speed = 5) => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerText = character;
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
        document.body.appendChild(snowflake);
    
        const animationDuration = Math.random() * speed + speed;
        snowflake.style.animationDuration = animationDuration + 's';
    
        setTimeout(() => {
            snowflake.remove();
        }, animationDuration * 1000);
    }

    /* ECLAIR
    setInterval(() => {
        createSnowflake('Bim!  BAM! éclaireheh!', 0.05);
    }, 2000);
    */
    /* NEIGE
    setInterval( () => {
        createSnowflake();
    }, 300);
    */
    /* PLUIE
    setInterval(() => {
        createSnowflake('-', 0.5);
    }, 10);
    */
    /* IL MEULE ET CA GUAUGE
    setInterval(() => {
        createSnowflake('o', 0.5);
    }, 1);
    */

    if(localStorage.getItem('theme') === 'snow'){
        setInterval(() => {
            createSnowflake('O', 0.5);
        }, 300);
    }

    if (localStorage.getItem('theme') === 'storm') {
        setInterval(() => {
            createSnowflake('-', 0.5);
        }, 10);
    }

    if (localStorage.getItem('theme') === 'rain') {
        setInterval(() => {
            createSnowflake('|', 0.5);
        }, 1);
    }

    if (localStorage.getItem('theme') === null) {
        setInterval(() => {
            createSnowflake();
        }, 300);
    }
    


    const showPopup = (message) => {
        const popup = document.createElement('div');
        popup.className = 'theme-popup';
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add('fade-out');
            popup.addEventListener('transitionend', () => popup.remove());
        }, 2000);
    };


    function getTranslation(key, placeholders = {}) {
        const locale = document.documentElement.lang || 'en';
        const translationsKey = 'translations_' + locale;
    
        const translations = JSON.parse(localStorage.getItem(translationsKey)) || {};
    
        let translation = translations[key] || key;
    
        Object.keys(placeholders).forEach((placeholder) => {
            const regex = new RegExp(`%${placeholder}%`, 'g');
            translation = translation.replace(regex, placeholders[placeholder]);
        });
    
        return translation;
    }
    

    window.getTranslation = getTranslation
    window.showPopup = showPopup;
    window.createSnowflake = createSnowflake;
    
});
