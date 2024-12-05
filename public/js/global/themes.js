document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    const themes = ['light', 'dark', 'santa'];
    let currentTheme = localStorage.getItem('theme') || themes[0];

    body.classList.add(currentTheme);

    const changeTheme = () => {
        body.classList.add('theme-transition');

        const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];

        body.classList.replace(currentTheme, nextTheme);
        currentTheme = nextTheme;

        localStorage.setItem('theme', currentTheme);

        window.showPopup(window.getTranslation('front.theme_update')+': '+currentTheme);

        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 1000);
    };

    body.addEventListener('click', (event) => {
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
