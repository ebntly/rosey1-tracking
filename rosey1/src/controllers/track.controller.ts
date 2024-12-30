import { get, param, response } from '@loopback/rest';
import { CallingNumberRepository, CallRepository } from '../repositories';
import { repository } from '@loopback/repository';

export class TrackController {
  constructor(
    @repository(CallingNumberRepository) private callingNumbers: CallingNumberRepository,
    @repository(CallRepository) private calls: CallRepository,
  ) {}

  @get('track')
  @response(200, {
    description: 'Track a calling number, returning the number of calls',
    content: {
      'application/json': {
        schema: {
          type: 'number',
          description: 'The number of calls made by the calling number.',
        },
      },
    }
  })
  async track(@param.query.string('callingNumber') callingNumber: string) {
    const { callingNumbers, calls } = this;
    let callingNumberId: string = '';
    const callingNumberIds = await callingNumbers.find({where: { callingNumber }, limit: 1, fields: ['id']});

    if (callingNumberIds.length) {
      callingNumberId = callingNumberIds[0].id!;
    } else {
      const result = await callingNumbers.create({ callingNumber });
      
      if (result.id) callingNumberId = result.id;
    }

    if (!callingNumberId) return 0;

    await calls.create({ callingNumberId, timestamp: (new Date()).toISOString() });

    const count = await calls.count({ callingNumberId });

    return count.count || 0;
  }
}
