define([
], function () {
    'use strict';

    class Requestor {

        constructor(options) {
            this.options = {
                ...{
                    host: ('https://tensor-school.herokuapp.com/'),
                },
                ...options
            }
        }

        async request(request, options, params) {
            const defaultOptions = {
                headers: {
                    'Origin': `${this.options.host}`,
                }
            }
            let url = new URL(this.options.host);
            url.pathname = request;

            for (let param in params) {
                url.searchParams.set(param, params[param]);
            }

            return fetch(url, { ...defaultOptions, ...options });
        }

        async updateUser(data) {

            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }

            return this.request('user/update', requestOptions);
        }

        async readUser(id) {
            return this.request('user/read/' + id, { credentials: 'include' });
        }

        async currentUser() {
            return this.request('user/current', { credentials: 'include' });
        }

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
                credentials: 'include'
            }

            return this.request('user/create', requestOptions);
        }

        async login({ login, password }) {
            let urlencoded = new URLSearchParams();
            urlencoded.append('login', login);
            urlencoded.append('password', password);

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: urlencoded,
                credentials: 'include'
            }

            return this.request('user/login', requestOptions);
        }

        async logout() {
            return this.request('user/logout');
        }
    }

    const requestor = factory.create(Requestor);

    return requestor;
});