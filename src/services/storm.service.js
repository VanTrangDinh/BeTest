const Storm = require('../models/storm.model');

class StormService {
  static async getStorms(cityName, page = 1, limit = 10) {
    try {
      const query = cityName ? { cityName } : {};

      const options = {
        sort: { cityName: -1, detectedTime: cityName ? 1 : -1 },
        skip: (page - 1) * limit,
        limit: limit,
      };

      const storms = await Storm.find(query, null, options);

      return storms;
    } catch (error) {
      console.error('Error fetching storms:', error);
      //   throw new Error('Internal Server Error');
    }
  }
}
module.exports = StormService;
