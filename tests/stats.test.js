const request = require('supertest');
const app = require('../app');

describe("Statistical operations routes", () => {
  describe("/mean", () => {
    test("Should calculate the mean", async () => {
      const res = await request(app).get('/mean?nums=1,2,3,4,5');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ operation: "mean", value: 3 });
    });

    test("Should handle missing nums", async () => {
      const res = await request(app).get('/mean');
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("nums are required");
    });

    test("Should handle invalid numbers", async () => {
      const res = await request(app).get('/mean?nums=foo,2,3');
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("foo is not a number");
    });
  });

  describe("/median", () => {
    test("Should calculate the median", async () => {
      const res = await request(app).get('/median?nums=1,3,5,2,4');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ operation: "median", value: 3 });
    });
  });

  describe("/mode", () => {
    test("Should calculate the mode", async () => {
      const res = await request(app).get('/mode?nums=1,2,2,3');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ operation: "mode", value: 2 });
    });
  });
});