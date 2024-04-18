import { faker } from '@faker-js/faker';

export const adminMock = {
  id: faker.string.uuid(),
  username: 'admin',
  password: '1234',
  email: 'admin@admin.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const createAdminDTOMock = {
  username: 'admin',
  email: 'admin@admin.com',
  password: '1234',
};
