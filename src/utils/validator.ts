import { Rule, Validators } from 'src/types';

export const validateFields = <T>(fields: Rule<T>[], body: T) =>
  fields
    .map(({ field, isCorrect: check, getMessage }) => (check(body) ? '' : getMessage(field)))
    .filter(Boolean);

export const validatorMapping: Record<Validators, (value: unknown) => boolean> = {
  string: (value: unknown) => {
    if (typeof value !== 'string') return false;
    return !!value;
  },
  positiveNumber: (value: unknown) => {
    if (typeof value !== 'number') return false;
    if (value < 0) return false;
    return true;
  },
};

export const validateProperties = <T extends string>(
  properties: T[],
  ropertiesList: { property: T; type: Validators }[],
  data: { [key: string]: unknown }
) => {
  return ropertiesList
    .filter((item) => properties.includes(item.property))
    .map((item) => {
      const value = data[item.property];
      const validator = validatorMapping[item.type];
      return validator(value) ? '' : `The ${item.property} property is required!`;
    })
    .filter(Boolean);
};
