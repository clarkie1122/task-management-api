import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { UserEntity  } from '@inteck/global-components';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async signUp(
        { username, password }: AuthCredentialsDto
    ): Promise<void> {
        const salt = await bcrypt.genSalt();
        const user = new UserEntity();

        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);

        try {
            await user.save();
        } catch (error) {
            // Store the error codes in a shared or enumin normal project.
            if (error.code === '23505') // duplicate conflict error code 
            {
                throw new ConflictException('Username already exists');
            }

            throw new InternalServerErrorException();
        }
    }

    async validateUserPassword(
        { username, password }: AuthCredentialsDto
    ): Promise<string> {
        // find user based on username
        const user = await this.findOne({ username });

        // with the password provided we need to compare that to the hashed password in the db, we do this by calling the method supplied in the User entity
        if (user && await user.validatePassword(password)) {
            return user.username;
        }

        return null;
    }

    private async hashPassword(
        password: string,
        salt: string
    ): Promise<string> {
        // the salt is a random string generated as well as the jwt
        return bcrypt.hash(password, salt);
    }
}