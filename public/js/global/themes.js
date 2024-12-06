document.addEventListener('DOMContentLoaded', () => {
    
    const themes = ['light', 'dark', 'santa', 'clean', 'rain', 'cloudy', 'strom', 'snow'];
    let currentTheme = localStorage.getItem('theme') || themes[0];

    const applyTheme = (theme, bodyElement) => {
        if (bodyElement) {
            bodyElement.className = '';
            bodyElement.classList.add('theme-transition');
            bodyElement.classList.add(theme);
            
            setTimeout(() => {
                bodyElement.classList.remove('theme-transition');
            }, 1000);
        }
    };

    const changeTheme = () => {
        const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];

        applyTheme(nextTheme, document.body);

        const iframes = Array.from(document.querySelectorAll('iframe'));
        iframes.forEach(iframe => {
            try {
                const iframeBody = iframe.contentDocument?.body;
                applyTheme(nextTheme, iframeBody);
            } catch (error) {
                console.error('Impossible d\'accéder au contenu de l\'iframe : ', error);
            }
        });

        currentTheme = nextTheme;
        localStorage.setItem('theme', currentTheme);
        
    };

    applyTheme(currentTheme, document.body);

    const iframes = Array.from(document.querySelectorAll('iframe'));
    iframes.forEach(iframe => {
        iframe.addEventListener('load', () => {
            try {
                const iframeBody = iframe.contentDocument?.body;
                applyTheme(currentTheme, iframeBody);
            } catch (error) {
                console.error('Impossible d\'accéder au contenu de l\'iframe : ', error);
            }
        });
    });

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('snowflake')) {
            changeTheme();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'T' && event.shiftKey) {
            changeTheme();
        }
    });
});
