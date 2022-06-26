$(window).on('load', function(){
    loadBook();
    $('#previous-chapter-btn').on('click',function(){
        book_rendition.prev();
        e.preventDefault();
    })
    $('#next-chapter-btn').on('click', function () {
        book_rendition.next();
        e.preventDefault();
    });
})
var epubCodeSearch = "";

var book_epub = null;
var book_rendition = null;
var chapters_rendered = false;

var keyListener = function (e) {

    // Left Key
    if ((e.keyCode || e.which) == 37) {
        book_rendition.prev();
    }

    // Right Key
    if ((e.keyCode || e.which) == 39) {
        book_rendition.next();
    }

};

var loadBook = async function() {
    epubCodeSearch = window.location.search.substring(1).split("=")[1];
    var books_json = await getBooksFromJson();
    var book_infos = await searchBookInJson(books_json,epubCodeSearch)
    await loadBookInfo(book_infos);
    book = ePub(__dirname + "/epubs/" + epubCodeSearch + "/epub.epub", { openAs: "epub" })
    book_rendition = book.renderTo("book-content-columns", { method: "default", width: "900", height: "500","resizeOnOrientationChange": true });
    book_rendition.display();
    book_rendition.on("keyup", keyListener);
    document.addEventListener("keyup", keyListener, false);
    book_rendition.on("rendered", function (section) {
        if (!chapters_rendered) {
            book.navigation.forEach((section) => {
                var op = section.label ? "" : "op-5";
                $('#book-chapters').append(`<h1 class="main-text ${op}" onclick="book_rendition.display('${section.href}')">${section.label}</h1>`)
            })
        }
    })
}



async function loadBookInfo(book_infos){
    $('#book-info-title').text(book_infos.title);
    $('#book-info-author').text(book_infos.author ? book_infos.author : 'undefined');
    $('#book-info-language').text(book_infos.lang ? book_infos.lang : 'undefined');
    $('#book-info-year').text(book_infos.bookYear ? book_infos.bookYear : 'undefined');
    $('#book-info-pages').text('undefined');
}