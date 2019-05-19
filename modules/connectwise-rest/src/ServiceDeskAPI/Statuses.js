/**
 * Created by kgrube on 1/8/2016.
 * @author kgrube
 */

/**
 * @private
 */
const inherits = require('util').inherits;
const ConnectWise = require('../ConnectWise.js.js');

/**
 * @typedef {object} Status
 * @property {number} id
 * @property {string} name
 * @property {number} boardId
 * @property {number} sortOrder
 * @property {boolean} displayOnBoard
 * @property {boolean} inactive removed in 2019.1
 * @property {boolean} inactiveFlag added in 2019.1
 * @property {boolean} closedStatus
 * @property {boolean} timeEntryNotAllowed
 * @property {boolean} defaultFlag
 * @property {string} escalationStatus ['NotResponded', 'Responded', 'Plan', 'Resolved', 'NoEscalation']
 * @property {object} _info
 *
 */

/**
 *
 * @param {CWOptions} options
 * @inherits {ConnectWise}
 * @constructor
 */
function Statuses(options) {
  ConnectWise.apply(this, Array.prototype.slice.call(arguments));
}

inherits(Statuses, ConnectWise);

/**
 *
 * @param boardId
 * @param {Params} params
 * @returns {Promise<Status[]>}
 */
Statuses.prototype.getStatusesByBoardId = function (boardId, params) {
  return this.api(`/service/boards/${boardId}/statuses`, 'GET', params);
};

/**
 *
 * @param boardId
 * @param {Status} status
 * @returns {Promise<Status>}
 */
Statuses.prototype.createStatuses = function (boardId, status) {
  return this.api(`/service/boards/${boardId}/statuses`, 'POST', status);
};

/**
 *
 * @param boardId
 * @returns {Promise<Count>}
 */
Statuses.prototype.getStatusesCount = function (boardId) {
  return this.api(`/service/boards/${boardId}/statuses/count`, 'GET');
};

/**
 *
 * @param boardId
 * @param statusId
 * @returns {Promise<DeleteResponse>}
 */
Statuses.prototype.deleteStatusById = function (boardId, statusId) {
  return this.api(`/service/boards/${boardId}/statuses/${statusId}`, 'DELETE');
};

/**
 *
 * @param boardId
 * @param statusId
 * @returns {Promise<Status>}
 */
Statuses.prototype.getStatusById = function (boardId, statusId) {
  return this.api(`/service/boards/${boardId}/statuses/${statusId}`, 'GET');
};

/**
 *
 * @param boardId
 * @param statusId
 * @param {Operations[]} operations
 * @returns {Promise<Status>}
 */
Statuses.prototype.updateStatus = function (boardId, statusId, operations) {
  return this.api(`/service/boards/${boardId}/statuses/${statusId}`, 'PATCH', operations);
};

/**
 *
 * @param boardId
 * @param statusId
 * @param {Status} status
 * @returns {Promise<Status>}
 */
Statuses.prototype.replaceStatuses = function (boardId, statusId, status) {
  return this.api(`/service/boards/${boardId}/statuses/${statusId}`, 'PUT', status);
};

/**
 *
 * @type {Statuses}
 */
module.exports = Statuses;
