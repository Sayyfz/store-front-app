import api from '../services/ApiService';
import { API_URL as url } from '../config';
import { describe, expect, it } from 'vitest';

type Post = {
    id: number;
    title: string;
    authorId: number;
};

describe('ApiService', () => {
    const postsURL = `${url}/posts`;

    describe('getPosts()', () => {
        it('should return a list of posts', async () => {
            const result = (await api.get(postsURL)) as Post[];

            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toBeGreaterThan(0);

            result.forEach(post => {
                expect(post.id).toBeDefined();
                expect(post.title).toBeDefined();
            });
        });

        it('should return one post', async () => {
            const result = (await api.get(`${postsURL}/1`)) as Post;

            expect(result.id).toEqual(1);
            expect(result.title).toBeDefined();
            expect(result.authorId).toBeDefined();
        });
    });
});
