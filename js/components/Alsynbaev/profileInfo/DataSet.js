define([
    'Base/Model',
    'ProfileInfo/Requestor'
], function (Model, Requestor) {
    'use strict';
    class DataSet {
        constructor(options) {

            this.options = {
                ...{
                    model: Model
                },
                ...options
            }
        }

        toModel(result) {
            return new this.options.model(result);
        }

        read(id) {
            if (id == 'current')
                return Requestor.currentUser().then(response => response.json()).then(result => {
                    return this.toModel(result.data);
                });
            else
                return Requestor.readUser(id).then(response => response.json()).then(result => {
                    return this.toModel(result.data);
                });
        }
    }

    return DataSet;
});