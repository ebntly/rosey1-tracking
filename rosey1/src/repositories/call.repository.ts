import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Call, CallRelations} from '../models';

export class CallRepository extends DefaultCrudRepository<
  Call,
  typeof Call.prototype.id,
  CallRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Call, dataSource);
  }
}
