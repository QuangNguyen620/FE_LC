import { get } from 'lodash';

const getItemRatingOptions = (config) => {
  return get(config, 'category.rating_values', []).map((item) => ({
    label: item.name,
    value: item.value,
  }));
};

const getItemRatingRepo = (config) => {
  return get(config, 'category.rating_values', []).reduce(
    (prev, { value, name }) => {
      prev[value] = name;
      return prev;
    },
    {},
  );
};

const getItemStatusRepo = (config) => {
  return get(config, 'category.item_status', {});
};

const getItemStatusValues = (config) => {
  return Object.keys(get(config, 'category.item_status', {}));
};

const getItemStatusOptions = (config) => {
  return Object.entries(getItemStatusRepo(config)).map(([value, label]) => ({
    label,
    value,
  }));
};

const getItemDifficultLevelRepo = (config) => {
  return get(config, 'category.item_difficult_levels', []).reduce(
    (prev, { value, name }) => {
      prev[value] = name;
      return prev;
    },
    {},
  );
};

const getItemDifficultLevelOptions = (config) => {
  return get(config, 'category.item_difficult_levels', []).map((item) => ({
    label: item.name,
    value: item.value,
  }));
};

const getItemLevelOptions = (config) => {
  return get(config, 'category.item_levels', []).map((item) => ({
    label: item.name,
    value: item.value,
  }));
};

const getItemLevelRepo = (config) => {
  return get(config, 'category.item_levels', []).reduce(
    (prev, { value, name }) => {
      prev[value] = name;
      return prev;
    },
    {},
  );
};

const getItemTypeOptions = (config) => {
  return get(config, 'category.item_types', []).map((item) => ({
    label: item.name,
    value: item.value,
  }));
};

const getItemTypeRepo = (config) => {
  return get(config, 'category.item_types', []).reduce(
    (prev, { value, name }) => {
      prev[value] = name;
      return prev;
    },
    {},
  );
};

const getConfigTags = (config) => {
  const configTags = {};

  config.grades.forEach((grade) => {
    configTags[grade.value] = grade.label;
  });

  config.subjects.forEach((subject) => {
    configTags[subject.value] = subject.label;
  });

  return configTags;
};

const getSubjectRepo = (config) => {
  return get(config, 'subjects', []).reduce((prev, { value, label }) => {
    prev[value] = label;
    return prev;
  }, {});
};

const getSubjectOptions = (config) => {
  return get(config, 'subjects', []);
};

const getGradeRepo = (config) => {
  return get(config, 'grades', []).reduce((prev, { value, label }) => {
    prev[value] = label;
    return prev;
  }, {});
};

const getGradeOptions = (config) => {
  return get(config, 'grades', []);
};

const getClassStatusRepo = (config) => {
  return get(config, 'category.class_status', {});
};

const getClassStatusOptions = (config) => {
  return Object.entries(getClassStatusRepo(config)).map(([value, label]) => ({
    label,
    value,
  }));
};

const getTagOptions = (config) => {
  return get(config, 'tags', []);
};

const getKTOVersion = () => {
  return localStorage.getItem('subscription_version');
};

export {
  // Item
  getItemLevelRepo,
  getItemLevelOptions,
  getItemRatingRepo,
  getItemRatingOptions,
  getItemStatusRepo,
  getItemStatusOptions,
  getItemDifficultLevelRepo,
  getItemDifficultLevelOptions,
  getItemTypeRepo,
  getItemTypeOptions,
  getConfigTags,
  getSubjectRepo,
  getGradeRepo,
  getGradeOptions,
  getSubjectOptions,
  getItemStatusValues,
  getClassStatusRepo,
  getClassStatusOptions,
  getTagOptions,
  getKTOVersion,
};
