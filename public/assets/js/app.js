$(".searchArticle").on("click", function() {
    fetch("/scrape", {method: "GET"}
    ).then(() => window.location.replace("/articles"));
    location.reload(true);
})

$.getJSON("/articles", function(data) {
    // For each one
    //console.log(data);
    for (var i = 0; i < data.length; i++) {
      // Display information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a href='"+ data[i].link +"'>" + data[i].link + "</a>" + "</p>");
    }
  });