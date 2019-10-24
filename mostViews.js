class Topic {
  constructor(id) {
    this.id = id;
    this.userViews = {};
  }

  addToViews(userId, views) {
    if (!this.userViews.hasOwnProperty(userId)) {
      this.userViews[userId] = 0;
    }
    this.userViews[userId] += views;
  }
}

function mostViewedWriters(topicIds, answerIds, views) {
  const topicViews = {};
  const topicList = [];
  topicIds.forEach(question => {
    question.forEach(topicId => {
      if (!topicViews.hasOwnProperty(topicId)) {
        topicViews[topicId] = new Topic(topicId);
        topicList.push(topicId);
      }
    });
  });
  views.forEach(answer => {
    const answerId = answer[0];
    const userId = answer[1];
    const viewCount = answer[2];
    let questionId = answerIds.findIndex(element => {
      return element.indexOf(answerId) != -1;
    });

    const topics = topicIds[questionId];
    topics.forEach(topicId => {
      topicViews[topicId].addToViews(userId, viewCount);
    });
  });
  topicList.sort((a, b) => a - b);

  const results = [];
  let counter = 0;

  // build the output
  topicList.forEach(topicId => {
    let topicResults = Object.entries(topicViews[topicId].userViews);
    topicResults = topicResults.map(element => [
      parseInt(element[0]),
      element[1]
    ]);
    topicResults.sort((a, b) => b[1] - a[1]);
    results[counter++] = topicResults;
  });
  return results;
}
