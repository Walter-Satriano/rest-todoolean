$(document).ready(function() {

  getItems();

  $(document).on("click", ".delete", deleteItems);


  //funzione di chiamata per ottenere gli items
  function getItems() {

    $.ajax({
      url: "http://157.230.17.132:3011/todos/",
      method: "GET",
      success: function(data) {
        console.log(data);
        printItems(data);
      },
      error: function() {
        alert("errore");
      }

    })
  }

  //funzione per stampare gli items
  function printItems(items) {

    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      //compilo il template per i film con handlebars
      var source = $("#item-template").html();
      var template = Handlebars.compile(source);

      var context = {
        text: item.text,
        id: item.id
      };

      var html = template(context);

      //stampo a schermo
      $(".container").append(html);
    }
  }

  // funzione per cancellare gli items
  function deleteItems() {

    var element = $(this);
    var toDoBox = element.parent();
    var itemsId = toDoBox.data("id");

    $.ajax({
      url: "http://157.230.17.132:3011/todos/" + itemsId,
      method: "DELETE",
      success: function() {
        console.log("L'elemento cancellato è: " + itemsId);

        toDoBox.remove();
      },
      error: function() {
        alert("errore");
      }

    })
  }

});
