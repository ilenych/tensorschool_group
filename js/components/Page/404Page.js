define([
    'Base/Component',
    'css!Page/css/404Page.css'
], function (Component) {
    'use strict';

    class Page extends Component {

        constructor(options) {
            super(options);
            this.state.id = options.id;
        }

        render() {
            return `<div class="page404">
                        <div class="page404__module">
                            <h1 class="page404__title">404</h1>
                            <h2 class="page404__text">Страница не найдена!</h2>
                            <a href="${location.pathname}">Вернуться на домашнюю страницу</a>
                        </div>
                    </div>`;
        }
    }

    return Page;
});
