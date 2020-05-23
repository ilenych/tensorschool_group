define(["Base/Model"], function (Model) {
  class GalleryModel extends Model {
    getContent() {
      //Проверка на пустого json
      if(JSON.stringify(this) === JSON.stringify({})){
        return  { gallery: [] }
      }else {
        return this
      }
    }
  }
  return GalleryModel;
});
