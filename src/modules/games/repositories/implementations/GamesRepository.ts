import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    return await this.repository
      .createQueryBuilder("game")
      .where("game.title ILIKE :title", { title: `%${param}%`})
      .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    return await getRepository(User)
    .createQueryBuilder("user")
    .leftJoin("user.games", "ug")
    .where("ug.id = :id", {id: id})
    .getMany()
  }
}
