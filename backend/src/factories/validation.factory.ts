import {
  UnprocessableEntityException,
  type ValidationError,
} from '@nestjs/common';

function extractErrors(errors: ValidationError[]) {
  const result = {};
  errors.forEach((err) => {
    if (err.constraints) {
      result[err.property] = Object.values(err.constraints);
    }
    if (err.children && err.children.length > 0) {
      result[err.property] = extractErrors(err.children);
    }
  });
  return result;
}

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const formattedErrors = extractErrors(errors);

  return new UnprocessableEntityException({
    status: 'UNPROCESSABLE_ENTITY',
    message: 'The given data was invalid.',
    errors: formattedErrors,
  });
};
