class ProfileGalery extends User {
  constructor (userID){
    super(userID);
  }
  userGalery(){
    let addUserGalery = document.getElementById('main__leftBlock');
    addUserGalery.innerHTML +=this.renderUserGaleryString;
  }
  get renderUserGaleryString() {
    let stringUserGalery=`<div  id="main__userGalery" class="main__photoGalery profile__block" onclick="getBigGalery(${this.id}, 1);">`;
    if (this.galeryCount>=4) {
      for (let i=1; i<=4; i++) {
          stringUserGalery=stringUserGalery+` <img src="img/user${this.id}/galery/${i}.jpg" alt="Фото ${i}"  class="photoGalery__photo">`;
      }
    } else if (this.galeryCount==0) {
      stringUserGalery+= `<img src="img/nophoto.jpg" alt="Нет фотографий"  class="photoGalery__photo">`
    } else {
      for (let i=1; i<=this.galeryCount; i++) {
        stringUserGalery=stringUserGalery+` <img src="img/user${this.id}/galery/${i}.jpg" alt="Фото ${i}"  class="photoGalery__photo">`;
      }
    }
    stringUserGalery=stringUserGalery+"</div>";
    return stringUserGalery;
  }
}

function getGalery(userID){
  let forEverything = new ProfileGalery(userID);
  forEverything.userGalery();
}
