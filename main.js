$( document ).ready(function(){
  var timer = setInterval(loopRandom, 50);

  // choose numbers from table and show changes in table
  $( "td" ).click(function() {
    $( this ).toggleClass( "xMarksTheSpot" );
  });

  // click on button to do all needed functions in our loto task
  $( "button#draw" ).click(function() {
    clearInterval(timer);
    // choose and draw 7 random numbers 
    var finalNumbers = [];
    while(finalNumbers.length < 7){
      var randomnumber=Math.ceil(Math.random()*39)
      var found=false;
      for(var i=0; i< finalNumbers.length; i++){
      if(finalNumbers[i]==randomnumber){found=true;break}
      }
      if(!found)finalNumbers[finalNumbers.length]=randomnumber;
    }
    finalNumbers.sort(function(a, b){return a-b});
    for(var i=0; i<7; i++){
      $("ul li:eq("+i+") p").html(finalNumbers[i]);
    }

    // compare selected numbers with drawn numbers
    function lotoSeven(){
      var count = 0;
      var marked = 0;
      for (var i = 0; i < 10; i++){
        count = 0;
        marked = 0;
        for (var j = 0; j < 39; j++){
          if($("table:eq("+i+") td:eq("+j+")").hasClass("xMarksTheSpot")){
            for (var k = 0; k < finalNumbers.length; k++){
              if ($("table:eq("+i+") td:eq("+j+")").html() == finalNumbers[k] ){
                $("table:eq("+i+") td:eq("+j+")").addClass( "guessed" );
                count++;
              }
            }
            marked++;
          }
        }

        // check if theres 7 numbers selected in column and draw the result
        if(marked == 0){
          $("table:eq("+i+") tbody:eq(4)").html('neodigran');
        }
        else if(marked == 7){
          $("table:eq("+i+") tbody:eq(4)").html(count); 
        }
        else{
          $("table:eq("+i+") tbody:eq(4)").html('nevažeći');
        }
      }
    }

    // run the comparation
    lotoSeven();
  });

  // play again button. Removes classes and set everithing to default
  $( "button#again" ).click(function() {
    $("table tbody:last-child").html('');
    $( "td" ).removeClass('guessed');
    $( "td" ).removeClass('xMarksTheSpot');
    clearInterval(timer);
    timer = setInterval(loopRandom, 50);
  });

  // showing animation of random numbers in balls until next draw
  function loopRandom(){
    var loopNum = 0;
    for(var i=0; i<7; i++){
      loopNum = Math.floor(Math.random() * 39) + 1;
      $("ul li:eq("+i+") p").html(loopNum);
    }
  }
});