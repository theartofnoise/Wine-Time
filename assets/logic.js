
$(document).ready(function(){
    $(".modalWineList").hide();

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQUNe5rlRu1L0VNzHedm1FMYehIzOnVmk",
    authDomain: "wine-time-d205c.firebaseapp.com",
    databaseURL: "https://wine-time-d205c.firebaseio.com",
    projectId: "wine-time-d205c",
    storageBucket: "wine-time-d205c.appspot.com",
    messagingSenderId: "333065940936"
  };
  firebase.initializeApp(config);

  var db = firebase.database().ref();

  //Submit input validation--------------------------------
// var submit = $("#submitButtonTypes");
// var beerType = $("#userInputTypes");

// beerType.on('keyup', function (event) {
//     isValidType = beerType[0].checkValidity();    
    
//     if ( isValidType ) {
//         submit.attr("disabled",false);
//     } else {
//         submit.attr("disabled",true);
//     }
//   });

  $("#submit").on("click", function (event) {
    event.preventDefault();

    var name = $("#wineName");
    var type = $("#wineType");
    var year = $("#wineYear");
    var description = $("#wineDescription");
    var arthur = $("#ArthurApproved");
    var julie = $("#JulieApproved");
    var price = $("#winePrice");
    

    var newWine = {
        name: name.val(),
        type: type.val(),
        year: year.val(),
        description: description.val(),
        arthur: arthur.val(),
        julie: julie.val(),
        price: price.val()    

    }

    // push to database
    
    db.push(newWine);

    //erase input values
    name.val("");
    type.val("");
    year.val("");
    description.val("");
    arthur.prop('selectedIndex',0);
    julie.prop('selectedIndex',0);
    price.val("");
    
    
});

//submit button
db.on("child_added", function (childSnap) {
    console.log(childSnap.val().name.replace(/ /g,''));
    
    //add values to html
    var newRow = "<tr id='"+childSnap.val().name.replace(/ /g,'')+"'><td><strong>" + childSnap.val().name + "</strong></td><td>" + childSnap.val().type + "</td><td>" + childSnap.val().year + "</td><td>" + childSnap.val().description + "</td><td>" + childSnap.val().arthur + "</td><td>" + childSnap.val().julie + "</td><td>" + childSnap.val().price + "</td></tr>"
    //add row if both dont like
    var newBadRow = "<tr id='"+childSnap.val().name.replace(/ /g,'')+"' class='nameHighlight'><td class='smallNameHighlight'><strong>" + childSnap.val().name + "</strong></td><td>" + childSnap.val().type + "</td><td>" + childSnap.val().year + "</td><td>" + childSnap.val().description + "</td><td>" + childSnap.val().arthur + "</td><td>" + childSnap.val().julie + "</td><td>" + childSnap.val().price + "</td></tr>"
    //add row if Art dont like
    var badArtRow = "<tr id='"+childSnap.val().name.replace(/ /g,'')+"' class='artHighlight'><td class='smallArtHighlight'><strong>" + childSnap.val().name + "</strong></td><td>" + childSnap.val().type + "</td><td>" + childSnap.val().year + "</td><td>" + childSnap.val().description + "</td><td>" + childSnap.val().arthur + "</td><td>" + childSnap.val().julie + "</td><td>" + childSnap.val().price + "</td></tr>"
    //add row if Julie dont like
    var badJulieRow = "<tr id='"+childSnap.val().name.replace(/ /g,'')+"' class='julieHighlight'><td class='smallJulieHighlight'><strong>" + childSnap.val().name + "</strong></td><td>" + childSnap.val().type + "</td><td>" + childSnap.val().year + "</td><td>" + childSnap.val().description + "</td><td>" + childSnap.val().arthur + "</td><td>" + childSnap.val().julie + "</td><td>" + childSnap.val().price + "</td></tr>"
    //decides which type of row
    if (childSnap.val().arthur === "No" && childSnap.val().julie === "No") {
        $('#topRow').append(newBadRow);
    } else if (childSnap.val().arthur === "No" && childSnap.val().julie === "Yes") {
        $('#topRow').append(badArtRow); 
    } else if (childSnap.val().arthur === "Yes" && childSnap.val().julie === "No") {
        $('#topRow').append(badJulieRow); 
    } else {
        $('#topRow').append(newRow);
    }
    
    var myWineList = '<div class="modalWineList"class="modal-body"><p><a href="#'+childSnap.val().name.replace(/ /g,'')+'" class="tooltip-test" title="Arthur says '+childSnap.val().arthur+' and Julie says '+childSnap.val().julie+'">'+childSnap.val().name+'</a></p></div>'
    
    $("#theWineList").append(myWineList);
    $(".modalWineList").hide();
    
}, function (errorObject) {
    console.log('Error: ' + errorObject);
});

var display = true;

$("#theWineList").click(function() {
  
                if ( display === true ) {
                    $( ".modalWineList" ).show("slow");
                    display = false;
                } else if ( display === false ) {
                    $( ".modalWineList" ).hide("slow");
                    display = true;
                }
                
            });
            
            
        });