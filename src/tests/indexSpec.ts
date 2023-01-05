import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test api/images endpoint error responses', () => {
  it('should return an error message when height parameter is not provided', async () => {
    const response = await request.get('/api/images?filename=fjord&width=250');
    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      'The following error occurred while processing your request: height param is missing or invalid'
    );
  });

  it('should return an error message when width parameter is not provided', async () => {
    const response = await request.get('/api/images?filename=fjord&height=250');
    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      'The following error occurred while processing your request: width param is missing or invalid'
    );
  });

  it('should return an error message when filename parameter is not provided', async () => {
    const response = await request.get('/api/images?width=250&height=250');
    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      'The following error occurred while processing your request: filename param is missing or invalid'
    );
  });

  it('should return an error message when specified file is not found in image directory', async () => {
    const response = await request.get(
      '/api/images?filename=happy&width=250&height=250'
    );
    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      'The following error occurred while processing your request: file not found'
    );
  });
});
