'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        Comp: 'components',
        Base: 'components/Base',
        Page: 'components/Page',
        Wall: 'components/Ilenko/wall', // Иленко Алексей
        CreatePost: 'components/Ilenko/CreatePost', // Иленко Алексей
        Gallery: 'components/Ilenko/Gallery', // Иленко Алексей
        Modul2: 'components/Timofeev/Modul2', // Тимофеев Павел
        ProfilePic: 'components/Tugaeva/profilepic', // Тугаева Динара
        Messages: 'components/Tugaeva/messages', // Тугаева Динара
        Header: 'components/Saitov/header', // Саитов Роман
        Modul5: 'components/Sagitdinov/Modul5', // Сагитдинов Руслан
        ProfileInfo: 'components/Alsynbaev/profileInfo', // Алсынбаев Фанис

        css: 'lib/require.css.min'
    }
});

/**
 * Абстрактная фабрика для создания контролов
 */
class AbstractFactory {
    create(component, options) {
        return new component(options || {});
    }
}

const factory = new AbstractFactory();

requirejs(['app/main']);

