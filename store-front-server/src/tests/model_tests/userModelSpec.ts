import { User } from '../../models/UserModel';
import UserRepo from '../../repositories/UserRepository';
import InfoError from '../../types/infoError';

describe('USER MODEL SPEC', () => {
    let user: User;
    const testPass = 'pass1234';
    beforeAll(async () => {
        try {
            user = await UserRepo.create({
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
        const users: User[] = await UserRepo.index();
        expect(users.length).toBeTruthy;
        expect(users.length).toBeGreaterThan(0);
    });

    it('Should show the created user info successfully', async () => {
        const u: User = await UserRepo.show(user.id?.toString() || '');
        expect(u).toEqual(user);
    });

    it('authenticate method should return the user password successfully after authenticating and not throw an error', async () => {
        const u = await UserRepo.authenticate(user.username, testPass);
        expect(u?.password).toEqual(user.password);
    });

    it("authenticate with an invalid user should throw a user doesn't exist error", async () => {
        const invalidUser = 'sssssss';
        try {
            await UserRepo.authenticate(invalidUser, testPass);
        } catch (err) {
            expect((err as InfoError).message.includes('Cannot find user')).toBeTrue();
        }
    });

    it('authenticate with an invalid password should throw incorrect password error', async () => {
        try {
            await UserRepo.authenticate(user.username, 'sssssssssss');
        } catch (err) {
            expect(err).toEqual('Incorrect Password');
        }
    });
});
