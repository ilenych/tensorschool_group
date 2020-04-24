define(['Base/Model'], function (Model) {

    
    /*
     * Модель данных вида:
     * new HeaderPersonModel({
                    online: true - показывает статус онлайн, false - вычисляет последнюю активность,
                    lastActivity: задает дату и время последней активности, принимая объект Date(yyyy, m, dd, hh, mm),
                    photoUrl: ссылка на аватар текущего пользователя,
                    });
     */
    class HeaderPersonModel extends Model {
        
        /**
         * Возращает дату в текстовом виде по формату 'Был в сети сегодня в HH:MM' или 'Был в сети DD.MM.YY в HH:MM'
         * Название соц. сети в случае если пришел null
         * 'В сети', если передан флаг online=true
         */
        getActivity() {
            if(this.online) {
               return 'В сети';
            }
            let out = 'Our Social';
            const lastActivity = this.lastActivity;
            const now = new Date();
            const days = Math.floor((lastActivity - now) / 86400000)*-1;
            const daysStr = ['сегодня', 'вчера'];
            if (lastActivity) {
                out = `Был в сети ${daysStr[days-1] || lastActivity.toLocaleDateString()} в ${lastActivity.toTimeString().replace(/:[0-9]{2,2} .*/, '')}`;
            }

            return out;
        }
        
        getPhotoUrl() {
            return this.photoUrl;
        }
        
    }

    return HeaderPersonModel;
});