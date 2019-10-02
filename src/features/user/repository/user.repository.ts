import { EntityRepository } from 'typeorm';
import { CommonRepository } from '../../../core/database/common.repository';
import { User } from '../entity/user.entity';
import { UserBuilder } from '../builder/user.builder';

@EntityRepository(User)
export class UserRepository extends CommonRepository<User> {
    public async findByEmail(
        email: string,
        relations: string[] = [],
    ): Promise<User> {
        return this.findOne(
        { email },

        {
            relations,
        },
        );
    }

    public async saveEntity(email: string, password: string, isActive: boolean): Promise<User> {
        const user: User = await new UserBuilder()
        .setEmail(email)
        .setPassword(password)
        .setIsActive(isActive)
        .build();
        return await this.save(user);
    }

    public async setActive(user: User): Promise<User> {
        user.isActive = true;
        return await this.save(user);
    }
}
