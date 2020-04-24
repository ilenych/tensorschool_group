'use strict';

requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        Comp: 'components',
        Base: 'components/Base',
        Page: 'components/Page',
        Post: 'components/Ilenko/post', // Иленко Алексей
        Modul2: 'components/Timofeev/Modul2', // Тимофеев Павел
        ProfilePic: 'components/Tugaeva/profilepic', // Тугаева Динара
        Messages: 'components/Tugaeva/messages', // Тугаева Динара
        Modul4: 'components/Saitov/Modul4', // Саитов Роман
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

