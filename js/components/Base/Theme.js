define([
], function () {

    class Theme {

        constructor() {
            this.curTheme = 0;

            this.themes = [{
                name: 'default',
                backgroundHeaderColor: '#4a76a8',
                backgroundHeaderSecondaryColor: '#224b7a',
                linkColor: '#4da3ff'
            },
            {
                name: 'violet',
                backgroundHeaderColor: '#924aa8',
                backgroundHeaderSecondaryColor: '#6b227a',
                linkColor: '#804aa8'
            },
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
    console.log(theme);
    return theme;
});