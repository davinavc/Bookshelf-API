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
        path: '/books/{bookId}',
        handler: getBookbyIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookbyIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookbyIdHandler,
    },
];

module.exports = routes;
