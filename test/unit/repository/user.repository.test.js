const UserRepository = require("../../../src/repositories/user.repository");
const { UserModel } = require("../../../src/models/user.model");

describe("User Repository", () => {
  let user;

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should create a user', async () => { 
    try {
      user = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password"
      };

      const createMock = jest.spyOn(UserRepository, 'create').mockResolvedValue(user);

      const createdUser = await UserRepository.create(user);

      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createdUser).toEqual(user);
    } catch (e) {
      throw new Error(e);
    }
  });

  test('should remove a user', async () => { 
    try {
      const userId = '123456';

      const deleteMock = jest.spyOn(UserModel, 'findByIdAndDelete').mockResolvedValue();

      await UserRepository.remove(userId);

      expect(deleteMock).toHaveBeenCalledTimes(1);
    } catch (e) {
      throw new Error(e);
    }
  });

  test('should edit a user', async () => { 
    try {
      const userId = '123456';
      const data = { firstName: 'Updated' };

      const updateMock = jest.spyOn(UserModel, 'findByIdAndUpdate').mockResolvedValue(user);

      const updatedUser = await UserRepository.edit(userId, data);

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updatedUser).toEqual(user);
    } catch (e) {
      throw new Error(e);
    }
  });

  test('should list a user', async () => { 
    try {
      const userId = '123456';

      const findByIdMock = jest.spyOn(UserModel, 'findById').mockResolvedValue(user);

      const foundUser = await UserRepository.list(userId);

      expect(findByIdMock).toHaveBeenCalledTimes(1);
      expect(foundUser).toEqual(user);
    } catch (e) {
      throw new Error(e);
    }
  });
});
