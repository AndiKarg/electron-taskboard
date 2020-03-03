const fs = require("fs");

$(document).ready(function() {
  readDB();
  main();
  $(".mybtn").click(handleTaskCreate);
});

function readDB() {
  fs.readFile("app/data/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      data = JSON.parse(data);
      data.forEach(d => {
        $("#todo .taskbody").append(
          "<div class='taskitem'>" + d.text + "</div>"
        );
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

function main() {
  $("#inprogress .taskbody, #done .taskbody").droppable({
    drop: function(event, ui) {
      let elem = ui.draggable[0];
      $(this).append("<div class='taskitem'>" + $(elem).text() + "</div>");
      $(elem).remove();
    }
  });
}

function handleTaskCreate() {
  console.log("click!");
  let input = $("#taskcreate").val();
  if (input) {
    $("#todo .taskbody").append("<div class='taskitem'>" + input + "</div>");
    $(".taskitem").draggable({
      start: function() {
        console.log("du dragst gerade: ", $(this).text());
      },
      revert: true
    });
    $("#taskcreate").val("");
  }
}
