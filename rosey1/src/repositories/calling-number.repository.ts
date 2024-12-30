import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CallingNumber, CallingNumberRelations, Call} from '../models';
import {CallRepository} from './call.repository';

export class CallingNumberRepository extends DefaultCrudRepository<
  CallingNumber,
  typeof CallingNumber.prototype.id,
  CallingNumberRelations
> {

  public readonly calls: HasManyRepositoryFactory<Call, typeof CallingNumber.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CallRepository') protected callRepositoryGetter: Getter<CallRepository>,
  ) {
    super(CallingNumber, dataSource);
    this.calls = this.createHasManyRepositoryFactoryFor('calls', callRepositoryGetter,);
    this.registerInclusionResolver('calls', this.calls.inclusionResolver);
  }
}
