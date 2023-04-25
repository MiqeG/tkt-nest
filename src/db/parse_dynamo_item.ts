export default function (object: any): any {
  if (typeof object == 'undefined')
    throw { code: 'no_object', message: typeof object + ' object' };
  else if (
    typeof object == 'function' ||
    typeof object == 'bigint' ||
    typeof object == 'symbol'
  )
    throw { code: 'invalid_type', message: 'object is a ' + typeof object };
  return parse(object);
}
function parse(item: any): any {
  if (typeof item == 'undefined') return item;
  if (typeof item == 'string') return { S: item };
  if (typeof item == 'number') return { N: item.toString() };
  if (typeof item == 'boolean') return { BOOL: item };
  if (JSON.stringify(item) == 'null') return undefined;

  if (typeof item == 'object' && typeof item.push == 'function') {
    let newArray = [];
    newArray = loop(item, newArray);
    return { L: newArray };
  } else {
    let newObj = {};
    newObj = loop(item, newObj);
    return { M: newObj };
  }
}
function loop(item: any, newObj: any): any {
  for (const key in item) {
    if (item.push == 'function') newObj.push(parse(item[key]));
    else newObj[key] = parse(item[key]);
  }
  return newObj;
}
