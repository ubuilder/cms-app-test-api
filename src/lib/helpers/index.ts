import type { Items } from '$lib/types';
import hbs from 'handlebars'

export function renderVariable<T extends (string | Record<string, any>)>(template: T, items: Items): T {
  console.log('render varible', template)
  
  if(Array.isArray(template)) {
    return template.map(x => renderVariable(x, items))
  }
  
  if (typeof template === "string") {
    return hbs.compile(`${template}`)(items) as string;
  } else if (typeof template === "object" && !Array.isArray(template)) {
    const result: any = {};

    Object.keys(template).map((key) => {
      result[key] = renderVariable(template[key], items);
    });
    return result;
  }
  return template;
}


export function slugify(str: string, separator = '_') {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " " || str[i] === "-" || str[i] === ":" || str[i] === "_") {
      result += separator;
      i++;
    }
    result += str[i].toLowerCase();
  }
  return result;
} 