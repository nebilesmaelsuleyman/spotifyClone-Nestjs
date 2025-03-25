import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ArrayMinSize(1)
  readonly artist: string[];

  @IsNotEmpty()
  readonly realeseDate: Date;
}
