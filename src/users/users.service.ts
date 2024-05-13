import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService { // A service is a class that contains the business logic of an application. 
    //It is responsible for handling data and making calculations. It is used to separate the business logic from the controller. This makes the code cleaner and easier to maintain.
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }
    //!You will have to import TypeORM Module in the user.module.ts file and inject the User entity into the service.

    fetchUsers() {
        const allUsers = this.userRepository.find();
        return allUsers;
    }

    fetchUserById(id: number) {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    fetchUserByQueryId(id: number) {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }
    
    createUser(userDetails: createUserDto) {
        const newUser = this.userRepository.create({ ...userDetails })
        return this.userRepository.save(newUser);
    }

    updateUser(id: number, userDetails: updateUserDto) {
        return this.userRepository.update({ id }, { ...userDetails })
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id })
    }
}
