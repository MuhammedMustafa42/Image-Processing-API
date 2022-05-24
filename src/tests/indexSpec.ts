import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('Gets the main endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Gets and shows the chosen image', async () => {
    const response = await request.get('/api?image=fjord');
    expect(response.status).toBe(200);
  });

  it('Resizes the image', async () => {
    const response = await request.get(
      '/api/imageprocess/?image=fjord&height=200&width=150'
    );
    expect(response.status).toBe(200);
  });

  it('Gets the resized', async () => {
    const response = await request.get(
      '/api/resizedImage/?image=fjord&height=200&width=150'
    );
    expect(response.status).toBe(200);
  });
});
