import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
  ) {}

  async create(title: string, content: string, userId: string): Promise<Post> {
    const post = this.postRepo.create({ title, content, userId });
    return this.postRepo.save(post);
  }

  async update(
    id: string,
    title: string,
    content: string,
    userId: string,
  ): Promise<Post> {
    const post = await this.postRepo.findOneBy({ id, userId });
    if (!post) throw new NotFoundException('Post not found');
    post.title = title;
    post.content = content;
    return this.postRepo.save(post);
  }

  async delete(id: string, userId: string): Promise<void> {
    const res = await this.postRepo.delete({ id, userId });
    if (!res.affected) throw new NotFoundException('Post not found');
  }
}
