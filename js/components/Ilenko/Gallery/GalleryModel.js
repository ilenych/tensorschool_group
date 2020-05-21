define(["Base/Model"], function (Model) {
  class GalleryModel extends Model {

   getContent() {
      return this.gallery[0]//TODO: зависимость от пользователя
    }
  }

  return GalleryModel;
});
