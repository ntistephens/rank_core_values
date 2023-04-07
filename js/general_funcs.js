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


// function setQuestionFirstOrSecondPlace(item, questionDetails) {
//   if(questionDetails.question_pick_counter == 1){
//     questionDetails.first_place_item = item;
//   } else if(questionDetails.question_pick_counter == 2){
//     questionDetails.second_place_item = item;
//   }
// }

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


// function setQuestionThirdPlace(item_group, questionDetails) {
//   for (let i = 0; i < item_group.length; i++) {
//     if(item_group[i].wasSel == false){
//       questionDetails.third_place_item = item_group[i];
//       setWasSel(item_group[i]);
//       break;
//     }
//   }
// }

function setWasSel(item){
  item.wasSel = true;
}

function displayTestResult(questionDetails, el){
  let resultText = "1st: " + questionDetails.first_place_item.name + ", " + "2nd: " + questionDetails.second_place_item.name + ", " + "3rd: " + questionDetails.third_place_item.name + " (Last Places: " + questionDetails.fourth_place_item.name + ", " + questionDetails.fifth_place_item.name + ")";
  $(el).text(resultText);
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


function set_question_groups_for_round_two_or_three() {
  sortByTestRank(all_items);
  var top_tier = [];
  var middle_tier = [];
  var bottom_tier = [];

  // place all items into proper tier
  for (let i = 0; i < all_items.length; i++) {
    if(i <= 29) {
      top_tier.push(all_items[i]);
    } else if (i <= 59) {
      middle_tier.push(all_items[i]);
    } else {
      bottom_tier.push(all_items[i]);
    }
  }

  shuffle(top_tier);
  shuffle(middle_tier);
  shuffle(bottom_tier);

  push_question_groups_into_round(top_tier);
  push_question_groups_into_round(middle_tier);
  push_question_groups_into_round(bottom_tier);

  update_seen_items(round.question_groups);

  shuffle(round.question_groups);
}





function populateQuestionButtons(round) {
  $('.test-question-btn').each(function(index){
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
  $('#valueRankingsDisplay').find('tbody').empty();
  sortByTestRank(all_items);
  for (let i in all_items) {
      $('#valueRankingsDisplay').find('tbody').append("<tr><td>" + all_items[i].name + "</td><td>" + all_items[i].weightedVal + "</td></tr>");
  }
}




function processDisplayQuestionResults(){
  $('#test-question-prompt').addClass("d-none");
  $('#test-question-result').removeClass('d-none');
  displayTestResult(questionDetails, $('#test-question-result-data'));
  $('#test-question-continue').removeClass('d-none');
  determineContinueDisplayAtQuestionResults();
}

function determineContinueDisplayAtQuestionResults(){
 // Within rounds 1-3 AND context is not after the 30th question
 if ( ((round.round_counter == 1) || (round.round_counter == 2) (round.round_counter == 3)) && (round.question_group_index != 18) ) {
   $('#test-question-continue').removeClass('d-none');
 }
}

function round_is_complete(){
  if((round.round_counter == 1 || round.round_counter == 2 || round.round_counter == 3) && (round.question_group_index == 29)){
    return true;
  }
  return false;
}

function populate_question_groups_for_next_round(){
  if((round.round_counter == 2 || round.round_counter == 3) && (round.question_group_index == 29)){
    set_question_groups_for_round_two_or_three();
  }
}

function projected_item_never_seen_by_other_questions_within_group(question_group, projected_item_to_add) {
  for (let item_within_question_group in question_group) {
    for (let seen_item in item_within_question_group.seen_items) {
      if(seen_item == projected_item_to_add){
        return false;
      }
    }
  }
  // no items within the question group have been compared to the projected_item_to_add
  return true;
}

function set_question_groups_for_round_one() {
  shuffle(all_items);
  for (let i = 0; i < all_items.length; i+=5) {
    round.question_groups.push( [all_items[i], all_items[i + 1], all_items[i + 2], all_items[i + 3], all_items[i + 4]] );
    all_items[i].seen_items.push(all_items[i + 1]);
    all_items[i].seen_items.push(all_items[i + 2]);
    all_items[i].seen_items.push(all_items[i + 3]);
    all_items[i].seen_items.push(all_items[i + 4]);
    all_items[i + 1].seen_items.push(all_items[i]);
    all_items[i + 1].seen_items.push(all_items[i + 2]);
    all_items[i + 1].seen_items.push(all_items[i + 3]);
    all_items[i + 1].seen_items.push(all_items[i + 4]);
    all_items[i + 2].seen_items.push(all_items[i]);
    all_items[i + 2].seen_items.push(all_items[i + 1]);
    all_items[i + 2].seen_items.push(all_items[i + 3]);
    all_items[i + 2].seen_items.push(all_items[i + 4]);
    all_items[i + 3].seen_items.push(all_items[i]);
    all_items[i + 3].seen_items.push(all_items[i + 1]);
    all_items[i + 3].seen_items.push(all_items[i + 2]);
    all_items[i + 3].seen_items.push(all_items[i + 4]);
    all_items[i + 4].seen_items.push(all_items[i]);
    all_items[i + 4].seen_items.push(all_items[i + 1]);
    all_items[i + 4].seen_items.push(all_items[i + 2]);
    all_items[i + 4].seen_items.push(all_items[i + 3]);
  }
}

// Do not use if round 1 because round 1 is simple and uses function: set_question_groups_for_round_one()
function push_question_groups_into_round(ary_of_items){
  for (let i = 0; i < ary_of_items.length; i++) {
    var new_question_group = [];
    if(ary_of_items[i].is_assigned_question_group == false){
      new_question_group.push(ary_of_items[i]);
      ary_of_items[i].is_assigned_question_group = true;

      // Add the two remaining items to the question group
      // Priority (done here) is to create unique question groups (meaning: no items have seen each other yet in a test question)
      for (let ii = 0; ii < ary_of_items.length; ii++) {
        if( (new_question_group.length < 3) && (ary_of_items[ii].is_assigned_question_group == false) && (ary_of_items[i] != ary_of_items[ii]) ) {
          if(projected_item_never_seen_by_other_questions_within_group(new_question_group, ary_of_items[ii])){
            new_question_group.push(ary_of_items[ii]);
            ary_of_items[ii].is_assigned_question_group = true;
          }
        }
      }

      // Especially in later rounds, not all question groups can be unique
      // Here we ensure that each question group is completed, even if it is not unique
      if(new_question_group.length < 3){
        for (let iii = 0; iii < ary_of_items.length; iii++) {
          if( (ary_of_items[iii].is_assigned_question_group == false) && (ary_of_items[i] != ary_of_items[iii]) ) {
            new_question_group.push(ary_of_items[iii]);
            ary_of_items[iii].is_assigned_question_group = true;
          }
        }
      }

    }
    round.question_groups.push(new_question_group);
  }
}

function update_seen_items(round_question_groups) {
  for (let question_group in round_question_groups) {
    for (let item in question_group) {
      for (let item_to_test_seen in question_group) {
        if( (item != item_to_test_seen) && (item_not_in_group(item_to_test_seen, item.seen_items)) ) {
           item.seen_items.push(item_to_test_seen);
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
