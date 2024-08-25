$(document).ready(function(){


// This marks the beginning of the test: Round 1 for the Discard Phase
$('#beginTestDiscardPhase').on('click', function(){
  $('#introduction-and-begin').addClass("d-none");
  discard_phase_round.round_counter++;
  discard_phase_set_question_groups_for_round(all_items);
  resetDiscardPhaseQuestionDetails(discard_phase_questionDetails);
  populateDiscardQuestionButtons(discard_phase_round);
  $('#discardPhaseWrapper').removeClass("d-none");
});

// This marks the beginning of phase 2: the ranking Phase
$('#beginTestRankPhase').on('click', function(){
  update_ranking_progress_bar();
  $('#discard-phase-end-result').addClass("d-none");
  set_question_groups_for_round_phase_two_init_three_rounds(all_items);
  round.round_counter++;
  resetQuestionDetails(questionDetails);
  populateQuestionButtons(round);
  $('#coreRankTestWrapper').removeClass('d-none');
});



$('.discard-test-question-btn').on('click', function(){

  $(this).closest('.discard-test-question-item-wrapper').addClass("d-none");
  discard_phase_questionDetails.question_pick_counter++;
  var foundItem = findById($(this).attr("data-id"), all_items);
  setItemToKeepDiscardPhase(foundItem, discard_phase_questionDetails);
  if (discard_phase_questionDetails.question_pick_counter == 1){
    $('#discard-test-question-prompt').text("Pick 9 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 2){
    $('#discard-test-question-prompt').text("Pick 8 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 3){
    $('#discard-test-question-prompt').text("Pick 7 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 4){
    $('#discard-test-question-prompt').text("Pick 6 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 5){
    $('#discard-test-question-prompt').text("Pick 5 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 6){
    $('#discard-test-question-prompt').text("Pick 4 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 7){
    $('#discard-test-question-prompt').text("Pick 3 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 8){
    $('#discard-test-question-prompt').text("Pick 2 More Core Values You Like");
  } else if (discard_phase_questionDetails.question_pick_counter == 9){
    $('#discard-test-question-prompt').text("Pick 1 More Core Value You Like");
  } else {
    // Ten Items Have been Picked
    // no more picks needed for question, so go ahead and hide all
    $('.discard-test-question-item-wrapper').addClass("d-none");
    discardPhaseSetToDiscard();
    discardPhaseprocessDisplayQuestionResults();
  }
});


$('#discard-test-question-restart').on('click', function(){
  $('#discard-test-question-continue').addClass('d-none');
  resetDiscardPhaseQuestionDetails(discard_phase_questionDetails);

  // clear out all the items listed to keep and to discard
  $('#discard-result-to-keep').empty();
  $('#discard-result-to-discard').empty();

  $('#discard-test-question-result').addClass('d-none');
  $('.discard-test-question-item-wrapper').removeClass('d-none');
  $('#discard-test-question-prompt').text("In No Particular Order: Pick 10 Core Values You Like (the others will be discarded)");
  $('#discard-test-question-prompt').removeClass("d-none");
});


$('#discard-test-question-continue').on('click', function(){
  $('#discard-test-question-continue').addClass('d-none');

  discard_save_question_answer(discard_phase_questionDetails);

  resetDiscardPhaseQuestionDetails(discard_phase_questionDetails)

  discard_phase_round.question_group_index++;

  if(discard_round_is_complete()){
    discard_phase_round.question_groups = []
    discard_phase_round.question_group_index = 0;
    discard_phase_round.round_counter++;
    discardprocessQuestionsForEndOfRound();
  }


  if(is_end_of_discard_phase()){
    $('#discard-test-question-result').addClass('d-none');
    discardPhaseEndDisplayResults();
  } else {
    update_filter_progress_bar();
    populateDiscardQuestionButtons(discard_phase_round);
    $('#discard-test-question-result').addClass('d-none');
    $('.discard-test-question-item-wrapper').removeClass('d-none');
    $('#discard-test-question-prompt').text("In No Particular Order: Pick 10 Core Values You Like (the others will be discarded)");
    $('#discard-test-question-prompt').removeClass("d-none");
  }

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

  update_ranking_progress_bar();
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
