const Respondent = require('./respondent.model');

async function list(conditions = {}, paging = {}) {
  console.log(paging);
  return (
    Respondent.find(conditions)
      .skip(paging.offset)
      .limit(paging.limit)
      .sort(paging.sort)
      .lean()
  );
}

async function count(conditions = {}) {
  return Respondent.countDocuments(conditions);
}

module.exports = {
  list,
  count,
};
