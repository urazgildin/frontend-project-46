import _ from 'lodash';

const buildTree = (ob1, ob2) => {
  const uniqKeys = _.union(Object.keys(ob1), Object.keys(ob2));
  const sortedUniqKeys = _.sortBy(uniqKeys);
  const collOfDifferences = sortedUniqKeys.map((uniqKey) => {
    if (!Object.hasOwn(ob1, uniqKey)) {
      return { key: uniqKey, value: ob2[uniqKey], type: 'added' };
    }
    if (!Object.hasOwn(ob2, uniqKey)) {
      return { key: uniqKey, value: ob1[uniqKey], type: 'deleted' };
    }
    if (_.isPlainObject(ob1[uniqKey]) && _.isPlainObject(ob2[uniqKey])) {
      return { key: uniqKey, children: buildTree(ob1[uniqKey], ob2[uniqKey]), type: 'nested' };
    }
    if (!_.isEqual(ob1[uniqKey], ob2[uniqKey])) {
      return {
        key: uniqKey, value1: ob1[uniqKey], value2: ob2[uniqKey], type: 'changed',
      };
    }
    return { key: uniqKey, value: ob2[uniqKey], type: 'unchanged' };
  });
  return collOfDifferences;
};

export default buildTree;
