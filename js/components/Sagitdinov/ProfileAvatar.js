define(['./FullPhoto', 'Base/Model',  'css!Photo/css/style_photo.css'], function (fullPhoto, Model) { 
  // объявляем новый зависимый от основного класс для формирование галереи пользователя (большой)
  class ProfileAvatar extends User {
    constructor (userID){
      super(userID);
    }
    // метод отрисовки аватарки в правом, заранее сформированным блоке
    // можно создатьи сам блок, но необходимо изменить отрисоку для перехода в профиль другого пользователя
    profileAvatar(){
      let addUserGalery = document.getElementById('main__userAvatar');
      addUserGalery.innerHTML =this.renderProfileAvatarString;
    }
    // геттер сформированного HTML-кода ДЛЯ РАЗМЕЩЕНИЯ В БЛОКЕ!!!
    get renderProfileAvatarString(){
       let profileAvatarString='<div  id="main__userAvatar" class="main__profileAvatar profile__block">';
      if (this.avatar==true){
        //если аватар у пользователя установлен
        return `<img src="img/user${this.id}/avatar.jpg" alt="Аватар пользователя" onclick="getFullPhoto(${this.id}, 'avatar')" class="userAvatarImg">
                <img src="img/change.png" alt="Изменить фото" onclick="" class="userAvatarImgInstruments userAvatarImgInstruments_left">
                <img src="img/trash.png" alt="Удалить фото" onclick="dropPhoto(${this.id});" class="userAvatarImgInstruments userAvatarImgInstruments_right"></div>`;
      } else {
        // если аватар у пользователя не установлен
        return `<img src="img/nophoto.jpg" alt="Фотографии нет!" onclick="" class="userAvatarImg">
                <img src="img/change.png" alt="Удалить фото" onclick="" class="userAvatarImgInstruments"></div>`;
      }
    }
  }

  // функция получения пользовательского аватара
  function getProfileAvatar(userID){
    let forEverything = new ProfileAvatar(userID);
    forEverything.profileAvatar();
  }

  // функция удаления пользовательского аватара (удаляется у любого пользователя)
  // права доступа не разграничены, заного настраиваем отображения 
  function dropPhoto(userID){
    let forEverything = new ProfileAvatar(userID);
    userBase[forEverything.id].avatar=false;
    forEverything.avatar=false;
    forEverything.profileAvatar();
  }
  return ProfileAvatar;
});
