define([
], function () {

    class Theme {

        constructor() {
            this.curTheme = 0;

            this.themes = [{
                name: 'Стандартная (синяя)',
                backgroundHeaderColor: '#4a76a8',
                backgroundHeaderSecondaryColor: '#224b7a',
                linkColor: '#4da3ff'
            },
            {
                name: 'Фиолетовая',
                backgroundHeaderColor: '#924aa8',
                backgroundHeaderSecondaryColor: '#6b227a',
                linkColor: '#804aa8'
            },
            {
                name: 'Красная',
                backgroundHeaderColor: '#a84a4a',
                backgroundHeaderSecondaryColor: '#7a2222',
                linkColor: '#a84a4a'
            },
            {
                name: 'Зеленая',
                backgroundHeaderColor: '#4fa84a',
                backgroundHeaderSecondaryColor: '#3c7a22',
                linkColor: '#4aa857'
            }
            ];
        }

        changeTheme(index) {
            let root = document.documentElement;
            root.style.setProperty('--background-header-color', this.themes[index].backgroundHeaderColor);
            root.style.setProperty('--background-header-secondary-color', this.themes[index].backgroundHeaderSecondaryColor);
            root.style.setProperty('--link-color', this.themes[index].linkColor);
        }
    }

    const theme = new Theme();
    return theme;
});