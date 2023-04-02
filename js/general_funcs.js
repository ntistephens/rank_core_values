function questionPickCounterPlusPlus(questionDetails){
  questionDetails.questionPickCounter++;
}

function roundCounterPlusPlus(round){
  round.question_group_counter++;
}

function findById(id, ary) {
  for (let i in ary) {
    if(ary[i].id == id){
      return ary[i];
    }
  }
}

function setQuestionFirstOrSecondPlace(item, questionDetails) {
  if(questionDetails.questionPickCounter == 0){
    questionDetails.first_place_item = item;
  } else if(questionDetails.questionPickCounter == 1){
    questionDetails.second_place_item = item;
  }
};

function setQuestionThirdPlace(item_group, questionDetails) {
  for (let i = 0; i < item_group.length; i++) {
    if(item_group[i].wasSel == false){
      questionDetails.third_place_item = item_group[i];
      setWasSel(item_group[i]);
      break;
    }
  }
}

function setWasSel(item){
  item.wasSel = true;
}

function displayTestResult(questionDetails, el){
  let resultText = "1st: " + questionDetails.first_place_item.name + ", " + "2nd: " + questionDetails.second_place_item.name + ", " + "3rd: " + questionDetails.third_place_item.name;
  $(el).text(resultText);
}


function resetQuestionDetails(questionDetails) {
  questionDetails.first_place_item = null;
  questionDetails.second_place_item = null;
  questionDetails.third_place_item =  null;
  questionDetails.questionPickCounter = 0;
}

function resetWasSelOnQuestionItems(questionItems) {
  for (let i in questionItems) {
    questionItems[i].wasSel = false;
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

function set_question_groups_for_round_one(round, items) {
  shuffle(items);
  for (let i = 0; i < items.length; i+=3) {
    round.question_groups.push( [items[i], items[i + 1], items[i + 2]] );
    items[i].seen_items.push(items[i + 1]);
    items[i].seen_items.push(items[i + 2]);
    items[i + 1].seen_items.push(items[i]);
    items[i + 1].seen_items.push(items[i + 2]);
    items[i + 2].seen_items.push(items[i]);
    items[i + 2].seen_items.push(items[i + 1]);
  }
}

function populateQuestionButtons(round) {
  $('.test-question-btn').each(function(index){
    $(this).html(round.question_groups[round.question_group_counter][index].name);
    $(this).attr("data-id", round.question_groups[round.question_group_counter][index].id);
  });
}


function save_question_answer(questionDetails) {
  questionDetails.first_place_item.weightedVal++;
  questionDetails.third_place_item.weightedVal--;
}


function update_value_rankings_display(){
  $('#valueRankingsDisplay').find('tbody').empty();
  sortByTestRank(all_items);
  for (let i in all_items) {
      $('#valueRankingsDisplay').find('tbody').append("<tr><td>" + all_items[i].name + "</td><td>" + all_items[i].weightedVal + "</td></tr>");
  }
}


function sortByTestRank(ary) {
    return ary.sort(function(a, b){return b.weightedVal-a.weightedVal});
}

function determineContinueDisplayAtQuestionResults(){
 // Within rounds 1-3 AND context is not after the 30th question
 if ( ((round.round_counter == 0) || (round.round_counter == 1) (round.round_counter == 2)) && (round.question_group_counter != 29) ) {
   $('#test-question-continue').removeClass('d-none');
 }
}

function processDisplayQuestionResults(){
  $('#test-question-prompt').addClass("d-none");
  $('#test-question-result').removeClass('d-none');
  displayTestResult(questionDetails, $('#test-question-result-data'));
  $('#test-question-continue').removeClass('d-none');
  determineContinueDisplayAtQuestionResults();
}
