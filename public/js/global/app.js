//This file contain functions that can use in all pages

document.addEventListener('DOMContentLoaded', () => {

    const createSnowflake = () => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerText = '❄️';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

        document.body.appendChild(snowflake);

        const animationDuration = Math.random() * 5 + 5;
        snowflake.style.animationDuration = animationDuration + 's';

        setTimeout(() => {
            snowflake.remove();
        }, animationDuration * 1000);
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
