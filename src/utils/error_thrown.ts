import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

function Error400BadRequest(title: string, message: string): never {
  throw new BadRequestException(title, {
    cause: new Error(),
    description: message,
  });
}

function UnauthorizedError(title: string, message: string): never {
  throw new UnauthorizedException(title, {
    cause: new Error(),
    description: message,
  });
}

function Error404NotFound(title: string, message: string): never {
  throw new NotFoundException(title, {
    cause: new Error(),
    description: message,
  });
}

function Error500InternalServer(title: string, message: string): never {
  throw new InternalServerErrorException(title, {
    cause: new Error(),
    description: message,
  });
}

export {
  Error400BadRequest,
  UnauthorizedError,
  Error404NotFound,
  Error500InternalServer,
};
