import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail, IsInt, IsString } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  // Hash the password before saving or updating the entity
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt(10); // Salt rounds
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  // Method to compare a plain-text password with the hashed password
  async comparePassword(givenPassword: string): Promise<boolean> {
    return bcrypt.compare(givenPassword, this.password);
  }
}
