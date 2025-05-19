import {
  Controller,
  Post as HttpPost,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  create(
    @Body('title') title: string,
    @Body('content') content: string,
    @GetUser() user: User,
  ) {
    return this.postsService.create(title, content, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
    @GetUser() user: User,
  ) {
    return this.postsService.update(id, title, content, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: User) {
    return this.postsService.delete(id, user.id);
  }
}
