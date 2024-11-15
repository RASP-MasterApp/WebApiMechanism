"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getAllUsers() {
        const users = this.usersRepository.find();
        return users;
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: {
                id: id,
            },
        });
        if (user) {
            return user;
        }
        throw new common_1.NotFoundException('Could not find the user');
    }
    async createUser(createUserDto) {
        const newUser = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
        });
        return newUser;
    }
    async deleteById(id) {
        const user = await this.usersRepository.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            return null;
        }
        await this.usersRepository.remove(user);
        return user;
    }
};
exports.UsersService = UsersService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map