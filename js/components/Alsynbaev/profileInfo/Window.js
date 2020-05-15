define([
    'Base/Component',
    'css!ProfileInfo/css/Window.css'
], function (Component) {
    'use strict';

    class Window extends Component {

        constructor({ title, content }) {
            super();
            this.setState({ title, content });
        }

        afterMount() {
            //подписываемя на клик по крестику
            this.subscribeTo(this.getContainer().querySelector(".window__close"), 'click', this.closeWindow.bind(this));
            // подписываемя на клик по окужающей области
            this.subscribeTo(this.getContainer().querySelector(".shadow"), 'click', this.closeWindow.bind(this));
        }

        // закрыть окно
        closeWindow() {
            //размонитруем окно
            this.unmount();
        }

        render(options, { title, content }) {
            return `<div>
            <div class="module window">
                <a class="window__close">×</a>
                <div class="window__title">${title}</div>
                <div class="window__content">${content}</div>
                </div>
                <div class="shadow"></div>
            </div>`;
        }
    }

    return Window;
});
