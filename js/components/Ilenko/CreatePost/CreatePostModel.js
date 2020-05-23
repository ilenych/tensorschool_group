define(["Base/Model"], function (Model) {
    class CreatePostModel extends Model {
      getContent() {
        return this.first_name + " " + this.last_name;
      }
    }
  
    return CreatePostModel;
  });
  