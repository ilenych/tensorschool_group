define(function () {
    /**
     * Компоновщик — это структурный паттерн проектирования, который позволяет сгруппировать множество объектов в древовидную структуру, 
     * а затем работать с ней так, как будто это единичный объект.
     * https://refactoring.guru/ru/design-patterns/composite
     */
    class Composite {
        constructor(options) {
            options = options || {};
            this.childrens = {}
            this.parent = options.parent;
        }

        create(childControl, options) {
            // Создать и добавить компонент в список дочерних.
            options = (options || {})
            options.parent = this.parent;
            const child = factory.create(childControl, options);
            return this.add(child);
        }

        add(child) {
            // Добавить компонент в список дочерних.
            this.childrens[child.id] = child;
            return child;
        }

        remove(id) {
            // Убрать компонент из списка дочерних.
            delete this.childrens[id];
        }

        get(id) {
            /// получить компонент
            let child = this.childrens[id];
            return child;
        }
    }

    return Composite;
});