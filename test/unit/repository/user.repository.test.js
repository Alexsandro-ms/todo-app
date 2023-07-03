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

      const createMock = jest.spyOn(UserModel, 'create').mockResolvedValue(user);

      const createdUser = await UserRepository.create(user);

      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createdUser).toEqual(user);    
    } catch (e) {
      throw new Error(e);
    }
  });

  test('Should return an error if one occurs while creating a user', async () => { 
    const user = {
        imagePath: "",
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password",
        task: []
      };
    
      const mockError = new Error('An error occurred');
      jest.spyOn(UserModel, 'create').mockRejectedValue(mockError);

      const error = await UserRepository.create(user);
      expect(error).toEqual(mockError);
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

  test('should return an error if one occurs while remove a user', async () => {
    const mockError = new Error("An error occurred")
    jest.spyOn(UserModel, 'findByIdAndDelete').mockRejectedValue(mockError)

    const error = await UserRepository.remove(1)
    expect(error).toEqual(mockError)
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

  test('should return an erro if one occurs while update a user', async () => {
    const user = {
        id: "1",
        tasks: [{title: "Lorem ipsum"}]
      };

      const mockError = new Error("An error occured")

      jest.spyOn(UserModel, 'findByIdAndUpdate').mockRejectedValue(mockError)

      const error = await UserRepository.edit(user.id, user.tasks)
      expect(error).toEqual(mockError)
  });

  test('should list a user', async () => { 
    try {
      const userId = '123456';

      const findByIdMock = jest.spyOn(UserModel, 'findById').mockResolvedValue(userId);

      const foundUser = await UserRepository.list(userId);

      expect(findByIdMock).toHaveBeenCalledTimes(1);
      expect(foundUser).toEqual(userId);
    } catch (e) {
      throw new Error(e);
    }
  });

  test('should return the error if an error occurs while listing a user', async () => {
    const mockError = new Error('An error occurred');
    jest.spyOn(UserModel, 'findById').mockRejectedValue(mockError);

    const error = await UserRepository.list("123456789");
    expect(error).toEqual(mockError);
  });

  test('should find a user by email', async () => { 
    try {
        const user = {
            email: 'johndoe@example.com'
        }
  
        const findByIdMock = jest.spyOn(UserModel, 'findOne').mockResolvedValue(user);
  
        const foundUser = await UserRepository.find(user);
  
        expect(findByIdMock).toHaveBeenCalledTimes(1);
        expect(foundUser).toEqual(user);
      } catch (e) {
        throw new Error(e);
      }
  });

  test('should return the error if an error occurs while found a user', async () => { 
    const user = {
        email: 'johndoe@example.com'
    }

    const mockError = new Error('An error occurred');
    jest.spyOn(UserModel, 'findOne').mockRejectedValue(mockError);

    const error = await UserRepository.find(user.email);
    expect(error).toEqual(mockError);
   })
});
