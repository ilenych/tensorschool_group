define(['Base/Component'], function (Component) {
    'use strict';

    class Header extends Component {
        render({ title, description }) {
            return `
            <header>
            <div class="header">
            
            </div>
            </header>`;
        }
    }

    return Header;
});
