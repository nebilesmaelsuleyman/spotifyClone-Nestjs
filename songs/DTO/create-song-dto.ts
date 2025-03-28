import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsArray,
  ArrayMinSize,
  IsOptional,
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
  @IsString()
  @IsOptional()
  readonly lyrics: string;
  @IsNotEmpty()
  readonly duration: Date;
}
