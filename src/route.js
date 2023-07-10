const { saveBookHandler, getAllBooksHandler } = require('./handler');

const routes = [
    // untuk menyimpan buku
    {
        method: 'POST',
        path: '/books',
        handler: saveBookHandler,
    },
    // untuk menampilkan semua buku
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    }
];

module.exports = routes;
