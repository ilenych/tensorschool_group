define(['Base/Component'], function (Component) {
    'use strict';

    class View extends Component {
        constructor(options) {
            super(options);
        }

        beforeMount() {
            if (this.options.dataSet) {
                this.loadData();
            }
        }

        loadData() {
            this.options.dataSet.read(this.options.id)
                .then(item => {
                    this.setItems(item);
                });
        }

        setItems(item) {
            this.setState({ item });
            this.update();
        }

        update() {
            super.update();
            this.unmountChildren();

            this.getContainer().innerHTML = '';

            const view = this.childrens.create(this.options.comp, { item: this.state.item });
            view.mount(this.getContainer());
        }

        render() {
            return `<div class="view">
                Загрузка...
            </div>`
        }
    }

    return View;
});