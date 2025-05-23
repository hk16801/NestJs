import { Injectable, NotFoundException, ForbiddenException  } from '@nestjs/common';
import { CreateUserDto } from '../dto/create_user.dto';
import { UpdateUserDto } from '../dto/update_user.dto';
import { User } from '../entities/user.entity';
@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'admin', role: 'admin' },
  ];

  private nextId = 2;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(dto: CreateUserDto) {
    const newUser = {
      id: this.nextId++,
      username: dto.username,
      role: 'user', 
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, dto: UpdateUserDto) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    if (this.users[index].role === 'admin') {
      throw new ForbiddenException('Cannot update admin user');
    }

    this.users[index] = { ...this.users[index], ...dto };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    if (this.users[index].role === 'admin') {
      throw new ForbiddenException('Cannot delete admin user');
    }

    this.users.splice(index, 1);
    return { message: 'User deleted' };
  }
}

