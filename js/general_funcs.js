function findById(id, ary) {
  for (let i in ary) {
    if(ary[i].id == id){
      return ary[i];
    }
  }
}

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

function sortByTestRank(ary) {
    return ary.sort(function(a, b){return b.weightedVal-a.weightedVal});
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

function setWasSel(item){
  item.wasSel = true;
}

function displayTestResult(questionDetails, el){
  let resultText = "1st: " + questionDetails.first_place_item.name + "<br>" + "2nd: " + questionDetails.second_place_item.name + "<br>" + "3rd: " + questionDetails.third_place_item.name + "<br>" + "(Last Places: " + questionDetails.fourth_place_item.name + ", " + questionDetails.fifth_place_item.name + ")";
  $(el).html(resultText);
}


function resetQuestionDetails(questionDetails) {
  questionDetails.first_place_item = null;
  questionDetails.second_place_item = null;
  questionDetails.third_place_item =  null;
  questionDetails.fourth_place_item =  null;
  questionDetails.fifth_place_item =  null;
  questionDetails.question_pick_counter = 0;
}

function resetWasSelOnQuestionItems(questionItems) {
  for (let i in questionItems) {
    questionItems[i].wasSel = false;
  }
}

function set_question_groups_for_round(items_ary){
  shuffle(items_ary);
  push_question_groups_into_round(items_ary);
  update_seen_items(round.question_groups);
  shuffle(round.question_groups);
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

function update_progress_bar(){
  total_test_questions_answered++;
  var progress = Math.round((total_test_questions_answered / 76) * 100) + '%';
  $('#test-progress-bar').width(progress);
  $('#progress-num-display').text(total_test_questions_answered);
  if(total_test_questions_answered >= 5) {
    $('#progress_percentage_inside_progress_bar').text(progress);
  }
}


function save_question_answer(questionDetails) {
  questionDetails.first_place_item.weightedVal+=2;
  questionDetails.second_place_item.weightedVal++;
  questionDetails.third_place_item.weightedVal+= 0;
  questionDetails.fourth_place_item.weightedVal--;
  questionDetails.fifth_place_item.weightedVal--;
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

function display_round_removed(item) {
  if(item.round_removed == null){
     return " "
  } else {
    return item.round_removed
  }
}

function processDisplayQuestionResults(){
  $('#test-question-prompt').addClass("d-none");
  $('#test-question-result').removeClass('d-none');
  displayTestResult(questionDetails, $('#test-question-result-data'));
  if(round.round_counter == 6 &&  round.question_group_index == 3){
    $('#test-finish-btn').removeClass('d-none');
  } else{
    $('#test-question-continue').removeClass('d-none');
  }
}



function round_is_complete(){
  if((round.round_counter == 1 || round.round_counter == 2 || round.round_counter == 3) && (round.question_group_index == 18)){
    return true;
  } else if((round.round_counter == 4) && round.question_group_index == 11) {
    return true;
  } else if((round.round_counter == 5) && round.question_group_index == 7) {
    return true;
  } else if((round.round_counter == 6) && round.question_group_index == 4) {
    return true;
  }
  return false;
}

// There are 6 total rounds.  If the counter says Round 7: then the 6 rounds are all complete.
function all_rounds_are_completed() {
  if(round.round_counter == 7) {
    return true;
  } else {
    return false;
  }
}

// This function assumes it is being called at the end of a round
// It removes the hardcoded amount of items, given what round has just ended
// As long as it isn't the end of Round 6 (becuase end of round 6 is the end of the entire test) It also popuulates the question groups for the next round
function processQuestionsForEndOfRound(){
  // console.log("Working on processQuestionsForEndOfRound");
  // console.log(all_items);
  if(round.round_counter == 1){
    // console.log("processQuestionsForEndOfRound: it is round 1");
    // This is simple: No state updating for items removed
    set_question_groups_for_round(all_items);
  } else if(round.round_counter == 2) {
    // console.log("processQuestionsForEndOfRound: it is round 2");
    // This is simple: No state updating for items removed
    set_question_groups_for_round(all_items);
  } else if(round.round_counter == 3) {
    // Must set removed field on item to true, and also set round_removed field
    // Ideally: remove 40%, for 90 items that would be removing 36 items
    // For ease of the 5-item question groups: removing 35 items (55 items remaining)
    sortByTestRank(all_items);
    for(let item_index in all_items) {
      if(item_index >= 55) {
        all_items[item_index].removed = true;
        all_items[item_index].round_removed = round.round_counter;
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
    // Ideally: remove 40%, for 55 remaining items that would be removing 22 items
    // For ease of the 5-item question groups: removing 20 items (35 items remaining)
    var remaining_items = [];
    for(let item_index in all_items) {
      if(all_items[item_index].removed == false){
        remaining_items.push(all_items[item_index]);
      }
    }
    sortByTestRank(remaining_items);
    for(let item_index in remaining_items) {
      if(item_index >= 35) {
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
    // Ideally: remove 40%, for 35 remaining items that would be removing 14 items
    // For ease of the 5-item question groups: removing 15 items (20 items remaining)
    var remaining_items = [];
    for(let item_index in all_items) {
      if(all_items[item_index].removed == false){
        remaining_items.push(all_items[item_index]);
      }
    }
    sortByTestRank(remaining_items);
    for(let item_index in remaining_items) {
      if(item_index >= 20) {
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
  } else if(round.round_counter == 6) {
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
      if(item_index >= 10) {
        remaining_items[item_index].removed = true;
        remaining_items[item_index].round_removed = round.round_counter;
      }
    }
  }
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

function item_not_in_group(item, group) {
  for (let test_item in group) {
    if(item == test_item) {
      return false;
    }
  }
  return true;
}
