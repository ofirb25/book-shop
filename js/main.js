'use strict';
console.log('book shop');
var gLastBookId = 4;
var gBooks = [
    {
        id: 0,
        title: 'Harry Potter',
        price: 21.5,
        rating: 4,
        rateCount: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a efficitur est, sit amet volutpat elit. Curabitur id elementum tellus. Mauris vitae imperdiet sem, et interdum leo.'
    },
    {
        id: 1,
        title: 'Game of thrones',
        price: 21.5,
        rating: 4,
        rateCount: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a efficitur est, sit amet volutpat elit. Curabitur id elementum tellus. Mauris vitae imperdiet sem, et interdum leo.'
    },
    {
        id: 2,
        title: 'Sky Walker',
        price: 99,
        rating: 3,
        rateCount: 1,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a efficitur est, sit amet volutpat elit. Curabitur id elementum tellus. Mauris vitae imperdiet sem, et interdum leo.'
    },
    {
        id: 3,
        title: 'The Great Escape',
        price: 59,
        rating: 0,
        rateCount: 2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a efficitur est, sit amet volutpat elit. Curabitur id elementum tellus. Mauris vitae imperdiet sem, et interdum leo.'
    },
    {
        id: 4,
        title: 'Amazing Larisa',
        price: 38,
        rating: 0,
        rateCount: 0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a efficitur est, sit amet volutpat elit. Curabitur id elementum tellus. Mauris vitae imperdiet sem, et interdum leo.'
    }
]

function init() {
    renderBooks()
}

function renderBooks() {
    var strHTML = '';
    for (var i = 0; i < gBooks.length; i++) {
        console.log('inloop')
        var book = gBooks[i];
        if (book.isArchived) continue;
        strHTML +=
            `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button class="btn btn-primary btn-sm" onclick="showDetails(${book.id})"
            data-toggle="modal" data-target="#detailsModal">Info</button</td>
            <td><button class="btn btn-warning btn-sm" onclick="renderUpdateBook(${book.id})"
            data-toggle="modal" data-target="#detailsModal">Update</button</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})"
           >Delete</button</td>
        </tr>
        `
    }
    document.querySelector('.books-table').innerHTML = strHTML;
}

function showDetails(idx) {
    var book = gBooks[idx];
    var rating = null;
    if (book.rating) {
        rating = book.rating / book.rateCount + ''
        rating = rating.substr(0, 3);        
    } else rating = 0


    var strHTML = `
        <div class="col-md-8">
            <h2 class="modal-details-title">${book.title}</h2>${rating}<i class="fa fa-star" aria-hidden="true" onclick="addRate(1,${book.id})" data-star="1"></i>
            <div> 
            Rate it now:
            <i class="fa fa-star-o rate-star" aria-hidden="true" onclick="addRate(1,${book.id})" data-star="1"></i>
            <i class="fa fa-star-o rate-star" aria-hidden="true" onclick="addRate(2,${book.id})" data-star="2"></i>
            <i class="fa fa-star-o rate-star" aria-hidden="true" onclick="addRate(3,${book.id})" data-star="3"></i>
            <i class="fa fa-star-o rate-star" aria-hidden="true" onclick="addRate(4,${book.id})" data-star="4"></i>
            <i class="fa fa-star-o rate-star" aria-hidden="true" onclick="addRate(5,${book.id})" data-star="5"></i>
            <i class="fa fa-check-circle-o got-rate" aria-hidden="true" style="color:green; display:none;"></i>
            
            </div>
            <p class="modal-details-title">${book.description}</p>
        </div>
      
        <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
       </div>
        `
    document.querySelector('.modal-body').innerHTML = strHTML
}

function renderUpdateBook(idx) {
    var book = gBooks[idx];
    var strHTML = `
        <div class="col-md-8">
            <label for="">Title</label>
            <input type="text" class="form-control modal-book-title" value="${book.title}">
            <label for="">Price</label>
            <input type="number" class="form-control modal-book-price" value="${book.price}">
            <label for="">Description</label>            
            <textarea class="form-control modal-book-desc" rows="5">${book.description}</textarea>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary modal-save" 
            onclick="saveChanges(${book.id})" data-dismiss="modal">Save changes</button>
        </div>
        `
    document.querySelector('.modal-body').innerHTML = strHTML
}

function saveChanges(idx) {

    var title = document.querySelector('.modal-book-title').value
    var price = document.querySelector('.modal-book-price').value
    var description = document.querySelector('.modal-book-desc').value;
    var book = {
        id: idx,
        title: title,
        price: price,
        description: description
    }
    if (idx) {
        book.rating = gBooks[idx].rating;
        book.rateCount = gBooks[idx].rateCount;
        gBooks[idx] = book;

    }
    else {
        book.rating = 0;
        book.rateCount = 0;
        book.id = ++gLastBookId;
        console.log(book)
        gBooks.push(book);
    }
    renderBooks();
}

function deleteBook(idx) {
    gBooks[idx].isArchived = true;
    renderBooks();
}

function renderAddBook() {
    var strHTML =
        `<div class="col-md-8">
            <label for="">Title</label>
            <input type="text" class="form-control modal-book-title" value="">
            <label for="">Price</label>
            <input type="number" class="form-control modal-book-price" value="">
            <label for="">Description</label>            
            <textarea class="form-control modal-book-desc" rows="5"></textarea>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary modal-save" 
            onclick="saveChanges()" data-dismiss="modal">Save changes</button>
        </div>
        `
    document.querySelector('.modal-body').innerHTML = strHTML
}

function addRate(rate, idx) {
    var elStars = document.querySelectorAll('.rate-star');
    for (var i = 0; i < elStars.length; i++) {
        var star = elStars[i];
        star.classList.remove('fa', 'fa-star');
        star.classList.add('fa', 'fa-star-o');
        star.setAttribute('onclick', 'return false')
    }
    for (var i = 0; i < rate; i++) {
        var star = elStars[i];
        star.classList.remove('fa', 'fa-star-o');
        star.classList.add('fa', 'fa-star')
    }
    document.querySelector('.got-rate').style.display = 'inline';
    gBooks[idx].rateCount++;
    gBooks[idx].rating = gBooks[idx].rating + rate;
}
