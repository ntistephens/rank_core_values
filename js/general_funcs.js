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

function displayTestResult(questionDetails){
  let resultText = "1st: " + questionDetails.first_place_item.name + ", " + "2nd: " + questionDetails.second_place_item.name + ", " + "3rd: " + questionDetails.third_place_item.name;
  $('#prac-result-data').text(resultText);
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

function adjustTestRankForPick(counter, item) {
  if(counter == 1){
    item.testRank = 1;
  } else if(counter == 2){
  }
  item.testRank = 2;
}

function adjustWeightThirdPlace(ary) {
  for (let i in ary) {
    if(ary[i].wasSel == false){
      ary[i].weightedVal -= 10;
    }
  }
}

function adjustTestRankThirdPlace(ary) {
  for (let i in ary) {
    if(ary[i].wasSel == false){
      ary[i].testRank = 3;
    }
  }
}


function sortByTestRank(ary) {
    return ary.sort(function(a, b){return a.testRank-b.testRank});

}
