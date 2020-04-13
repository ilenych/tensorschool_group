// используется в bigGalery, строит блоки для перемещения по страницам контенте
// на выходе сформированный блок

// функция формирования блоков-ссылок на страницы в зависимости от максимального и текущего
// передаются параметры: функция (выполняется при нажатии на блок), текущая страница, всего страниц
// и собственно iD нашего хозяина чего-либо (я использую для ориентирования в галерее)
function renderScrollPages(funcName,numberPage, pagesCount, userID) {
  // пустой блок, отображает троеточие между большими разрывами
  let ellipsisBlockString='<div class="scrollPages_ellipsis">...</div>';
  // функция возврата блока с номером
  function numBlock(funcName, number, userID) {
    numBlockString =`<div class="scrollPages_number" onclick="${funcName}(${userID},${number});">${number}</div>`;
    return numBlockString;
  }
  // переменная для подсчета кол-ва отображаемых числовых блоков(разрывы тоже в счет)
  // почему числовые блоки? возможно слева и справа добавим стрелки для перехода на пре/следующую страницу
  let numberBlock;
  // массив числовых блоков, максимум 7, далее расчет в зависимости от количества страниц
  let pagesArray=[0,1,0,0,0,0,0,pagesCount];
  // простейшее заполнение, если число страниц не превышает 7, посто распределяем страницы
  if (pagesCount<8) {
    // число блоков равно числу страниц
    numberBlocks=pagesCount;
    for (let i=1; i<=numberBlocks; i++){
      pagesArray[i]=i;
    }
  } else
  // начинается рассчет блоков, если количество страниц больше 7
  if (pagesCount>7){
    // условие отображения при текущей страницу в начале (не далее 4 страницы)
    // в результате бубут выведены следующие данные: 1 - {текущая страница} ... {последняя страница}
    if ((numberPage<5)&&(numberPage<(pagesCount-3))) {
      // число блоков равно числу левых блоков+...+последний блок (последняя страница)
      numberBlocks=numberPage+3;
      for (let i=1; i<=numberPage+1; i++){
        pagesArray[i]=i;
      }
      pagesArray[numberBlocks]=pagesCount;
    } else
    // условие отображения при текущей страницу в конце (не ближе 4 страницы с конца)
    // в результате бубут выведены следующие данные: 1  ... {текущая страница}-{последняя страница}
    if ((numberPage>=5)&&(numberPage>=(pagesCount-3))) {
      // число блоков равно числу правых блоков+...+первый блок (первая страница)
      numberBlocks=pagesCount-numberPage+4;
      for (let i=1; i<=(pagesCount-numberPage+2); i++){
        pagesArray[numberBlocks+1-i]=pagesCount+1-i;
      }
    } else {
    // собственно все оставшиеся случаи будут в виде:
    // 1 ... {текущая страница-1}{текущая страница}{текущая страниц+1} ... {последняя страница}
      numberBlocks=7;
      pagesArray[3]=numberPage-1;
      pagesArray[4]=numberPage;
      pagesArray[5]=numberPage+1;
    }
  }
  /*for (let i=1; i<=numberBlocks; i++){
    console.log(pagesArray[i]);
  }*/
  // сформируем строку блоков с номерами исходя из данных массива
  let scrollPagesString='<div class="scrollPages"><p class="scrollPages_caption">Выберите страницу: </p>';
  // заводим цикл от 1 до числа блоков (получили выше)
  for (let i=1; i<=numberBlocks; i++){
    // если элемент массива имеет числовое значение не равное 0 прибавляем к строке блок с данным числом
    if (pagesArray[i]!=0) {
      scrollPagesString+= `${numBlock(funcName,pagesArray[i],userID)}`;
    } else {
      // если элемент массива имеет числовое значение равное 0 прибавляем к строке блок с троеточием
      scrollPagesString+=ellipsisBlockString;
    }
  }
  // закроываем ощий блок
  scrollPagesString+='</div>';
  return scrollPagesString;
}
