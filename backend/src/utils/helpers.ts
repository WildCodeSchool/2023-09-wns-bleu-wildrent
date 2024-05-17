export type ObjType = { [key: string]: string | number };

export function getValidProperties(obj: ObjType) {
  const validObj = {} as ObjType;

  for (const key in obj) {
    if (key in obj) {
      if (obj[key]) {
        validObj[key] = obj[key];
      }
    }
  }

  return validObj;
}
