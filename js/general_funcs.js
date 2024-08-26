function discard_phase_set_question_groups_for_round(items_ary){
  shuffle(items_ary);
  discard_phase_push_question_groups_into_round(items_ary);
}


// There are two "rounds" in the discard phase
// The first round has four question groups. Item size for each of those question groups: 23,23,22,22 (becuase 90 items does not divide evenly into four groups)
// The second round will have two question groups. Item size for each of those queston groups: 20,20.
// Notes:
// After round 1: there will be only 40 items remaining that have NOT been discarded
// After round 2: there will be only 20 items remaining that have NOT been discarded
function discard_phase_push_question_groups_into_round(items_ary){
  // sanity check, ensure question groups are emptied
  discard_phase_round.question_groups = []

  // sanity check: init this state tracker for all items
  for (let i = 0; i < items_ary.length; i++) {
    items_ary[i].is_assigned_question_group = false;
  }

  if(discard_phase_round.round_counter == 1){
    // For the first round, there are four total question groups:
    for (let i = 0; i < 4; i++) {
      // The first two groups groups will have 23 items (because 90 items does not divide evenly into 4 groups)
      if(i == 0 || i == 1){
        var new_question_group = [];
        var total_required_items_in_group = 23;
          // loop through, add 23 items to the group
          for (let ii = 0; ii < items_ary.length; ii++) {
            if(new_question_group.length != total_required_items_in_group && items_ary[ii].is_assigned_question_group == false && items_ary[ii].discarded == false ){
              new_question_group.push(items_ary[ii]);
              items_ary[ii].is_assigned_question_group = true;
            }
          }
          discard_phase_round.question_groups.push(new_question_group);
      // The second two groups groups will have 22 items (because 90 items does not divide evenly into 4 groups)
      } else if(i == 2 || i == 3) {
          var new_question_group = [];
          var total_required_items_in_group = 22;
          // loop through, add 23 items to the group
          for (let iii = 0; iii < items_ary.length; iii++) {
            if(new_question_group.length != total_required_items_in_group && items_ary[iii].is_assigned_question_group == false && items_ary[iii].discarded == false ){
              new_question_group.push(items_ary[iii]);
              items_ary[iii].is_assigned_question_group = true;
            }
          }
          discard_phase_round.question_groups.push(new_question_group);
      }
    }
  } else if(discard_phase_round.round_counter == 2) {
      // For the second round, there are two total question groups:
      // Both groups get 20 items
      for (let iiii = 0; iiii < 2; iiii++) {
        var new_question_group = [];
        var total_required_items_in_group = 20;
        // loop through, add 20 items to the group
        for (let iiiii = 0; iiiii < items_ary.length; iiiii++) {
          if(new_question_group.length != total_required_items_in_group && items_ary[iiiii].is_assigned_question_group == false && items_ary[iiiii].discarded == false ){
            new_question_group.push(items_ary[iiiii]);
            items_ary[iiiii].is_assigned_question_group = true;
          }
        }
        discard_phase_round.question_groups.push(new_question_group);
      }
  }

}

function resetDiscardPhaseQuestionDetails(discard_phase_questionDetails) {
  discard_phase_questionDetails.to_keep_items = [];
  discard_phase_questionDetails.to_discard_items = [];
  discard_phase_questionDetails.question_pick_counter = 0;
}

function populateDiscardQuestionButtons(discard_phase_round) {
  $('.discard-test-question-btn').each(function(index){
    if (discard_phase_round.round_counter == 1 && discard_phase_round.question_group_index > 1 && index >= 22 ){
      //Noop. Only the first two question groups of round 1 have 23 items
      // So for the other two question groups, we simply hide that button that would hold the extra item
      $(this).addClass("d-none");
    } else if (discard_phase_round.round_counter == 2 && index >= 20 ){
      // Noop. The two question groups in round 2 have 20 items
      // So for the extra three buttons that would hold items, we simply hide them
      $(this).addClass("d-none");
    } else {
      $(this).html(discard_phase_round.question_groups[discard_phase_round.question_group_index][index].name);
      $(this).attr("data-id", discard_phase_round.question_groups[discard_phase_round.question_group_index][index].id);
    }
  });
}

function setItemToKeepDiscardPhase(foundItem, discard_phase_questionDetails){
  discard_phase_questionDetails.to_keep_items.push(foundItem);
}


function discardPhaseprocessDisplayQuestionResults(){
  $('#discard-test-question-prompt').addClass("d-none");
  $('#discard-test-question-result').removeClass('d-none');
  discardPhasedisplayTestResult(discard_phase_questionDetails);
  $('#discard-test-question-continue').removeClass('d-none');
}

function discardPhaseSetToDiscard(){
  for (discard_phase_round_item of discard_phase_round.question_groups[discard_phase_round.question_group_index] ) {
    let item_to_discard = true;
    for (keep_item of discard_phase_questionDetails.to_keep_items) {
      if(discard_phase_round_item == keep_item){
        item_to_discard = false;
      }
    }
    if (item_to_discard == true) {
      discard_phase_questionDetails.to_discard_items.push(discard_phase_round_item);
    }
  }
}

function discardPhasedisplayTestResult(discard_phase_questionDetails){
  let keep_item_html = "";
  for (keep_item of discard_phase_questionDetails.to_keep_items) {
    keep_item_html = keep_item_html + "<li>" + keep_item.name + "</li>";
  }
  $("#discard-result-to-keep").html(keep_item_html);

  let discard_item_html = "";
  for (discard_item of discard_phase_questionDetails.to_discard_items) {
    discard_item_html = discard_item_html + "<li>" + discard_item.name + "</li>";
  }
  $("#discard-result-to-discard").html(discard_item_html);
  $('#discard-test-question-result').removeClass('d-none');
}

function discardPhaseEndDisplayTestResult(){
  let keep_item_html = "";
  let discard_item_html = "";

  for (item of all_items) {
    if (item.discarded == true) {
      discard_item_html = discard_item_html + "<li>" + item.name + "</li>";
    } else {
      keep_item_html = keep_item_html + "<li>" + item.name + "</li>";
    }
  }

  $("#discard-phase-end-kept").html(keep_item_html);
  $("#discard-phase-end-discarded").html(discard_item_html);

  $('#discard-phase-end-result').removeClass('d-none');
}



function discard_save_question_answer(discard_phase_questionDetails){
  for (discard_item of discard_phase_questionDetails.to_discard_items) {
    discard_item.discarded = true;
    // For sorting: force all the discarded items to the bottom of the list
    discard_item.weightedVal = -99;
    // To make the logic work right for ranking, just set the removed attribute to true.
    discard_item.removed = true;
    discard_item.round_removed = "Discarded - Phase 1";
  }
}

// the discard round is ++ before being called here, so checking for out of bounds
function discard_round_is_complete(){
  if(discard_phase_round.round_counter == 1 && discard_phase_round.question_group_index == 4){
    return true;
  } else if((discard_phase_round.round_counter == 2) && discard_phase_round.question_group_index == 2) {
    return true;
  }
  return false;
}

// This is the end of the round
// The round counter has not been ++ yet
function discardprocessQuestionsForEndOfRound(){
  if(discard_phase_round.round_counter == 2){
    discard_phase_set_question_groups_for_round(all_items);
  } else if (discard_phase_round.round_counter == 3) {
    // noop, end of discard phase
  }
}

function is_end_of_discard_phase(){
  if(discard_phase_round.round_counter == 3){
    return true;
  } else {
    return false;
  }
}

function update_filter_progress_bar(){
  total_filter_questions_answered++;
  var progress = Math.round((total_filter_questions_answered / 6) * 100) + '%';
  $('#filter-progress-bar').width(progress);
  $('#filter-progress-num-display').text(total_filter_questions_answered);
  if(total_filter_questions_answered >= 1) {
    $('#filter_progress_percentage_inside_progress_bar').text(progress);
  }
}

function discardPhaseEndDisplayResults(){
  $('#discard-test-question-prompt').addClass("d-none");
  $('#discard-phase-end-result').removeClass('d-none');
  discardPhaseEndDisplayTestResult();
}



/**************************************
  Pulling in functions one by one
**************************************/

function set_question_groups_for_round(items_ary){
  shuffle(items_ary);
  push_question_groups_into_round(items_ary);
  update_seen_items(round.question_groups);
  shuffle(round.question_groups);
}


// For phase two: the first three rounds we only want the non-discarded items
function set_question_groups_for_round_phase_two_init_three_rounds(){
  const ary_items_non_discarded = [];
  for (item of all_items) {
    if (item.discarded == false) {
      ary_items_non_discarded.push(item);
    }
  }
  shuffle(ary_items_non_discarded);
  set_question_groups_for_round(ary_items_non_discarded);
}


// Given the array of Items passed in, it groups them into 5 core values each
// This function does it's best to group the core values together with ones that have not been compared before.
function push_question_groups_into_round(ary_of_items){
  //sanity check: a round should have all the question groups cleared whenever this function is called
  round.question_groups = []

  // sanity check: init this state tracker for all items
  for (let i = 0; i < ary_of_items.length; i++) {
    ary_of_items[i].is_assigned_question_group = false;
  }

  // For loop creating a question group.
  for (let i = 0; i < ary_of_items.length; i+=5) {
    var new_question_group = [];

    // Add the four remaining items to the question group
    // Priority (done here) is to create unique question groups (meaning: no items have seen each other yet in a test question)
    for (let ii = 0; ii < ary_of_items.length; ii++) {
      if( (new_question_group.length < 5) && (ary_of_items[ii].is_assigned_question_group == false) && projected_item_never_seen_by_other_questions_within_group(new_question_group, ary_of_items[ii]) ) {
          new_question_group.push(ary_of_items[ii]);
          ary_of_items[ii].is_assigned_question_group = true;
      } else {
        for (let iii = 0; iii < ary_of_items.length; iii++) {
          if( (new_question_group.length < 5) && (ary_of_items[iii].is_assigned_question_group == false) && projected_item_never_seen_by_other_questions_within_group(new_question_group, ary_of_items[iii]) ) {
            new_question_group.push(ary_of_items[iii]);
            ary_of_items[iii].is_assigned_question_group = true;
          }
        }
      }
    }

    // Especially in later rounds, not all question groups can be completely unique (meaning every core value item has not yet been compared to ANY other core value)
    // Here we ensure that each question group is completed, even if it is not unique
    if(new_question_group.length < 5){
      for (let iii = 0; iii < ary_of_items.length; iii++) {
        if( (new_question_group.length < 5) && (ary_of_items[iii].is_assigned_question_group == false) ) {
          new_question_group.push(ary_of_items[iii]);
          ary_of_items[iii].is_assigned_question_group = true;
        }
      }
    }

    round.question_groups.push(new_question_group);
  } // For loop creating a question group.

  // Now that all the questions are pushed into the round:
  // we can reset the is_assigned_question_group state tracker
  for (let i = 0; i < ary_of_items.length; i++) {
    ary_of_items[i].is_assigned_question_group = false;
  }
}


function projected_item_never_seen_by_other_questions_within_group(question_group, projected_item_to_add) {
  // iterate through items without question_group
  for (let i = 0; i < question_group.length; i++) {
    // iterate through the seen_items for a particular item within the question_group
    for (let ii = 0; ii < question_group[i].seen_items.length; ii++) {
      if(question_group[i].seen_items[ii] == projected_item_to_add){
        return false;
      }
    }
  }
  // no items within the question group have been compared to the projected_item_to_add
  return true;
}


function resetQuestionDetails(questionDetails) {
  questionDetails.first_place_item = null;
  questionDetails.second_place_item = null;
  questionDetails.third_place_item =  null;
  questionDetails.fourth_place_item =  null;
  questionDetails.fifth_place_item =  null;
  questionDetails.question_pick_counter = 0;
}


function populateQuestionButtons(round) {
  $('.test-question-btn').each(function(index){
    // console.log("index: " + index);
    // console.log("question group index: " + round.question_group_index);
    // console.log(round);
    $(this).html(round.question_groups[round.question_group_index][index].name);
    $(this).attr("data-id", round.question_groups[round.question_group_index][index].id);
  });
}


function item_not_in_group(item, group) {
  for (let test_item in group) {
    if(item == test_item) {
      return false;
    }
  }
  return true;
}


function setQuestionFirstSecondThirdPlace(item, questionDetails) {
  if(questionDetails.question_pick_counter == 1){
    questionDetails.first_place_item = item;
  } else if(questionDetails.question_pick_counter == 2){
    questionDetails.second_place_item = item;
  } else if(questionDetails.question_pick_counter == 3){
    questionDetails.third_place_item = item;
  }
}


function setWasSel(item){
  item.wasSel = true;
}


function setQuestionLastPlaces(item_group, questionDetails) {
  for (let i = 0; i < item_group.length; i++) {
    if((item_group[i].wasSel == false) && questionDetails.fourth_place_item == null){
      questionDetails.fourth_place_item = item_group[i];
      setWasSel(item_group[i]);
    } else if ((item_group[i].wasSel == false) && questionDetails.fourth_place_item != null){
      questionDetails.fifth_place_item = item_group[i];
      setWasSel(item_group[i]);
    }
  }
}


function processDisplayQuestionResults(){
  $('#test-question-prompt').addClass("d-none");
  $('#test-question-result').removeClass('d-none');
  displayTestResult(questionDetails, $('#test-question-result-data'));
  if(round.round_counter == 5 && round.question_group_index == 1){
    $('#test-finish-btn').removeClass('d-none');
  } else{
    $('#test-question-continue').removeClass('d-none');
  }
}


// Pulled In
// The Fisher Yates Method
function shuffle(ary) {
  for (let i = ary.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = ary[i];
    ary[i] = ary[j];
    ary[j] = k;
  }
  ary
}

function findById(id, ary) {
  for (let i in ary) {
    if(ary[i].id == id){
      return ary[i];
    }
  }
}

function update_seen_items(round_question_groups) {
  for (let question_group_index in round_question_groups) {
    for (let item_index in round_question_groups[question_group_index]) {
      for (let item_to_test_seen_index in round_question_groups[question_group_index]) {
        if( (round_question_groups[question_group_index][item_index] != round_question_groups[question_group_index][item_to_test_seen_index]) && (item_not_in_group(round_question_groups[question_group_index][item_to_test_seen_index], round_question_groups[question_group_index][item_index].seen_items)) ) {
           round_question_groups[question_group_index][item_index].seen_items.push(round_question_groups[question_group_index][item_to_test_seen_index]);
        }
      }
    }
  }
}


function displayTestResult(questionDetails, el){
  let resultText = "1st: " + questionDetails.first_place_item.name + "<br>" + "2nd: " + questionDetails.second_place_item.name + "<br>" + "3rd: " + questionDetails.third_place_item.name + "<br>" + "(Last Places: " + questionDetails.fourth_place_item.name + ", " + questionDetails.fifth_place_item.name + ")";
  $(el).html(resultText);
}


function resetWasSelOnQuestionItems(questionItems) {
  for (let i in questionItems) {
    questionItems[i].wasSel = false;
  }
}


function save_question_answer(questionDetails) {
  questionDetails.first_place_item.weightedVal+=2;
  questionDetails.second_place_item.weightedVal++;
  questionDetails.third_place_item.weightedVal+= 0;
  questionDetails.fourth_place_item.weightedVal--;
  questionDetails.fifth_place_item.weightedVal--;
}


function round_is_complete(){
  // first three rounds have 20 items. Thus 4 question groups.
  if((round.round_counter == 1 || round.round_counter == 2 || round.round_counter == 3) && (round.question_group_index == 4)){
    return true;
  // 4th round has 15 items. Thus 3 question groups.
  } else if((round.round_counter == 4) && round.question_group_index == 3) {
    return true;
  // 5th round has 10 items. Thus 2 question groups
  } else if((round.round_counter == 5) && round.question_group_index == 2) {
    return true;
  }
  return false;
}


// This function assumes it is being called at the end of a round
// It removes the hardcoded amount of items, given what round has just ended
// As long as it isn't the end of Round 5 (becuase end of round 5 is the end of the entire test) It also popuulates the question groups for the next round
function processQuestionsForEndOfRound(){
  // console.log("Working on processQuestionsForEndOfRound");
  // console.log(all_items);
  if(round.round_counter == 1){
    // console.log("processQuestionsForEndOfRound: it is round 1");
    // This is simple: No state updating for items removed
    set_question_groups_for_round_phase_two_init_three_rounds(all_items);
  } else if(round.round_counter == 2) {
    // console.log("processQuestionsForEndOfRound: it is round 2");
    // This is simple: No state updating for items removed
    set_question_groups_for_round_phase_two_init_three_rounds(all_items);
  } else if(round.round_counter == 3) {
    // Must set removed field on item to true, and also set round_removed field
    // Ideally: remove 40%.
    // For ease of the 5-item question groups: removing 5 items (15 items remaining)
    sortByTestRank(all_items);
    for(let item_index in all_items) {
      if(item_index >= 15) {
        all_items[item_index].removed = true;
        if(all_items[item_index].round_removed != "Discarded - Phase 1") {
          all_items[item_index].round_removed = round.round_counter;
        }
      }
    }

    var items_after_removal = []
    for(let item_index in all_items) {
      if(all_items[item_index].removed == false){
        items_after_removal.push(all_items[item_index]);
      }
    }
    set_question_groups_for_round(items_after_removal);

  } else if(round.round_counter == 4) {
    // Must set removed field on item to true, and also set round_removed field
    // Ideally: remove 40%
    // For ease of the 5-item question groups: removing 5 items (10 items remaining)
    var remaining_items = [];
    for(let item_index in all_items) {
      if(all_items[item_index].removed == false){
        remaining_items.push(all_items[item_index]);
      }
    }
    sortByTestRank(remaining_items);
    for(let item_index in remaining_items) {
      if(item_index >= 10) {
        remaining_items[item_index].removed = true;
        remaining_items[item_index].round_removed = round.round_counter;
      }
    }

    var items_after_removal = []
    for(let item_index in all_items) {
      if(all_items[item_index].removed == false){
        items_after_removal.push(all_items[item_index]);
      }
    }
    set_question_groups_for_round(items_after_removal);
  } else if(round.round_counter == 5) {
    // Must set removed field on item to true, and also set round_removed field
    // Round 6 We simply round to removing the bottom 10 items to allow the user to focus on the top 10
    var remaining_items = [];
    for(let item_index in all_items) {
      if(all_items[item_index].removed == false){
        remaining_items.push(all_items[item_index]);
      }
    }
    sortByTestRank(remaining_items);
    for(let item_index in remaining_items) {
      if(item_index >= 6) {
        remaining_items[item_index].removed = true;
        remaining_items[item_index].round_removed = round.round_counter;
      }
    }
  }
}


function sortByTestRank(ary) {
    return ary.sort(function(a, b){return b.weightedVal-a.weightedVal});
}


function update_ranking_progress_bar(){
  total_ranking_questions_answered++;
  var progress = Math.round((total_ranking_questions_answered / 17) * 100) + '%';
  $('#ranking-progress-bar').width(progress);
  $('#ranking-progress-num-display').text(total_ranking_questions_answered);
  if(total_ranking_questions_answered >= 1) {
    $('#ranking_progress_percentage_inside_progress_bar').text(progress);
  }
}


function update_value_rankings_display(){
  sortByTestRank(all_items);

  if(all_rounds_are_completed()) {
    $('#topTenValuesTableResultMsg').removeClass('d-none');

    $('#valueRankingsDisplay').removeClass('d-none');
    $('#valueRankingsDisplay').find('tbody').empty();
    for (let i in all_items) {
        if(all_items[i].round_removed == null) {
          $('#valueRankingsDisplay').find('tbody').append("<tr><td>" + all_items[i].name + "</td><td>" + all_items[i].weightedVal + "</td></tr>");
        }
    }
  }

  if(debugging_flag == true || all_rounds_are_completed()) {
    $('#fullTableResultsMsg').removeClass('d-none');

    $('#valueRankingsDisplayFull').removeClass('d-none');
    $('#valueRankingsDisplayFull').find('tbody').empty();

    for (let i in all_items) {
      $('#valueRankingsDisplayFull').find('tbody').append("<tr><td>" + all_items[i].name + "</td><td>" + all_items[i].weightedVal + "</td><td>" + display_round_removed(all_items[i]) + "</td></tr>");
    }
  }
}


// There are 5 total rounds.  If the counter says Round 6: then the 5 rounds are all complete.
function all_rounds_are_completed() {
  if(round.round_counter == 6) {
    return true;
  } else {
    return false;
  }
}


function display_round_removed(item) {
  if(item.round_removed == null){
     return " "
  } else {
    return item.round_removed
  }
}
