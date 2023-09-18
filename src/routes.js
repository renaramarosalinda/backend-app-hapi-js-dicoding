const {
  addBooks,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require('./handler.js');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Welcome';
    },
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => {
      return `Halaman tidak ditemukan`;
    },
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
];

module.exports = routes;
