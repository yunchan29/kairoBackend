import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Makes all fields optional, good for PATCH
export class UpdateUserDto extends PartialType(CreateUserDto) {}
