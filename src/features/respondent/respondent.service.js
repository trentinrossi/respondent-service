const pagingHelper = require('../../helpers/paging.helper');
const filterHelper = require('../../helpers/filter.helper');
const repository = require('./respondent.repository');

async function list(params) {
  const query = filterHelper.build(params);
  const paging = pagingHelper.build(params);
  const total = await repository.count(query);
  const data = await repository.list(query, paging);

  return {
    meta: pagingHelper.resolve(paging, total),
    data,
  };
}

module.exports = {
  list,
};
