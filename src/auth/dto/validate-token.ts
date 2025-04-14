import { IsString, IsNotEmpty } from 'class-validator';

export class ValidateTokenDTO {
  @IsNotEmpty()
  @IsString()
  token: string;
}
