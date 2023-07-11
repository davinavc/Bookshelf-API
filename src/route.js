const {
    saveBookHandler,
    getAllBooksHandler,
    getBookbyIdHandler,
    editBookbyIdHandler,
    deleteBookbyIdHandler,
} = require('./handler');

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
    },
    // untuk menampilkan detail buku
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookbyIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookbyIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookbyIdHandler,
    },
];

module.exports = routes;
