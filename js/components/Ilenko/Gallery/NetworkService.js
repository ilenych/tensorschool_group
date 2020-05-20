define({
  /**
   * Возвращает данные фотографий с сервера в зависимости от id
   */
  fetchData: async function (id) {
    try {
      let responce = await fetch("http://localhost:3000/gallery/" + id);
      let content = await responce.json();
      return content;
    } catch (err) {
      console.error(err);
    }
  },
});
