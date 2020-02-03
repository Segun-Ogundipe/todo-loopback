import {DefaultCrudRepository, BelongsToAccessor} from '@loopback/repository';
import {TodoListImage, TodoListImageRelations, TodoList} from '../models';
import {TodoListRepository} from '../repositories';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

export class TodoListImageRepository extends DefaultCrudRepository<
  TodoListImage,
  typeof TodoListImage.prototype.id,
  TodoListImageRelations
> {
  public readonly todoList: BelongsToAccessor<
    TodoList,
    typeof TodoListImage.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    protected todoListRepositoryGetter: Getter<TodoListRepository>,
  ) {
    super(TodoListImage, dataSource);
    this.todoList = this.createBelongsToAccessorFor(
      'todoList',
      todoListRepositoryGetter,
    );
    this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
  }
}
