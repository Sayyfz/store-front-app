import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('USER MODEL SPEC', () => {
    let user: User;
    const testPass = 'pass1234';
    beforeAll(async () => {
        try {
            user = await store.create({
                firstName: 'user',
                lastName: 'model',
                username: 'user model tester',
                password: testPass,
            });
        } catch (err) {
            console.log(err);
        }
    });

    // UserStore.create is considred as a test even though it is not inside a spec
    // since subsequent tests will never pass unless UserStore.create creates a user as expected

    it('Should return list of users', async () => {
        const users: User[] = await store.index();
        expect(users.length).toBeTruthy;
        expect(users.length).toBeGreaterThan(0);
    });

    it('Should show the created user info successfully', async () => {
        const u: User = await store.show(user.id as unknown as number);
        expect(u).toEqual(user);
    });

    it('authenticate method should return the user password successfully after authenticating and not throw an error', async () => {
        const u = await store.authenticate(user.username, testPass);
        expect(u?.password).toEqual(user.password);
    });

    it("authenticate with an invalid user should throw a user doesn't exist error", async () => {
        const invalidUser = 'sssssss';
        try {
            await store.authenticate(invalidUser, testPass);
        } catch (err) {
            expect(err).toEqual({ err: `username ${invalidUser} doesn't exist`, status: 400 });
        }
    });

    it('authenticate with an invalid password should throw incorrect password error', async () => {
        try {
            await store.authenticate(user.username, 'sssssssssss');
        } catch (err) {
            expect(err).toEqual({ err: 'Incorrect Password', status: 401 });
        }
    });
});
