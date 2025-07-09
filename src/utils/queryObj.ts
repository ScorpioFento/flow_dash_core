type QueryFilter = {
  name: string;
  type: 'string' | 'Id' | 'number' | 'boolean';
  key: 'ILike' | 'Equal';
};

type QueryObject = {
  filter: QueryFilter[];
  order: string[];
};

const QUERY_USER: QueryObject = {
  filter: [{ name: 'name', type: 'string', key: 'ILike' }],
  order: ['created_at'],
};

const QUERY_ACCESS_LVL: QueryObject = {
  filter: [{ name: 'name', type: 'string', key: 'ILike' }],
  order: ['created_at'],
};

const QUERY_WORK_SPACE: QueryObject = {
  filter: [{ name: 'name', type: 'string', key: 'ILike' }],
  order: ['created_at'],
};

const QUERY_PROJECT: QueryObject = {
  filter: [{ name: 'name', type: 'string', key: 'ILike' }],
  order: ['created_at'],
};

const QUERY_TASK: QueryObject = {
  filter: [{ name: 'name', type: 'string', key: 'ILike' }],
  order: ['created_at'],
};

const QUERY_NOTE: QueryObject = {
  filter: [{ name: 'name', type: 'string', key: 'ILike' }],
  order: ['created_at'],
};

export {
  QUERY_USER,
  QUERY_ACCESS_LVL,
  QUERY_WORK_SPACE,
  QUERY_PROJECT,
  QUERY_TASK,
  QUERY_NOTE,
};
