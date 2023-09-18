## List Tugas : 
* Kriteria 1 : Aplikasi menggunakan port 9000
* Kriteria 2 : Aplikasi dijalankan dengan perintah npm run start.
* Kriteria 3 : API dapat menyimpan buku
* Kriteria 4 : API dapat menampilkan seluruh buku
* Kriteria 5 : API dapat menampilkan detail buku
* Kriteria 6 : API dapat mengubah data buku
* Kriteria 7 : API dapat menghapus buku

## Notes

### Usage
Start
```
npm run start
```

Nodemon
```
npm run start-dev
```

### Library
- Hapi
- Nodemon
- NanoId

NanoId using ver ```3.x.x``` (Can't use new version because not supported ES Module).

### Lib. Version
```json
    "@hapi/hapi": "^21.3.2",
    "nodemon": "^3.0.1",
    "nanoid": "^3.3.6"
```

## Testing :

### Kriteria 3 : API dapat menyimpan buku
1. Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan:
- Status Code : 400

Request :
```json
{
    "year": 2023,
    "author": "Naffsvn",
    "summary": "Buku Pembelajaran Javascript",
    "publisher": "Gramedia",
    "pageCount": 100,
    "readPage": 1,
    "reading": true
}
```

Response :
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

Details :
```
Status : 400 Bad Request
Time : 10 ms
Size : 361 B
```

2. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
- Status Code : 400

Request :
```json
{
    "name": "Javascript Pemrograman",
    "year": 2023,
    "author": "Naffsvn",
    "summary": "Buku Pembelajaran Javascript",
    "publisher": "Gramedia",
    "pageCount": 100,
    "readPage": 200,
    "reading": true
}
```

Response :
```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

Details :
```
Status : 400 Bad Request
Time : 9 ms
Size : 390 B
```

3. Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan:
- Status Code : 201

Request :
```json
{
    "name": "Javascript Pemrograman",
    "year": 2023,
    "author": "Naffsvn",
    "summary": "Buku Pembelajaran Javascript",
    "publisher": "Gramedia",
    "pageCount": 100,
    "readPage": 5,
    "reading": true
}
```

Response :
```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1SzIPTssBraRy18R"
    }
}
```

Details :
```
Status : 201 Created
Time : 13 ms
Size : 379 B
```

### Kriteria 4 : API dapat menampilkan seluruh buku

API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:
- Method : GET
- URL: /books

<hr>

1. Server harus mengembalikan respons dengan:
- Status Code : 200

Request :
```
http://localhost:9000/books
```

Response :
```json
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "VydVXVXLoBoCYSQQ",
                "name": "Javascript Pemrograman",
                "publisher": "Gramedia"
            },
            {
                "id": "i48s_T5J6goSMJu5",
                "name": "PHP Pemrograman",
                "publisher": "Gramedia"
            },
            {
                "id": "gPKaQMSvJYrBLx-Q",
                "name": "C Pemrograman",
                "publisher": "Gramedia"
            }
        ]
    }
}
```

2. Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong.

Request :
```
http://localhost:9000/books
```

Response : 
```json
{
    "status": "success",
    "data": {
        "books": []
    }
}
```

Details :
```
Status : 200 OK
Time : 21 ms
Size : 341 B
```

### Kriteria 5 : API dapat menampilkan detail buku

API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui route:
- Method : GET
- URL: /books/{bookId}

<hr>

1. Bila buku dengan id yang dilampirkan oleh client tidak ditemukan, maka server harus mengembalikan respons dengan:
- Status Code : 404

Request :
```
http://localhost:9000/books/idkosong
```

Response :
```json
{
    "status": "fail",
    "message": "Buku tidak ditemukan"
}
```

Details :
```
Status : 404 NOT FOUND
Time : 6 ms
Size : 336 B
```

2. Bila buku dengan id yang dilampirkan ditemukan, maka server harus mengembalikan respons dengan:
- Status Code : 200

Request :
```
http://localhost:9000/books/96rflyEr5rjSgvKi
```

Response :
```json
{
    "status": "success",
    "data": {
        "book": {
            "id": "96rflyEr5rjSgvKi",
            "name": "C Pemrograman",
            "year": 2023,
            "author": "Naffsvn",
            "summary": "Buku Pembelajaran C",
            "publisher": "Gramedia",
            "pageCount": 100,
            "readPage": 5,
            "finished": false,
            "reading": true,
            "insertedAt": "2023-09-17T07:04:51.556Z",
            "updatedAt": "2023-09-17T07:04:51.556Z"
        }
    }
}
```

Details :
```
Status : 200 OK
Time : 3 ms
Size : 613 B
```

### Kriteria 6 : API dapat mengubah data buku
API yang Anda buat harus dapat mengubah data buku berdasarkan id melalui route:

Method : PUT
URL : /books/{bookId}
Body Request:
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

<hr>

Server harus merespons gagal bila:

1. Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
- Status Code : 400

Request :
```
http://localhost:9000/books/iniIdSalah
```

Response :
```json
{
    "status": "fail",
    "message": "Gagal memperbarui buku. Id tidak ditemukan"
}
```

Details :
```
Status : 404 NOT FOUND
Time : 11 ms
Size : 358 B
```

2. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan:
- Status Code : 400

Request :
```json
{
    "name": "HTML",
    "year": 2023,
    "author": "Bukan Saya",
    "summary": "Buku Pembelajaran HTML",
    "publisher": "Gramedia",
    "pageCount": 100,
    "readPage": 200,
    "reading": true
}
```

Response :
```json
{
    "status": "fail",
    "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
}
```

Details :
```
Status : 400 Bad Request
Time : 7 ms
Size : 390 B
```


3. Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan:
- Status Code : 400

Request :
```json
{
    "year": 2023,
    "author": "Bukan Saya",
    "summary": "Buku Pembelajaran HTML",
    "publisher": "Gramedia",
    "pageCount": 100,
    "readPage": 200,
    "reading": true
}
```

Response :
```json
{
    "status": "fail",
    "message": "Gagal memperbarui buku. Mohon isi nama buku"
}
```

Details :
```
Status : 400 Bad Request
Time : 5 ms
Size : 361 B
```

4. Bila buku berhasil diperbarui, server harus mengembalikan respons dengan:
- Status Code : 200

Request :
```json
{
    "name": "HTML",
    "year": 2023,
    "author": "Bukan Saya",
    "summary": "Buku Pembelajaran HTML",
    "publisher": "Gramedia",
    "pageCount": 100,
    "readPage": 4,
    "reading": true
}
```

Response :
```json
{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```

Details :
```
Status : 200 OK
Time : 6 ms
Size : 336 B
```

### Kriteria 7 : API dapat menghapus buku
API yang Anda buat harus dapat menghapus buku berdasarkan id melalui route berikut:
- Method : DELETE
- URL: /books/{bookId}

<hr>

1. Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server harus mengembalikan respons berikut:
- Status Code : 404

Request :

```
http://localhost:9000/books/errorId
```

Response :
```json
{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```

Details :
```
Status : 404 Not Found
Time : 6 ms
Size : 354 B
```

2. Bila id dimiliki oleh salah satu buku, maka buku tersebut harus dihapus dan server mengembalikan respons berikut:
- Status Code : 200

Request :

```
http://localhost:9000/books/sCalSPzbFejs5ctY
```

Response :
```json
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```

Details :
```
Status : 200 OK
Time : 4 ms
Size : 333 B
```