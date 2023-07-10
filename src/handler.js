const { nanoid } = require('nanoid');
const books = require('./books');

// eslint-disable-next-line consistent-return
const saveBookHandler = (req, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const saveBook = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt,
    };
    books.push(saveBook);

    const isSuccess = books.filter((book) => book.id).length > 0;

    if (isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    } if (name === null){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
};

const getAllBooksHandler = (req, h) => {
    const response = h.response({
        status: 'success',
        data: {
            books: [],
        },
    });
    response.code(200);
    return response;
};

module.exports = {
    saveBookHandler,
    getAllBooksHandler,
};
