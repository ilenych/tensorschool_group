define(["Base/Model", "components/Ilenko/Service/NetworkService"], function (
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
        if(this.options.object == "gallery") {
          return NetworkService.getDataGallery(id).then((result) => {
            return this.toModel(result);
          });
        }

        if(this.options.object == "wall") {
          return NetworkService.fetchData(id).then((result) => {
            return this.toModel(result);
          });
        }
      }
    }
  
    return DataSet;
  });