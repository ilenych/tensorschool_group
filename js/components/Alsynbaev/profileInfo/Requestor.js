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

        //выйти из аккаунта
        async logout() {
            return this.request('user/logout');
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

        async getUserLinks() {
            return this.request('user_link/list');
        }

        async createUserLink(user_id, link_type) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('user', user_id);
            urlencoded.append('link_type', link_type);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded
            }
            return this.request('user_link/create', requestOptions);
        }

        async updateUserLink(id, user_id, link_type) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('id', id);
            urlencoded.append('user_to', user_id);
            urlencoded.append('link_type', link_type);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded
            }

            return this.request('user_link/update', requestOptions);
        }

        async deleteUserLink(user) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('user', user);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded
            }

            return this.request('user_link/delete', requestOptions);
        }

        async getMessageAddresseList(page, pageSize) {

            let urlencoded = new URLSearchParams();
            urlencoded.append('page', page || 0);
            urlencoded.append('pageSize', pageSize || 10);

            return this.request('message/addressee_list');

        }

        async getMessageList(addressee, page, pageSize) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('page', page || 0);
            urlencoded.append('pageSize', pageSize || 10);

            return this.request(`message/list/${addressee}`);
        }

        async createMessage(id, author, addressee, message, image) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('id', id);
            urlencoded.append('author', author);
            urlencoded.append('addressee', addressee);
            urlencoded.append('message', message);
            urlencoded.append('image', image);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded
            }

            return this.request('message/create', requestOptions);
        }

        async updateMessage(id, author, message) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('id', id);
            urlencoded.append('author', author);
            urlencoded.append('message', message);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded
            }

            return this.request('message/update', requestOptions);
        }

        async deleteMessage(message_id) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('message_id', message_id);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded
            }

            return this.request('message/delete', requestOptions);
        }
    }

    const requestor = factory.create(Requestor);

    return requestor;
});