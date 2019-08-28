$(document).ready(function() {

  getItems();

  $("#add_button").click(createItems);
  $(document).on("click", ".delete", deleteItems);


  //funzione per aggiungere gli items
  function createItems() {

    var text = $("#user_input").val();
    //svuoto l'input
    $("#user_input").val("");

    $.ajax({
      url: "http://157.230.17.132:3011/todos/",
      method: "POST",
      data: {
        text: text
      },
      success: function() {

        getItems();
      },
      error: function() {
        alert("errore");
      }
    });
  }

  $("#user_input").keypress(
    function(invio) {
      if (invio.which == 13) {
        createItems();
      }
    }
  );

  //funzione per svuotare il contenitore degli items
  /*ps: da richiamare sempre prima della getItems così sono sicuro
  che prima di richiamare nuovi elementi, cancello quelli vecchi*/
  function clearItemsContainer() {

    $(".items_container").html("");
  }

  //funzione di chiamata per ottenere gli items
  function getItems() {

    clearItemsContainer();

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
    });
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
    });
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
      $(".items_container").append(html);
    }
  }



});
