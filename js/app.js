'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        Comp: 'components',
        Base: 'components/Base',
        Page: 'components/Page',
        Wall: 'components/Ilenko/Wall', // Иленко Алексей
        CreatePost: 'components/Ilenko/CreatePost', // Иленко Алексей
        Gallery: 'components/Ilenko/Gallery', // Иленко Алексей
        PhotoInfo: 'components/Ilenko/PhotoInfo', // Иленко Алексей
        Modul2: 'components/Timofeev/Modul2', // Тимофеев Павел
        ProfilePic: 'components/Tugaeva/profilepic', // Тугаева Динара
        Messages: 'components/Tugaeva/messages', // Тугаева Динара
        Header: 'components/Saitov/header', // Саитов Роман
        Modul5: 'components/Sagitdinov/Modul5', // Сагитдинов Руслан
        Router: 'components/Base/Router',// Алсынбаев Фанис
        ProfileInfo: 'components/Alsynbaev/profileInfo', // Алсынбаев Фанис
        Friends: 'components/Alsynbaev/Friends', // Алсынбаев Фанис
        MessagesInfo: 'components/Alsynbaev/MessagesInfo', // Алсынбаев Фанис
        Adressee: 'components/Alsynbaev/Addressee', // Алсынбаев Фанис

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

