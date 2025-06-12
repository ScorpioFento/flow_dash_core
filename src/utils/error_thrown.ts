import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

function throw400BadRequestError(title: string, message: string): never {
  throw new BadRequestException(title, {
    cause: new Error(),
    description: message,
  });
}

function throwUnauthorizedError(title: string, message: string): never {
  throw new UnauthorizedException(title, {
    cause: new Error(),
    description: message,
  });
}

function throw404NotFoundError(title: string, message: string): never {
  throw new NotFoundException(title, {
    cause: new Error(),
    description: message,
  });
}

export {
  throw400BadRequestError,
  throwUnauthorizedError,
  throw404NotFoundError,
};
