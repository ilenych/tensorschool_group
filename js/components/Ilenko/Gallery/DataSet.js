define(["Base/Model", "Gallery/NetworkService"], function (
  Model,
  NetworkService
) {
  "use strict";
  class DataSet {
    constructor(options) {
      this.options = {
        ...{
          model: Model,
        },
        ...options,
      };
    }

    //возвращает модель
    toModel(result) {
      return new this.options.model(result);
    }

    //делает запрос на сервер и возвращает полученную модель
    read(id) {
      return NetworkService.fetchData(id).then((result) => {
        return this.toModel(result);
      });
    }
  }

  return DataSet;
});
