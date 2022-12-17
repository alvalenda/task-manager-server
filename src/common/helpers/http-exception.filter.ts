import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

export function handleError(err: { name: string; message: string }): void {
  if (err.message.includes('\n')) {
    const errArray: string[] = err.message?.split('\n');
    err.message = errArray[errArray.length - 1];
  }

  if (err.name === 'AuthenticationError') {
    throw new UnauthorizedException(err.message);
  }

  if (err.name === 'BadRequestError') {
    throw new BadRequestException(err.message);
  }

  if (err.name === 'ConflictError') {
    throw new ConflictException(err.message);
  }

  if (err.name === 'Forbidden') {
    throw new ForbiddenException(err.message);
  }

  if (err.name === 'NotFoundError') {
    throw new NotFoundException(err.message);
  }

  if (err.name === 'UnprocessableEntityError') {
    throw new UnprocessableEntityException(err.message);
  }

  throw new InternalServerErrorException(err.message);

  //   switch (err.name) {
  //     case 'AuthenticationError':
  //       throw new UnauthorizedException(err.message);

  //     case 'BadRequestError':
  //       throw new BadRequestException(err.message);

  //     case 'ConflictError':
  //       throw new ConflictException(err.message);

  //     case 'Forbidden':
  //       throw new ForbiddenException(err.message);

  //     case 'NotFoundError':
  //       throw new NotFoundException(err.message);

  //     case 'UnprocessableEntityError':
  //       throw new UnprocessableEntityException(err.message);

  //     default:
  //       throw new InternalServerErrorException(err.message);
  //   }
}
