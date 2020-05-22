define([
], function () {
    'use strict';

    class Requestor {

        constructor(options) {
            this.options = {
                ...{
                    host: ('https://tensor-school.herokuapp.com/'),//хост сервера
                },
                ...options
            }
        }

        //запрос на сервер
        async request(request, options, params) {
            const defaultOptions = {
                headers: {
                    'Origin': `${this.options.host}`,
                },
                credentials: 'include'
            }
            let url = new URL(this.options.host);
            url.pathname = request;

            for (let param in params) {
                url.searchParams.set(param, params[param]);
            }

            return fetch(url, { ...defaultOptions, ...options });
        }

        //обновить данные текущего авторизованного пользователя
        async updateUser(data) {

            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }

            return this.request('user/update', requestOptions);
        }

        //чтение данных по id пользователя
        async readUser(id) {
            return this.request('user/read/' + id);
        }

        //чтение данных текущего авторизованного пользоваля
        async currentUser() {
            return this.request('user/current');
        }

        // создать аккаунт
        async createUser({ login, password }) {
            const urlencoded = new URLSearchParams();
            urlencoded.append('login', login);
            urlencoded.append('password', password);
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded,
            }

            return this.request('user/create', requestOptions);
        }

        //залогиниться
        async login({ login, password }) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('login', login);
            urlencoded.append('password', password);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded
            }

            return this.request('user/login', requestOptions);
        }

        async getPhotosList(id) {
            const requestOptions = {
                headers: {
                    'Content-Type': 'image/png',
                },
            }

            return this.request(`/photo/list/${id}`, requestOptions);
        }

        //загрузка фото для профайла
        async uploadProfilePhoto(value) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'image/png',
                },
                body: value
            }
            return this.request('user/upload_photo', requestOptions);
        }

        //выйти из аккаунта
        async logout() {
            return this.request('user/logout');
        }
    }

    const requestor = factory.create(Requestor);

    return requestor;
});