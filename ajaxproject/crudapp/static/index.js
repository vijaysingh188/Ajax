window.onload = initALL;

var saveBookButton;
function initALL(){
    saveBookButton = document.getElementById("save_book");
    saveBookButton.onclick = saveBook;


}
function showAllBooks(){
     var req = new XMLHttpRequest();

    var url = "/show_book"
     req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        var data = eval(req.responseText)
//        alert(data[0].name)
        var div = document.getElementById("profile");
        div.innerHTML = '';
        var table = document.createElement("TABLE");
        var row = table.insertRow(0);
        var name = row.insertCell(0);
        var prize = row.insertCell(1);
        var pages = row.insertCell(2);
        var clickTOUpdate = row.insertCell(3);
        var clickTODelete = row.insertCell(4);


         name.innerHTML = "Book Name";
         prize.innerHTML = "Book Prize";
         pages.innerHTML = "Book Pages";
         clickTOUpdate.innerHTML = "Book Update";
         clickTODelete.innerHTML = "Book delete";



        for (var i = 0;i<data.length; i++){
         var row = table.insertRow(i+1)
         var name = row.insertCell(0);
         var prize = row.insertCell(1);
         var pages = row.insertCell(2);
         var updateBook = row.insertCell(3)
         var deleteBook = row.insertCell(4);



         name.innerHTML = data[i].name;
         prize.innerHTML = data[i].prize;
         pages.innerHTML = data[i].pages;
         deleteBook.id = data[i].id;

         updateBook.id = data[i].id;
         updateBook.innerHTML = "&#xf044";
         updateBook.className = "text-warning";
         updateBook.style.fontSize = "25px";
         updateBook.style.cursor = "pointer";
         updateBook.className = "updateButton"

         updateBook.onclick = function(){
         id = this.id;
         var obj = this;

          var req = new XMLHttpRequest();
          var url = '/update_book?id='+id
          req.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
             if(req.responseText=='true'){
             var toEdit = document.getElementById("")
             }
            }
          };
          req.open("GET", url, true);
          req.send();
         }



         deleteBook.innerHTML = "&times";
         deleteBook.className = "text-danger";
         deleteBook.style.fontSize = "25px";
         deleteBook.style.cursor = "pointer";
         deleteBook.className = "deleteButton";

         deleteBook.onclick = function(){
         var obj = this
         var id = this.id;
         var req = new XMLHttpRequest();

    var url = "/delete_book?id="+id

     req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        if (req.responseText=='true'){
        table.deleteRow(obj.parentNode.rowIndex);
        }



    }
  };
  req.open("GET", url , true);
  req.send();
         }


     }
     table.className = 'table table-striped text-center'

     div.appendChild(table)
    }
  };
  req.open("GET", url , true);
  req.send();
}



function saveBook(){
     var req = new XMLHttpRequest();
     var name = document.getElementById('bookName').value;
     var prize = document.getElementById('bookPrize').value;
     var pages = document.getElementById('bookPages').value;


    var url = "/save_book?name="+name+'&prize='+prize+'&pages='+pages
//save_book?name=python&prize=152&pages=22
//    alert(url)

     req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
//        alert(req.responseText)
        document.getElementById('bookName').value = '';
        document.getElementById('bookPrize').value = '';
        document.getElementById('bookPages').value = '';

    }
  };
  req.open("GET", url , true);
  req.send();
}