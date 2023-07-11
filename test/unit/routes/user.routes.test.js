const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../../src/index');
const UserRepository = require('../../../src/repositories/user.repository.js');

jest.mock('../../../src/repositories/user.repository.js');

describe('User Routes', () => {
  let user;
  
  beforeEach(() => {
      jest.restoreAllMocks();
  });    

  test('should create a user', async () => {
    user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
    };
    const mockUser = {
      _id: '123456789',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'hashedPassword',
      imagePath: '',
      tasks: [],
    };
    
    const bcryptHash = jest.spyOn(bcrypt, 'hash');
    bcryptHash.mockImplementation(() => 'hashedPassword');

    UserRepository.create.mockResolvedValue(mockUser);

    const response = await request(app)
        .post('/auth/register')
        .send(user);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockUser);
  });

  test('should return the error `Fill all fields` while create a user', async () => { 
    user = {}
    const response = await request(app)
        .post('/auth/register')
        .send(user);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: 'Fill all fields' });
  });

  test('should return the error `500` when create user', async () => {
    const user = {
        firstName: "John",
        lastName: "Doe",
        email: "asdasdasd",
        password: 2
    }
    const response = await request(app).post("/auth/register").send(user)

    expect(response.status).toBe(500)
  })

  test('should remove a user', async () => {
    const response = await request(app).delete("/auth/remove/1") 

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({message: 'User deleted'})
  });

  test('should return the erro `Inválid ID` while remove a user', async () => { 
    const response = await request(app).delete('/auth/remove/invalid-id');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(expect.any(String));
  });

  test('should edit a user', async () => {

    user = {
        firstName: "John"
    }

    const response = await request(app).put("/auth/edit/1").send(user) 

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({message: "User edited"})
  });

  test('should return "Invalid ID" when ID is not a number', async () => {
    const response = await request(app).put('/auth/edit/invalid-id').send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid ID' });
  });
});
