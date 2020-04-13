class FullPhoto extends User {
  constructor (userID, options){
    super(userID);
    this.options=options;
  }

  fullPhotoShow(){
   let forEverything = document.getElementById('freeBlock');
   forEverything.innerHTML += this.renderFullPhotoString;
  }

  fullPhotoDrop(){
    let forEverything = document.getElementById('freeBlock');
    forEverything.innerHTML = ``;
  }
  get renderFullPhotoString(){
    return `<div class="fullPhotoShadow" onclick="dropFullPhoto(${this.id});">
            <div class="fullPhotoBox">
            <img src="img/user${this.id}/${this.options}.jpg" alt="Аватар пользователя ${this.surname} ${this.name[0]} ${this.patronymic[0]}" onclick="dropFullPhoto(${this.id});" class="fullPhoto">
            </div></div>`;
  }
}

function getFullPhoto(userID, options){
  let forEverything = new FullPhoto(userID, options);
  forEverything.fullPhotoShow();
}

function dropFullPhoto(userID){
  let forEverything = new FullPhoto(userID);
  forEverything.fullPhotoDrop();
}
