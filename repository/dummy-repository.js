const uuid = require('uuid').v1;
const context = {};
module.exports = function (contextName) {
  return {
    findAll: function () {
      return Object.values(getContext(contextName));
    },
    insert: function (data) {
      const _id = uuid();
      data._id = _id;
      getContext(contextName)[_id] = data;
      return getContext(contextName)[_id];
    },
    update: function (_id, data) {
      return Object.assign(getContext(contextName)[_id], data);
    },
    findById: function (_id) {
      return getContext(contextName)[_id];
    }
  }
}

function getContext(contextName) {
  if (!context[contextName]) {
    context[contextName] = [];
  }
  return context[contextName];
}