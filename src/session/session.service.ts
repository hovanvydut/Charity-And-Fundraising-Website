import { Injectable } from '@nestjs/common';
import { SessionRepository } from './session.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionRepository)
    private sessionRepository: SessionRepository,
  ) {}

  destroyByUserId(id: number): Promise<any> {
    return this.sessionRepository.deleteByUserId(id);
  }
}
