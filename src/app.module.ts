import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { FoodsModule } from './foods/foods.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, FoodsModule, AdminModule],
})
export class AppModule {}
