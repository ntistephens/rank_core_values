$(document).ready(function(){

set_question_groups_for_round_one(round, all_items);

$('.prac-question-btn').on('click', function(){
  $(this).closest('.prac-btn-wrapper').addClass("d-none");
  var foundItem = findById($(this).attr("data-id"), pracQuestionItems);
  setQuestionFirstOrSecondPlace(foundItem, questionDetails);
  setWasSel(foundItem);

  if (questionDetails.questionPickCounter == 0) {
    questionPickCounterPlusPlus(questionDetails);
    $('#prac-prompt').text("Now Pick Your Favorite From the Remaining 2 Items");
  } else if (questionDetails.questionPickCounter == 1) {
    // no more picks needed for question, so go ahead and hide all (only 3rd item remains at this point)
    $('.prac-btn-wrapper').addClass("d-none");
    // BOTH 1st and 2nd picks were already made by the user
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
  populateQuestionButtons(round);
  $('#welcome-practice').addClass('d-none');
  $('#coreRankTestWrapper').removeClass('d-none');
});


$('.test-question-btn').on('click', function(){
  $(this).closest('.test-question-item-wrapper').addClass("d-none");
  var foundItem = findById($(this).attr("data-id"), all_items);
  setQuestionFirstOrSecondPlace(foundItem, questionDetails);
  setWasSel(foundItem);

  if (questionDetails.questionPickCounter == 0) {
    questionPickCounterPlusPlus(questionDetails);
    $('#test-question-prompt').text("Now Pick Your Favorite From the Remaining 2 Items");
  } else if (questionDetails.questionPickCounter == 1) {
    // no more picks needed for question, so go ahead and hide all (only 3rd item remains at this point)
    $('.test-question-item-wrapper').addClass("d-none");
    // BOTH 1st and 2nd picks were already made by the user
    // This leaves the remaining 3rd place which we proceed to set so the user doesn't have to manually click it.
    setQuestionThirdPlace(round.question_groups[round.question_group_counter], questionDetails);
    processDisplayQuestionResults();
  }
});


$('#test-question-restart').on('click', function(){
  $('#test-question-continue').addClass('d-none');
  resetQuestionDetails(questionDetails);
  resetWasSelOnQuestionItems(round.question_groups[round.question_group_counter]);
  $('.question-result-data').text("");
  $('#test-question-result').addClass('d-none');
  $('.test-question-item-wrapper').removeClass('d-none');
  $('#test-question-prompt').text("Pick Your Favorite From the Listed 3 Items");
  $('#test-question-prompt').removeClass("d-none");
});


$('#test-question-continue').on('click', function(){
  $('#test-question-continue').addClass('d-none');

  save_question_answer(questionDetails);

  resetQuestionDetails(questionDetails);
  resetWasSelOnQuestionItems(round.question_groups[round.question_group_counter]);

  roundCounterPlusPlus(round);
  populateQuestionButtons(round);

  $('.question-result-data').text("");
  $('#test-question-result').addClass('d-none');
  $('.test-question-item-wrapper').removeClass('d-none');
  $('#test-question-prompt').text("Pick Your Favorite From the Listed 3 Items");
  $('#test-question-prompt').removeClass("d-none");

  update_value_rankings_display();
});










}); //jquery document.ready
