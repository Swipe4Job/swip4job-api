import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SaveJobOfferDTO {
  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  recruiterId!: string;

  @ApiProperty()
  @IsString()
  companyName!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  responsibilities!: string;

  @ApiProperty()
  @IsString()
  requirements!: string;

  @ApiProperty()
  @IsString()
  jobType!: string;

  @ApiProperty()
  @IsString()
  contractType!: string;

  @ApiProperty()
  @IsString()
  workingDay!: string;

  @ApiProperty()
  @IsArray()
  skills!: string[];

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  location!: string;

  @ApiProperty()
  @IsString()
  salaryRange!: string;

  @ApiProperty()
  @IsString()
  workingHours!: string;

  @ApiProperty()
  @IsString()
  departmentOrganisation!: string;

  @ApiProperty()
  @IsString()
  publicationDate!: string;
}
