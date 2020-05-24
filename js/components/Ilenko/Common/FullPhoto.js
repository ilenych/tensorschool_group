define([
  "Base/Component",
  "css!components/Ilenko/Common//css/FullPhoto.css",
], function (Component) {
  "use strict";

  class FullPhoto extends Component {
    constructor({ content, target }) {
      super();
      this.setState({ content, target });
    }

    afterMount() {
      // подписываемя на клик по крестику
      this.subscribeTo(
        this.getContainer().querySelector(".fullPhoto"),
        "click",
        this.closeWindow.bind(this)
      );
      // подписываемя на клик по окужающей области
      this.subscribeTo(
        this.getContainer().querySelector(".shadow"),
        "click",
        this.closeWindow.bind(this)
      );
      this.setPosition();
    }

    /**
     * Позиционирует Popup окно
     * @param {Element} target dom элемент для позиционирования
     * @param {Object} offset объект настроек размера popup
     */
    setPosition() {
      const container = this.getContainer().querySelector(".fullPhoto");
      const offset = { left: 0, right: 0, top: 0, bottom: 0 }; // this.options.offset;

      // выставляем значения по умолчанию для получения реальных размеров в доме
      container.style.left = offset.left + "px";
      container.style.top = offset.top + "px";

      // получаем реальные размеры элементов окна и таргета и вычисляем куда позиуионировать popup
      let position = this.coutPosition(
        this.state.target.getBoundingClientRect(),
        container.getBoundingClientRect()
      );
      container.style.left = position.left + "px";
      container.style.top = position.top + "px";
    }

    /**
     * Вычисление положения popup
     * @param {Object} target - объект размеров и положения относительного элемента
     * @param {Object} offset - объект размеров и положения popup
     * @returns  {left, top} - смещение окна
     */
    coutPosition(target, offset) {
      let { width = 0, height = 0, left = 0, top = 0} = offset || {};
      let { left: tleft = 0, top: ttop = 0 } = target || {};

      // получаем размер окна браузера
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      const defOffset = 8; // смещение чтоб не липло к краям

      if (left + width === innerWidth) {
        tleft = 0;
      }

      // берем левый верхний угол таргета и смещение для popup есоли надо
      left = innerWidth / 2 - (offset.width / 2)
      if(top == 0){
        top = ttop /3 
      }else {
        top = ttop - top - 50;
      }
      
      // проверяем влезает ли в окно браузера, если нет, корректируем смещение
      // if (tleft + width > innerWidth) {
      //   left = left + (innerWidth - (width + tleft)) - defOffset;
      // }

      // if (ttop + height >= innerHeight) {
      //   top = top + (innerHeight - (ttop + height)) - defOffset;
      // }

      return { left, top };
    }

    // закрыть окно
    closeWindow() {
      //размонитруем окно
      this.unmount();
    }

    render(options, { content }) {
      return `<div>
                  <div class="full">${content}</div>
                  <div class="shadow"></div>
              </div>`;
    }
  }

  return FullPhoto;
});
