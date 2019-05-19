/**
 * Created by kgrube on 1/22/2016.
 */

/**
 * @private
 */
const inherits = require('util').inherits;
const ConnectWise = require('../ConnectWise');

/**
 * @typedef {object} WorkType
 * @property {number} id
 * @property {WorkTypeHref} workType
 * @property {number} locationId
 * @property {string} rateType ['AdjAmount', 'Custom', 'Multiplier']
 * @property {string} billTime ['Billable', 'DoNotBill', 'NoCharge', 'NoDefault']
 * @property {number} rate
 * @property {number} hoursMax
 * @property {number} hoursMin
 * @property {number} roundBillHours
 * @property {number} overageRate
 * @property {string} overageRateType ['AdjAmount', 'Custom', 'Multiplier']
 * @property {number} agreementLimit
 * @property {SiteHref} site
 * @property {string} effectiveDate
 * @property {string} endingDate
 * @property {number} agreementId
 * @property {CompanyHref} company
 * @property {object} _info
 * @property {string} _info.lastUpdated
 * @property {string} _info.updatedBy
 */

/**
 *
 * @param {CWOptions} options
 * @inherits {ConnectWise}
 * @constructor
 */
function WorkTypes(options) {
  ConnectWise.apply(this, Array.prototype.slice.call(arguments));
}

inherits(WorkTypes, ConnectWise);

/**
 * GET
 * @param agreementId
 * @param {Params} params
 * @returns {Promise<WorkType[]>}
 */
WorkTypes.prototype.getWorkTypes = function (agreementId, params) {
  return this.api(`/finance/agreements/${agreementId}/workTypes`, 'GET', params);
};

/**
 * POST
 * @param agreementId
 * @param {WorkType} workType
 * @returns {Promise<WorkType>}
 */
WorkTypes.prototype.createWorkType = function (agreementId, workType) {
  return this.api(`/finance/agreements/${agreementId}/workTypes`, 'POST', workType);
};

/**
 * GET
 * @param agreementId
 * @param {ParamsConditions} params
 * @returns {Promise<Count>}
 */
WorkTypes.prototype.getWorkTypesCount = function (agreementId, params) {
  return this.api(`/finance/agreements/${agreementId}/workTypes/count`, 'GET', params);
};

/**
 * DELETE
 * @param agreementId
 * @param workTypeId
 * @returns {Promise<DeleteResponse>}
 */
WorkTypes.prototype.deleteWorkTypeById = function (agreementId, workTypeId) {
  return this.api(`/finance/agreements/${agreementId}/workTypes/${workTypeId}`, 'DELETE');
};

/**
 * GET
 * @param agreementId
 * @param workTypeId
 * @returns {Promise<WorkType>}
 */
WorkTypes.prototype.getWorkTypeById = function (agreementId, workTypeId) {
  return this.api(`/finance/agreements/${agreementId}/workTypes/${workTypeId}`, 'GET');
};

/**
 * PATCH
 * @param agreementId
 * @param workTypeId
 * @param {Operations[]} operations
 * @returns {Promise<WorkType>}
 */
WorkTypes.prototype.updateWorkType = function (agreementId, workTypeId, operations) {
  return this.api(`/finance/agreements/${agreementId}/workTypes/${workTypeId}`, 'PATCH', operations);
};

/**
 * PUT
 * @param agreementId
 * @param workTypeId
 * @param {WorkType} workType
 * @returns {Promise<WorkType>}
 */
WorkTypes.prototype.replaceWorkType = function (agreementId, workTypeId, workType) {
  return this.api(`/finance/agreements/${agreementId}/workTypes/${workTypeId}`, 'PUT', workType);
};

/**
 *
 * @type {WorkTypes}
 */
module.exports = WorkTypes;

