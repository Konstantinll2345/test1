import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const createdPost = postsService.create(post);
    expect(createdPost).toBeDefined();
    expect(createdPost.id).toBe('2');
    expect(createdPost.text).toBe(post.text);
    expect(createdPost.date).toBeDefined();
    expect(new Date(createdPost.date).toISOString()).toBe(createdPost.date);
    expect(postsService.find('2')).toEqual(createdPost);
    expect(postsService.find('1')).toBeDefined();
  });

  it('should find a post', () => {
    const existingPost = postsService.find('1');
    expect(existingPost).toBeDefined();
    expect(existingPost!.id).toBe('1');
    expect(existingPost!.text).toBe('Some pre-existing post');
    expect(postsService.find('non-existing-id')).toBeUndefined();
  });
});