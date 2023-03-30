$(document).ready(function(){

set_question_groups_for_round(round_one, all_items);

$('.prac-question-btn').on('click', function(){
  $(this).closest('.prac-btn-wrapper').addClass("d-none");
  questionPickCounterPlusPlus(questionDetails);
  var foundItem = findById($(this).attr("data-id"), pracQuestionItems);
  setQuestionFirstOrSecondPlace(foundItem, questionDetails);
  setWasSel(foundItem);

  if (questionDetails.questionPickCounter == 1) {
    $('#prac-prompt').text("Now Pick Your Favorite From the Remaining 2 Items");
  } else if (questionDetails.questionPickCounter == 2) {
    // no more picks needed for question, so go ahead and hide all (only 3rd item remains at this point)
    $('.prac-btn-wrapper').addClass("d-none");
    // BOTH 1st and 2nd picks were already made by the user
    // This leaves the remaining 3rd place which we proceed to set so the user doesn't have to manually click it.
    // For good measuure, virtually ++ the pick counter
    questionPickCounterPlusPlus(questionDetails);
    setQuestionThirdPlace(pracQuestionItems, questionDetails);
    $('#prac-prompt').addClass("d-none");
    $('#prac-result').removeClass('d-none');
    displayTestResult(questionDetails, $('#prac-result-data'));
  }
});


$('#prac-restart-question').on('click', function(){
  resetQuestionDetails(questionDetails);
  resetWasSelOnQuestionItems(pracQuestionItems);
  $('.question-result-data').text("");
  $('.prac-btn-wrapper').removeClass('d-none');
  $('#prac-prompt').text("Pick Your Favorite From the Listed 3 Items");
  $('#prac-prompt').removeClass("d-none");
  $('#prac-result').addClass('d-none');
});


$('#beginTest').on('click', function(){
  resetQuestionDetails(questionDetails);
  populateQuestionButtons(round_one);
  $('#welcome-practice').addClass('d-none');
  $('#coreRankTestWrapper').removeClass('d-none');
});


$('.test-question-btn').on('click', function(){
  $(this).closest('.test-question-item-wrapper').addClass("d-none");
  questionPickCounterPlusPlus(questionDetails);
  var foundItem = findById($(this).attr("data-id"), all_items);
  setQuestionFirstOrSecondPlace(foundItem, questionDetails);
  setWasSel(foundItem);

  if (questionDetails.questionPickCounter == 1) {
    $('#test-question-prompt').text("Now Pick Your Favorite From the Remaining 2 Items");
  } else if (questionDetails.questionPickCounter == 2) {
    // no more picks needed for question, so go ahead and hide all (only 3rd item remains at this point)
    $('.test-question-item-wrapper').addClass("d-none");
    // BOTH 1st and 2nd picks were already made by the user
    // This leaves the remaining 3rd place which we proceed to set so the user doesn't have to manually click it.
    // For good measuure, virtually ++ the pick counter
    questionPickCounterPlusPlus(questionDetails);
    setQuestionThirdPlace(round_one.question_groups[round_one.round_counter], questionDetails);
    $('#test-question-prompt').addClass("d-none");
    $('#test-question-result').removeClass('d-none');
    displayTestResult(questionDetails, $('#test-question-result-data'));
  }
});


$('#test-question-restart').on('click', function(){
  resetQuestionDetails(questionDetails);
  resetWasSelOnQuestionItems(pracQuestionItems);
  $('.question-result-data').text("");
  $('#test-question-result').addClass('d-none');
  $('.test-question-item-wrapper').removeClass('d-none');
  $('#test-question-prompt').text("Pick Your Favorite From the Listed 3 Items");
  $('#test-question-prompt').removeClass("d-none");

});










}); //jquery document.ready
