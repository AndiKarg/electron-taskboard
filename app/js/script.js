const fs = require("fs");

$(document).ready(function() {
  readDB();
});

function readDB() {
  fs.readFile("app/data/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      data.forEach(d => {
        $(".taskbody").append("<div class='taskitem'>" + d.text + "</div>");
      });
      $(".taskitem").draggable({
        start: function() {
          console.log("du dragst gerade: ", $(this).text());
        },
        revert: true
      });
    }
  });
}
