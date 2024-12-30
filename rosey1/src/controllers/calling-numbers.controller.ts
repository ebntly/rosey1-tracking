import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CallingNumber} from '../models';
import {CallingNumberRepository} from '../repositories';

export class CallingNumbersController {
  constructor(
    @repository(CallingNumberRepository)
    public callingNumberRepository : CallingNumberRepository,
  ) {}

  @post('/calling-numbers')
  @response(200, {
    description: 'CallingNumber model instance',
    content: {'application/json': {schema: getModelSchemaRef(CallingNumber)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CallingNumber, {
            title: 'NewCallingNumber',
            exclude: ['id'],
          }),
        },
      },
    })
    callingNumber: Omit<CallingNumber, 'id'>,
  ): Promise<CallingNumber> {
    return this.callingNumberRepository.create(callingNumber);
  }

  @get('/calling-numbers/count')
  @response(200, {
    description: 'CallingNumber model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CallingNumber) where?: Where<CallingNumber>,
  ): Promise<Count> {
    return this.callingNumberRepository.count(where);
  }

  @get('/calling-numbers')
  @response(200, {
    description: 'Array of CallingNumber model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CallingNumber, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CallingNumber) filter?: Filter<CallingNumber>,
  ): Promise<CallingNumber[]> {
    return this.callingNumberRepository.find(filter);
  }

  @patch('/calling-numbers')
  @response(200, {
    description: 'CallingNumber PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CallingNumber, {partial: true}),
        },
      },
    })
    callingNumber: CallingNumber,
    @param.where(CallingNumber) where?: Where<CallingNumber>,
  ): Promise<Count> {
    return this.callingNumberRepository.updateAll(callingNumber, where);
  }

  @get('/calling-numbers/{id}')
  @response(200, {
    description: 'CallingNumber model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CallingNumber, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CallingNumber, {exclude: 'where'}) filter?: FilterExcludingWhere<CallingNumber>
  ): Promise<CallingNumber> {
    return this.callingNumberRepository.findById(id, filter);
  }

  @patch('/calling-numbers/{id}')
  @response(204, {
    description: 'CallingNumber PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CallingNumber, {partial: true}),
        },
      },
    })
    callingNumber: CallingNumber,
  ): Promise<void> {
    await this.callingNumberRepository.updateById(id, callingNumber);
  }

  @put('/calling-numbers/{id}')
  @response(204, {
    description: 'CallingNumber PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() callingNumber: CallingNumber,
  ): Promise<void> {
    await this.callingNumberRepository.replaceById(id, callingNumber);
  }

  @del('/calling-numbers/{id}')
  @response(204, {
    description: 'CallingNumber DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.callingNumberRepository.deleteById(id);
  }
}
