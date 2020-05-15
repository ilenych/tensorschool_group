define([
    'ProfileInfo/Requestor',
], function (Requestor) {
    'use strict';

    Requestor.currentUser()
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                require([
                    'Page/Authorization'
                ], function (Authorization) {
                    'use strict';
                    const autorization = factory.create(Authorization);
                    autorization.mount(document.body);
                });
            }
        }).then(function (result) {
            if (result) {
                require([
                    'Page/Page'
                ], function (Page) {
                    'use strict';
                    const page = factory.create(Page, {
                        id: result.id
                    });
                    page.mount(document.body);
                });
            }
        }).catch(error => console.log("error", error));

});
