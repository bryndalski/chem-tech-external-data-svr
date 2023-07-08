import { ApiProperty } from '@nestjs/swagger';

export class FindBestMatchingCompoundDTO {
  @ApiProperty({
    name: 'compoundName',
    type: String,
    description: 'The name of the compound to search for',
    required: true,
  })
  compoundName: string;
}
