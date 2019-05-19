/**
 * Created by kgrube on 1/22/2016.
 */

/**
 * @private
 */
const inherits = require('util').inherits;
const ConnectWise = require('../ConnectWise.js.js');

/**
 * @typedef {object} Company
 * @property {string} accountNumber
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {number} annualRevenue
 * @property calendarId
 * @property {CountryHref} country
 * @property {CustomField[]} customFields
 * @property {string} dateAcquired
 * @property {string} dateDeleted
 * @property {number} defaultContactId
 * @property deletedBy
 * @property {boolean} deletedFlag
 * @property faxNumber
 * @property {number} id numeric identifier
 * @property {string} identifier short name of Company
 * @property {boolean} leadFlag
 * @property leadSource
 * @property {number} marketId
 * @property {string} name full name of Company
 * @property numberOfEmployees
 * @property ownershipType
 * @property parentCompany
 * @property {string} phoneNumber
 * @property sicCode
 * @property {string} state state's abbreviation
 * @property {StatusHref} status
 * @property {number} territoryId
 * @property timeZone
 * @property {TypeHref} type removed in 2019.1
 * @property typeIds added in 2019.1
 * @property {boolean} unsubscribeFlag
 * @property {string} website
 * @property {string} zip
 * @property {object} _info
 * @property {string} _info.lastUpdated
 * @property {string} _info.updatedBy
 */


/**
 * @typedef {object} CompanyNote
 * @property {number} id
 * @property {string} text
 * @property {TypeHref} type @TODO check if this is the same as regular {Type}
 * @property {boolean} flagged
 * @property {string} enteredBy
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
function Companies(options) {
  ConnectWise.apply(this, Array.prototype.slice.call(arguments));
}

inherits(Companies, ConnectWise);

/**
 * @param {Params} params
 * @returns {Promise<Company[]>}
 */
Companies.prototype.getCompanies = function (params) {
  return this.api('/company/companies', 'GET', params);
};

/**
 *
 * @param {Company} company
 * @returns {Promise<Company>}
 */
Companies.prototype.createCompany = function (company) {
  return this.api('/company/companies', 'POST', company);
};

/**
 * @param {ParamsConditions} params
 * @returns {Promise<Count>}
 */
Companies.prototype.getCompaniesCount = function (params) {
  return this.api('/company/companies/count', 'GET', params);
};

/**
 * @param {string|number} id numeric ID of company, not the company ID in ConnectWise.
 * @returns {Promise<Company>}
 */
Companies.prototype.getCompanyById = function (id) {
  return this.api(`/company/companies/${id}`, 'GET');
};

/**
 * @param {string|number} id
 * @param {Company} company
 * @returns {Promise<Company>}
 */
Companies.prototype.replaceCompany = function (id, company) {
  return this.api(`/company/companies/${id}`, 'PUT', company);
};

/**
 * @param {string|number} id
 * @returns {Promise<DeleteResponse>}
 */
Companies.prototype.deleteCompanyById = function (id) {
  return this.api(`/company/companies/${id}`, 'DELETE');
};

/**
 * @param {string|number} id
 * @param {Operations[]} ops
 * @returns {Promise<Company>}
 */
Companies.prototype.updateCompany = function (id, ops) {
  return this.api(`/company/companies/${id}`, 'PATCH', ops);
};


/**
 * @TODO finish this one
 * @returns {Promise<*>}
 */
Companies.prototype.mergeCompany = function () {
  return this.api(`/company/companies/${id}/merge`, 'POST', params);
};

/**
 *
 * @type {Companies}
 */
module.exports = Companies;
