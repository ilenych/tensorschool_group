// объявляем новый зависимый от основного класс для формирование галереи пользователя (большой)
// через параметры опции передаем в него номер страницы галереи (galeryPageNumder)
// по сути, всегда будет передаваться 1, внутри самой галереи переход на другие страницы автоматом заполняет
class Galery extends User {
  constructor (userID, options){
    super(userID);
    this.galeryPageNumder=options;
    // количество фотографий на одной страницы галереи
    this.numberPhotoOnPage=12;
    // самое большое количество страниц
    this.pageCount=Math.ceil(this.galeryCount/this.numberPhotoOnPage);
  }
  // метод отрисовки галереии в левом-главном блоке пользователя
  userGalery(){
    let addGalery = document.getElementById('main__leftBlock');
    addGalery.innerHTML =this.renderUserGaleryString;
  }
  // геттер сформированного HTML-кода блока галереи
  get renderUserGaleryString() {
    //заполнение DOM блоками: шапка галереи(в ней кнопка возврата и заголовок
    //с именем пользователя, чья галерея) и открывается блок таблицы 3*х для размещения фоторграфий
    let stringUserGalery=`<div class="bigGalery__header" >
                          <p class="bigGalery__headerBack" onclick="getData(${this.id}, 'brief');">...вернуться к профилю</p>
                          <p class="bigGalery__headerCaption" onclick="">Галерея пользователя ${this.surname} ${this.name[0]}. ${this.patronymic[0]}.</p>
                          </div><div  class="bigGalery">`;
    // высчитываем нулевой номер фотографии на страницы(последний предыдущей страницы)
    let ziroPhotoNumber=(this.galeryPageNumder-1)*this.numberPhotoOnPage;
    // подсчитываем остаток фотографий начиная с текущей страницы
    let thisPageCount=this.galeryCount-ziroPhotoNumber;
    // если количество фотографий больше максимального на одной странице, присваиваем данной странице
    // максимальное число фотографий иначе присваиваем остаток фотографий
    thisPageCount>=this.numberPhotoOnPage ? thisPageCount = this.numberPhotoOnPage : thisPageCount =thisPageCount;
    //цикл формирования сетки картинок для данной страницы
      for (let i=ziroPhotoNumber+1; i<=ziroPhotoNumber+thisPageCount; i++) {
        //console.log(i);
        stringUserGalery+=`<img src="img/user${this.id}/galery/${i}.jpg" alt="Фото ${i}" class="bigGalery__photo" onclick="getFullPhoto(${this.id}, 'galery/${i}')">`;
      }
    // оборачиваем всю полученную строку в блок галереи (с параметрами общего стиля главных блоков профиля)
    // закрываем блок таблицы картинок
    stringUserGalery= `<div  id="main__userGalery" class="profile__block">${stringUserGalery}</div>
                      ${renderScrollPages('getBigGalery', this.galeryPageNumder, this.pageCount, this.id)} </div>`;
    return stringUserGalery;
  }
}

function getBigGalery(userID, options){
  let forEverything = new Galery(userID, options);
  forEverything.userGalery();
}
