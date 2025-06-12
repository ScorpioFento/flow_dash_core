import { ILike } from 'typeorm';
interface PaginationResult<T> {
  data: T[];
  total: number;
  current_page: number;
  per_page: number;
}

function paginationHandler<T>(
  result: T[],
  total: number,
  current: number,
  limit: number,
): PaginationResult<T> {
  return {
    data: result,
    total,
    current_page: current,
    per_page: limit,
  };
}

function queryHandler(requestQuery: any, queryObject: any) {
  let query: any = {
    take: requestQuery.per_page,
    skip: (requestQuery.page_number - 1) * requestQuery.per_page,
  };

  if (
    requestQuery.order_type &&
    requestQuery.order_by &&
    queryObject.order.includes(requestQuery.order_by)
  ) {
    query.order = { [requestQuery.order_by]: `${requestQuery.order_type}` };
  }

  for (let i of queryObject.filter) {
    switch (true) {
      case requestQuery[i.name] &&
        requestQuery[i.name] !== '' &&
        i.type === 'string':
        query.where = {
          ...query.where,
          [i.name]:
            i.key === 'ILike'
              ? ILike(`%${requestQuery[i.name]}%`)
              : requestQuery[i.name],
        };
        break;
      case requestQuery[i.name] &&
        requestQuery[i.name] !== '' &&
        i.type === 'Id':
        query.where = {
          ...query.where,
          [i.name]: requestQuery[i.name],
        };
      case requestQuery[i.name] &&
        requestQuery[i.name] !== '' &&
        i.type === 'number':
        break;
      case requestQuery[i.name] &&
        requestQuery[i.name] !== '' &&
        i.type === 'boolean':
        query.where = {
          ...query.where,
          [i.name]: requestQuery[i.name] === 'false' ? false : true,
        };
        break;
      default:
        break;
    }
  }

  return query;
}

export { paginationHandler, queryHandler };
