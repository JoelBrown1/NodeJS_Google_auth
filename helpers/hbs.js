/**
 * @description:  helper functions for handlebar templates
 * @documentation: date: https://day.js.org/docs/en/parse/string-format
 */
const dayjs = require('dayjs');

module.exports = {
  formatDate: function (date, format) {

    return dayjs(date).format(format)
  }
}