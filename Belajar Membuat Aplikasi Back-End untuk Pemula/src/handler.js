const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const currentDate = new Date().toISOString();
  const updatedAt = currentDate;
  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt: currentDate,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
  }
  return h
    .response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    })
    .code(400);
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    const foundBook = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    return h
      .response({
        status: 'success',
        data: {
          books: foundBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);
  }

  if (reading === '1') {
    return h
      .response({
        status: 'success',
        data: {
          books: books
            .filter((book) => book.reading === true)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      })
      .code(200);
  }

  if (reading === '0') {
    return h
      .response({
        status: 'success',
        data: {
          books: books
            .filter((book) => book.reading === false)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      })
      .code(200);
  }

  if (finished === '1') {
    return h
      .response({
        status: 'success',
        data: {
          books: books
            .filter((book) => book.finished === true)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      })
      .code(200);
  }

  if (finished === '0') {
    return h
      .response({
        status: 'success',
        data: {
          books: books
            .filter((book) => book.finished === false)
            .map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
        },
      })
      .code(200);
  }

  return h
    .response({
      status: 'success',
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);
};

const getBookById = (request, h) => {
  const { bookId } = request.params;
  const foundBook = books.filter((book) => book.id === bookId)[0];

  if (foundBook !== undefined) {
    return h
      .response({
        status: 'success',
        data: {
          book: foundBook,
        },
      })
      .code(200);
  }

  return h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
};

const updateBook = (request, h) => {
  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();
  const foundBook = books.findIndex((book) => book.id === bookId);

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (foundBook !== -1) {
    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
    }

    books[foundBook] = {
      ...books[foundBook],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished: pageCount === readPage,
      updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;
  const foundBook = books.findIndex((book) => book.id === bookId);

  if (foundBook !== -1) {
    books.splice(foundBook, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  addBooks,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
