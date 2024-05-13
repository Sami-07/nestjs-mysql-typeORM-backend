import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from 'src/users/users.service';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('users') // This adds a prefix to all the routes in this controller. In this case, all the routes in this controller will start with /users
export class UsersController {
    constructor(private userService: UsersService) { }

    // http://localhost:3000/users/search?id=1
    @Get("/search/:id?")
    async getUserByQueryId(@Query("id") id: number, @Res() res: Response) {
        try {
            console.log("query", id)

            const user = await this.userService.fetchUserByQueryId(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);

        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    // http://localhost:3000/users
    @Get() // This is a decorator that tells NestJS that this method should be called when a GET request is made to the /users route.
    async getUsers(
        @Res() res: Response) {
        console.log("getUsers")
        try {
            const allUsers = await this.userService.fetchUsers();
            if (allUsers.length === 0) {
                return res.status(404).json({ message: 'No user found' });
            }
            return res.status(200).json(allUsers);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    // http://localhost:3000/users/1
    @Get(":id")
    async getUserById(@Param("id") id: number,
        @Res() res: Response) {
        try {
            const user = await this.userService.fetchUserById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }


    @Post()
    async createUser(@Body() createUserDto: createUserDto,
        @Res() res: Response) {
        try {
            const createUser = await this.userService.createUser(createUserDto);
            if (!createUser) {
                res.status(400).json({ message: "User not created" })
            }
            return res.status(200).json(createUser);

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    @Patch(":id")
    async updateUser(
        @Param("id") id: number,
        @Body() userDetails: updateUserDto,
        @Res() res: Response) {
        try {
            const updateUser = await this.userService.updateUser(id, userDetails)
            console.log("update", updateUser)
            if (updateUser.affected === 0) {
                return res.status(400).json({ message: "Could not update details" })
            }
            return res.status(200).json({
                message: "updated user successfully"
            })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: number, @Res() res: Response) {
        try {
            const deleteUser = await this.userService.deleteUser(id);
            if (deleteUser.affected === 0) {
                res.status(404).json({ message: "Could not delete user" });
            }
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
