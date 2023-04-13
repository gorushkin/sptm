export type Rule<T> = {
  field: string;
  isCorrect: (user: T) => boolean;
  getMessage: (field: string) => string;
};

export const validateFields = <T>(fields: Rule<T>[], body: T) =>
  fields
    .map(({ field, isCorrect: check, getMessage }) => (check(body) ? '' : getMessage(field)))
    .filter(Boolean);
