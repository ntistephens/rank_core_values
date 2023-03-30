function questionPickCounterPlusPlus(questionDetails){
  questionDetails.questionPickCounter++;
}

function findById(id, ary) {
  for (let i in ary) {
    if(ary[i].id == id){
      return ary[i];
    }
  }
}

function setQuestionFirstOrSecondPlace(item, questionDetails) {
  if(questionDetails.questionPickCounter == 1){
    questionDetails.first_place_item = item;
  } else if(questionDetails.questionPickCounter == 2){
    questionDetails.second_place_item = item;
  }
};

function setQuestionThirdPlace(questionItems, questionDetails) {
  for (let i in questionItems) {
    if(questionItems[i].wasSel == false){
      questionDetails.third_place_item = questionItems[i];
      // for good measure, go ahead and set that the 3rd place item was selected
      setWasSel(questionItems[i])
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

function set_question_groups_for_round(round, items) {
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
    $(this).html(round.question_groups[round.round_counter][index].name);
    $(this).attr("data-id", round.question_groups[round.round_counter][index].id);
  });
  round.round_counter++;
}






/*
  When the counter is 1, that means the item was the top choice in a test. Increment the weighted value by 1.
  When the counter is 2, that means the item was the second choice in the test.  Increment by 0, so Noop.
*/
function adjustWeightForPick(counter, item) {
  if(counter == 1){
    item.weightedVal += 100;
  } else if(counter == 2){
    //noop
  }
}


function sortByTestRank(ary) {
    return ary.sort(function(a, b){return a.testRank-b.testRank});

}
