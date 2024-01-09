$(document).ready(function(){

set_question_groups_for_round(all_items);

$('.prac-question-btn').on('click', function(){
  $(this).closest('.prac-btn-wrapper').addClass("d-none");
  questionDetails.question_pick_counter++;
  var foundItem = findById($(this).attr("data-id"), pracQuestionItems);
  setQuestionFirstSecondThirdPlace(foundItem, questionDetails);
  setWasSel(foundItem);

  if (questionDetails.question_pick_counter == 1) {
    $('#prac-prompt').text("Now Pick Your Favorite From the Remaining 4 Items");
  } else if (questionDetails.question_pick_counter == 2) {
    $('#prac-prompt').text("Now Pick Your Favorite From the Remaining 3 Items");
  }else if (questionDetails.question_pick_counter == 3) {
    // no more picks needed for question, so go ahead and hide all (only 4th and 5th item remains at this point)
    $('.prac-btn-wrapper').addClass("d-none");
    // 1st and 2nd and 3rd picks were already made by the user
    setQuestionLastPlaces(pracQuestionItems, questionDetails);
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
  $('#prac-prompt').text("Pick Your Favorite From the Listed 5 Items");
  $('#prac-prompt').removeClass("d-none");
  $('#prac-result').addClass('d-none');
});


// This marks the beginning of the test: Round 1
$('#beginTest').on('click', function(){
  round.round_counter++;
  resetQuestionDetails(questionDetails);
  populateQuestionButtons(round);
  $('#welcome-practice').addClass('d-none');
  $('#coreRankTestWrapper').removeClass('d-none');
});


$('.test-question-btn').on('click', function(){

  $(this).closest('.test-question-item-wrapper').addClass("d-none");
  questionDetails.question_pick_counter++;
  var foundItem = findById($(this).attr("data-id"), all_items);
  setQuestionFirstSecondThirdPlace(foundItem, questionDetails);
  setWasSel(foundItem);
  if (questionDetails.question_pick_counter == 1) {
    $('#test-question-prompt').text("Now Pick Your Favorite From the Remaining 4 Items");
  } else if (questionDetails.question_pick_counter == 2) {
    $('#test-question-prompt').text("Now Pick Your Favorite From the Remaining 3 Items");
  } else if (questionDetails.question_pick_counter == 3) {
    // no more picks needed for question, so go ahead and hide all (only 4th and 5th item remains at this point)
    $('.test-question-item-wrapper').addClass("d-none");
    // 1st and 2nd and 3rd picks were already made by the user
    setQuestionLastPlaces(round.question_groups[round.question_group_index], questionDetails);
    processDisplayQuestionResults();
  }
});


$('#test-question-restart').on('click', function(){
  $('#test-question-continue').addClass('d-none');
  $('#test-finish-btn').addClass('d-none');
  resetQuestionDetails(questionDetails);
  resetWasSelOnQuestionItems(round.question_groups[round.question_group_index]);
  $('.question-result-data').text("");
  $('#test-question-result').addClass('d-none');
  $('.test-question-item-wrapper').removeClass('d-none');
  $('#test-question-prompt').text("Pick Your Favorite From the Listed 5 Items");
  $('#test-question-prompt').removeClass("d-none");
});


$('#test-question-continue').on('click', function(){
  $('#test-question-continue').addClass('d-none');

  save_question_answer(questionDetails);

  resetQuestionDetails(questionDetails);
  resetWasSelOnQuestionItems(round.question_groups[round.question_group_index]);


  round.question_group_index++;



  if(round_is_complete()){
    round.question_groups = []
    round.question_group_index = 0;
    processQuestionsForEndOfRound();
    round.round_counter++;
  }

  update_progress_bar();
  populateQuestionButtons(round);

  $('.question-result-data').text("");
  $('#test-question-result').addClass('d-none');
  $('.test-question-item-wrapper').removeClass('d-none');
  $('#test-question-prompt').text("Pick Your Favorite From the Listed 5 Items");
  $('#test-question-prompt').removeClass("d-none");

  update_value_rankings_display();
});


$('#test-finish-btn').on('click', function(){
  $('#test-finish-btn').addClass('d-none');

  save_question_answer(questionDetails);
  processQuestionsForEndOfRound();
  $('#endOfTestMessage').removeClass('d-none');

  $('.question-result-data').text("");
  $('#test-question-result').addClass('d-none');

  round.round_counter++;
  update_value_rankings_display();
});










}); //jquery document.ready
