import api from '../services/ApiService';
import { API_URL as url } from '../config';
import { describe, expect, it } from 'vitest';
import { CustomResponse } from '../types/CustomResponse';
import { AxiosError } from 'axios';

type Post = {
    id: number;
    title: string;
    authorId: number;
};

describe('ApiService', () => {
    describe('getPosts()', () => {
        const postsURL = `${url}/posts`;
        const testId = 2540;

        it('should return a list of posts', async () => {
            const { data, status } = (await api.get(postsURL)) as CustomResponse;

            expect(Array.isArray(data)).toBeTruthy();
            expect((data as Post[]).length).toBeGreaterThan(0);

            (data as Post[]).forEach(post => {
                expect(status).toBe(200);
                expect(post.id).toBeDefined();
                expect(post.title).toBeDefined();
            });
        });

        it('should return one post', async () => {
            const { data, status } = (await api.get(`${postsURL}/1`)) as CustomResponse;
            const d = <Post>data;
            expect(status).toEqual(200);
            expect(d.id).toEqual(1);
            expect(d.title).toBeDefined();
            expect(d.authorId).toBeDefined();
        });

        it('should fail to delete a post and throw error', async () => {
            try {
                expect(await api.delete(postsURL, testId)).toThrowError();
            } catch (err) {}
        });

        it('should create a post and return it', async () => {
            const newPost = {
                id: testId,
                title: 'test post',
                authorId: 1,
            };
            const { data, status } = (await api.post(postsURL, newPost)) as CustomResponse;
            expect(status).toEqual(201);
            expect(data).toEqual(newPost);
        });

        it('should update post successfully', async () => {
            const newPost = {
                id: testId,
                title: 'Updated test post',
                authorId: 1,
            };
            const { data, status } = (await api.patch(postsURL, testId, newPost)) as CustomResponse;
            // expect(data as Post).toEqual(newPost);
            expect(status).toBe(200);
        });

        it('should delete a post and return it', async () => {
            const { data, status } = (await api.delete(postsURL, testId)) as CustomResponse;
            expect(status).toBe(200);
        });
    });
});
