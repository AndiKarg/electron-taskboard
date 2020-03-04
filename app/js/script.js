const fs = require("fs");
const dbname = "app/data/db.json";
const dbcontent = fs.readFileSync(dbname);
let content = JSON.parse(dbcontent);

$(document).ready(function() {
  readDB();
  main();
  $("#savetask").click(handleTaskCreate);
  $("#savebtn").click(insertIntoDB);
});

function readDB() {
  content.forEach((o, i) => {
    for (let key in o) {
      o[key].forEach(t => {
        $("#" + key + " .taskitems").append(
          "<div class='taskitem " + key + "'>" + t + "</div>"
        );
      });
    }
    $(".taskitem").draggable({
      revert: true
    });
  });
}

function main() {
  $(".taskbody").droppable({
    drop: function(event, ui) {
      let elem = ui.draggable[0];
      let dropid = $(this).attr("id");
      $("#" + dropid + " .taskitems").append(
        "<div class='taskitem " + dropid + "'>" + $(elem).text() + "</div>"
      );
      $(".taskitem").draggable({
        revert: true
      });
      $(elem).remove();
      updateTasks(dropid, elem);
    }
  });
}

function handleTaskCreate() {
  let input = $("#taskcreate").val();
  if (input) {
    $("#todo .taskitems").append(
      "<div class='taskitem todo'>" + input + "</div>"
    );
    content[0].todo.push(input);
    $(".taskitem").draggable({
      revert: true
    });
    $("#taskcreate").val("");
  }
}

function updateTasks(target, elem) {
  //remove from old list
  let text = $(elem).text();
  let source = $(elem)
    .attr("class")
    .split(" ")[1];
  let targetindex = 0; //standard = todo
  if (target == "inprogress") {
    targetindex = 1;
  } else if (target == "done") {
    targetindex = 2;
  }
  let sourceindex = 0; //standard = todo
  if (source == "inprogress") {
    sourceindex = 1;
  } else if (source == "done") {
    sourceindex = 2;
  }
  //source array updaten
  content[sourceindex][source] = content[sourceindex][source].filter(c => {
    return c !== text;
  });
  //push into new list
  content[targetindex][target].push(text);
}

function insertIntoDB() {
  fs.writeFile(dbname, JSON.stringify(content), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(content));
    console.log("writing to " + dbname);
  });
}
