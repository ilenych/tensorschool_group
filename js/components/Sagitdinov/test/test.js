requirejs.config({
    baseUrl: '../',
    paths: {
        // плагины для require
        text: 'lib/requirejs/text',
        css: 'lib/requirejs/native-css',

        // пути проекта для удобства подключения зависимостей
        Other: 'views/other',
        Photo: 'views/photo'
    }
});

class fakeComp{
  constructor(userID){
    this.id=1001;
  }
}

['Other/model'].forEach((mod) => {
  define(mod, function () {
    return fakeComp;
  });
});


describe('Component photo', function () {
  describe('galery', function () {
    var userGalery;
    before(function(done) {
      requirejs(['Photo/galery'], function (Galery) {
        userGalery=Galery;
        done();

      });
    });
    let vars =[
      {
        count: 0,
        res:`<div  id="main__userGalery" class="main__photoGalery profile__block" onclick="getBigGalery(1001, 1);"><img src="img/nophoto.jpg" alt="Нет фотографий"  class="photoGalery__photo"></div>`
      },
      {
        count: 1,
        res:`<div  id="main__userGalery" class="main__photoGalery profile__block" onclick="getBigGalery(1001, 1);"><img src="img/user1001/galery/1.jpg" alt="Фото 1"  class="photoGalery__photo"></div>`
      },
      {
        count:4,
        res:`<div  id="main__userGalery" class="main__photoGalery profile__block" onclick="getBigGalery(1001, 1);"><img src="img/user1001/galery/1.jpg" alt="Фото 1"  class="photoGalery__photo"><img src="img/user1001/galery/2.jpg" alt="Фото 2"  class="photoGalery__photo"><img src="img/user1001/galery/3.jpg" alt="Фото 3"  class="photoGalery__photo"><img src="img/user1001/galery/4.jpg" alt="Фото 4"  class="photoGalery__photo"></div>`
      },
      {
        count:10,
        res:`<div  id="main__userGalery" class="main__photoGalery profile__block" onclick="getBigGalery(1001, 1);"><img src="img/user1001/galery/1.jpg" alt="Фото 1"  class="photoGalery__photo"><img src="img/user1001/galery/2.jpg" alt="Фото 2"  class="photoGalery__photo"><img src="img/user1001/galery/3.jpg" alt="Фото 3"  class="photoGalery__photo"><img src="img/user1001/galery/4.jpg" alt="Фото 4"  class="photoGalery__photo"></div>`
      }
    ];
    vars.forEach((tests) => {
      it(`renderStringUserGalery проверяем правильность формирования галереи с ${tests.count} карточками`, function () {
        let galery = new userGalery({});
        galery.galeryCount=tests.count;
        let result = galery.renderUserGaleryString;
        assert.equal(result, tests.res)
      });
    });
  });
  describe('scrollPages', function () {

    let vars =[
      {
        count: 1,
        pageNum: 1,
        res:`<div class="scrollPages"><p class="scrollPages_caption">Выберите страницу: </p><div class="scrollPages_number" onclick="getBigGalery(1001,1);">1</div></div>`
      },
      {
        count: 5,
        pageNum: 4,
        res:`<div class="scrollPages"><p class="scrollPages_caption">Выберите страницу: </p><div class="scrollPages_number" onclick="getBigGalery(1001,1);">1</div><div class="scrollPages_number" onclick="getBigGalery(1001,2);">2</div><div class="scrollPages_number" onclick="getBigGalery(1001,3);">3</div><div class="scrollPages_number" onclick="getBigGalery(1001,4);">4</div><div class="scrollPages_number" onclick="getBigGalery(1001,5);">5</div></div>`
      },
      {
        count:8,
        pageNum:2,
        res:`<div class="scrollPages"><p class="scrollPages_caption">Выберите страницу: </p><div class="scrollPages_number" onclick="getBigGalery(1001,1);">1</div><div class="scrollPages_number" onclick="getBigGalery(1001,2);">2</div><div class="scrollPages_number" onclick="getBigGalery(1001,3);">3</div><div class="scrollPages_ellipsis">...</div><div class="scrollPages_number" onclick="getBigGalery(1001,8);">8</div></div>`
      },
      {
        count:100,
        pageNum: 50,
        res:`<div class="scrollPages"><p class="scrollPages_caption">Выберите страницу: </p><div class="scrollPages_number" onclick="getBigGalery(1001,1);">1</div><div class="scrollPages_ellipsis">...</div><div class="scrollPages_number" onclick="getBigGalery(1001,49);">49</div><div class="scrollPages_number" onclick="getBigGalery(1001,50);">50</div><div class="scrollPages_number" onclick="getBigGalery(1001,51);">51</div><div class="scrollPages_ellipsis">...</div><div class="scrollPages_number" onclick="getBigGalery(1001,100);">100</div></div>`
      }
    ]
    vars.forEach((tests) => {
      var scrollPages;
      before(function(done) {
        requirejs(['Photo/scrollPages'], function (renderScrollPages) {
          scrollPages=renderScrollPages('getBigGalery', tests.pageNum, tests.count, 1001);
          done();
        });
      });
      it(`renderScrollPages проверяем правильность формирования страниц галереи из ${tests.count} страниц`, function () {
        assert.equal(scrollPages, tests.res);
      });
    });
  });
});
