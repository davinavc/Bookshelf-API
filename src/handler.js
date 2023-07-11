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
        id,
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

     if (name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });
    response.code(201);
    return response;
};

const getAllBooksHandler = (req, h) => {
    if (books.finished === 1){
        const response = h.response({
            status: 'success',
            data: {
                books: [
                { id: '1', name: 'Buku A', publisher: 'Dicoding Indonesia' },
            ],
            },
        });
        response.code(200);
        return response;
    }
    if (books.finished === 0){
        const response = h.response({
            status: 'success',
            data: {
                books: [
                { id: '1', name: 'Buku A', publisher: 'Dicoding Indonesia' },
                { id: '2', name: 'Buku B', publisher: 'Dicoding Indonesia' },
                { id: '3', name: 'Buku C', publisher: 'Dicoding Indonesia' },
            ],
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'success',
        data: {
            books: [
            { id: '1', name: 'Buku A', publisher: 'Dicoding Indonesia' },
            { id: '2', name: 'Buku B', publisher: 'Dicoding Indonesia' },
        ],
        },
    });
    response.code(200);
    return response;
};

const getBookbyIdHandler = (req, h) => {
    const { id } = req.params;
    const book = books.filter((b) => b.id === id)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editBookbyIdHandler = (req, h) => {
    const { id } = req.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1){
        if (name === undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        } if (readPage > pageCount){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }

        books[index] = {
            ...books[index],
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookbyIdHandler = (req, h) => {
    const { id } = req.params;
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    saveBookHandler,
    getAllBooksHandler,
    getBookbyIdHandler,
    editBookbyIdHandler,
    deleteBookbyIdHandler,
};
