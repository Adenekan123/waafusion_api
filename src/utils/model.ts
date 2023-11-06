export const parseFields = (fields:object[] | undefined,values:string[]) =>{
  if(!fields) return [];
  console.log(fields)
    return fields.map(field => values.includes(field as unknown as  string) ? JSON.parse(field as unknown as string) : field)
  }