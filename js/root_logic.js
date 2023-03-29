$(document).ready(function(){



$('.prac-question').on('click', function(){
  $(this).addClass("d-none");
  questionPickCounterPlusPlus(pracQuestionDetails);
  var foundItem = findById($(this).find('.btn').attr("data-id"), pracQuestionItems);
  setQuestionFirstOrSecondPlace(foundItem, pracQuestionDetails);
  setWasSel(foundItem);

  if (pracQuestionDetails.questionPickCounter == 1) {
    $('#prac-prompt').text("Now Pick Your Favorite From the Remaining 2 Items");
  } else if (pracQuestionDetails.questionPickCounter == 2) {
    // no more picks needed for question, so go ahead and hide all (only 3rd item remains at this point)
    $('.prac-question').addClass("d-none");
    // BOTH 1st and 2nd picks were already made by the user
    // This leaves the remaining 3rd place which we proceed to set so the user doesn't have to manually click it.
    // For good measuure, virtually ++ the pick counter
    questionPickCounterPlusPlus(pracQuestionDetails);
    setQuestionThirdPlace(pracQuestionItems, pracQuestionDetails);
    $('#prac-prompt').addClass("d-none");
    $('#prac-result').removeClass('d-none');
    displayTestResult(pracQuestionDetails);
  }
});


$('#pracRestartQuestion').on('click', function(){
  resetQuestionDetails(pracQuestionDetails);
  resetWasSelOnQuestionItems(pracQuestionItems);
  $('.prac-question').removeClass('d-none');
  $('#prac-prompt').text("Pick Your Favorite From the Listed 3 Items");
  $('#prac-prompt').removeClass("d-none");
  $('#prac-result').addClass('d-none');
  console.log(pracQuestionDetails);
  console.log(pracQuestionItems);
});




}); //jquery document.ready
