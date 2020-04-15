define(function () {

    return {
        /**
         * Загрузчик Css. Подключает css файл к странице 
         * @param {*} путь до файла css 
         */
        loadCss(url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    }

});