import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StudyDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  school!: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  startDate!: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  endDate?: string;
}

export class LanguageDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  language!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  academicTitle!: string;
}

export class JobExperienceDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  position!: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  company!: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  startDate!: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  endDate?: string;
}

export class CandidateRegisterDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  candidateId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ type: [StudyDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StudyDTO)
  studies!: Array<StudyDTO>;

  @ApiProperty()
  @IsNotEmpty()
  softSkills!: Array<string>;

  @ApiProperty()
  @IsOptional()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location!: string;

  @ApiProperty({ type: [LanguageDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LanguageDTO)
  languages!: Array<LanguageDTO>;

  @ApiProperty({ type: [JobExperienceDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => JobExperienceDTO)
  jobExperiences!: Array<JobExperienceDTO>;
}
