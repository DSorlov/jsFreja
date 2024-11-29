// @ts-check
import { existsSync, readFileSync } from 'fs';
import https from 'https';
import pjson from './package.json' with { type: "json" };
import jwt from 'jsonwebtoken';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @module freja
 * @description The Freja module will allow you to interact with the Freja eID API. The module is designed to be used in a Node.js environment and will allow you to create authentication and signing requests, as well as manage user information. 
 * @version 1.1.0
 */

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} PRODUCTION "PRODUCTION"
 * @property {string} TEST "TEST"
 */
const FrejaAPIEnvironment = Object.freeze({
    PRODUCTION: 'PRODUCTION',
    TEST: 'TEST'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} EXTENDED "EXTENDED"
 * @property {string} VETTING_CONFIRMED "VETTING_CONFIRMED"
 * @property {string} PLUS "PLUS"
 */
const FrejaRegistrationState = Object.freeze({
    EXTENDED: 'EXTENDED',
    VETTING_CONFIRMED: 'VETTING_CONFIRMED',
    PLUS: 'PLUS'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} QR_CODE "QR_CODE"
 * @property {string} TEXT "TEXT"
 */
const FrejaIdentifierDisplayType = Object.freeze({
    QR_CODE: 'QR_CODE',
    TEXT: 'TEXT'
});

/**
 * @readonly
 * @enum {Object}
 * @category UserInfo
 * @name UserInfoType
 * @property {string} INFERRED "INFERRED"
 * @property {string} EMAIL "EMAIL"
 * @property {string} PHONE "PHONE"
 * @property {string} SSN "SSN"
 * @property {string} ORGID "ORG_ID"
 */
const FrejaUserInfoType = Object.freeze({
    INFERRED: 'INFERRED',
    EMAIL: 'EMAIL',
    PHONE: 'PHONE',
    SSN: 'SSN',
    ORGID: 'ORG_ID'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} AUTH "A"
 * @property {string} SIGN "S"
 * @property {string} ORGID_AUTH "O"
 * @property {string} ORGID_SIGN "I"
 * @property {string} ORGID_MGMT "M"
 */
const FrejaRequestType = Object.freeze({
    AUTH: 'A',
    SIGN: 'S',
    ORGID_AUTH: 'O',
    ORGID_SIGN: 'I',
    ORGID_ADD: 'M'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} SIMPLE "SIMPLE"
 * @property {string} EXTENDED "EXTENDED"
 * @property {string} XML_MINAMEDDELANDEN "XML_MINAMEDDELANDEN" 
 */
const FrejaSignatureType = Object.freeze({
    SIMPLE: 'SIMPLE',
    EXTENDED: 'EXTENDED',
    XML_MINAMEDDELANDEN: 'XML_MINAMEDDELANDEN'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} BASIC "BASIC"
 * @property {string} EXTENDED "EXTENDED"
 * @property {string} PLUS "PLUS"
 */
const FrejaRegistrationLevel = Object.freeze({
    BASIC: 'BASIC',
    EXTENDED: 'EXTENDED',
    PLUS: 'PLUS'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} DEFAULT "DEFAULT"
 * @property {string} DEFAULT_AND_FACE "DEFAULT_AND_FACE"
 */
const FrejaConfirmationMethod = Object.freeze({
    DEFAULT: 'DEFAULT',
    DEFAULT_AND_FACE: 'DEFAULT_AND_FACE'
});

/**
 * @readonly
 * @enum {Object}
 * @category Freja
 * @property {string} POSTAL "POSTAL"
 * @property {string} RESIDENTIAL "RESIDENTIAL"
 */
const FrejaUserAddressType = Object.freeze({
    POSTAL: 'POSTAL',
    RESIDENTIAL: 'RESIDENTIAL'
});

/**
 * @readonly
 * @enum {Object}
 * @category Freja
 * @property {string} GOVERNMENT_REGISTRY "GOVERNMENT_REGISTRY"
 */
const FrejaUserAddressSource = Object.freeze({
    GOVERNMENT_REGISTRY: 'GOVERNMENT_REGISTRY'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} BASIC_USER_INFO First, last and full name
 * @property {string} EMAIL_ADDRESS Only primary email address
 * @property {string} ALL_EMAIL_ADDRESSES All the users email addresses
 * @property {string} ALL_PHONE_NUMBERS All the users phone numbers
 * @property {string} DATE_OF_BIRTH The date of birth
 * @property {string} AGE The user's age
 * @property {string} PHOTO User enrolled photo
 * @property {string} ADDRESSES All the user's addresses (Sweden and Norway only)
 * @property {string} SSN Social security number
 * @property {string} DOCUMENT Document information
 * @property {string} REGISTRATION_LEVEL The users registaion level
 * @property {string} RELYING_PARTY_USER_ID The relying party user ID
 * @property {string} INTEGRATOR_SPECIFIC_USER_ID The integrator specific user ID
 */
const FrejaUserAttributes = Object.freeze({
    BASIC_USER_INFO: 'BASIC_USER_INFO',
    EMAIL_ADDRESS: 'EMAIL_ADDRESS',
    ALL_EMAIL_ADDRESSES: 'ALL_EMAIL_ADDRESSES',
    ALL_PHONE_NUMBERS: 'ALL_PHONE_NUMBERS',
    DATE_OF_BIRTH: 'DATE_OF_BIRTH',
    AGE: 'AGE',
    PHOTO: 'PHOTO',
    ADDRESSES: 'ADDRESSES',
    SSN: 'SSN',
    DOCUMENT: 'DOCUMENT',
    REGISTRATION_LEVEL: 'REGISTRATION_LEVEL',
    RELYING_PARTY_USER_ID: 'RELYING_PARTY_USER_ID',
    INTEGRATOR_SPECIFIC_USER_ID: 'INTEGRATOR_SPECIFIC_USER_ID',
    CUSTOM_IDENTIFIER: 'CUSTOM_IDENTIFIER'
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {UserAttributes[]} ALL_EXTENDED All user attributes (Requires EXTENDED or PLUS registration level)
 * @property {UserAttributes[]} ALL_BASIC All attributes when running in basic mode (All attributes when in BASIC registration level)
 * @property {UserAttributes[]} COMMON_AUTH Attributes commonly used for authentication (Requires EXTENDED or PLUS registration level)
 * @property {UserAttributes[]} COMMON_SIGN Attributes commonly used for signing (Requires EXTENDED or PLUS registration level)
 */
const FrejaUserAttributeCollections = Object.freeze({
    ALL_EXTENDED: [
        FrejaUserAttributes.BASIC_USER_INFO,
        FrejaUserAttributes.EMAIL_ADDRESS,
        FrejaUserAttributes.ALL_EMAIL_ADDRESSES,
        FrejaUserAttributes.ALL_PHONE_NUMBERS,
        FrejaUserAttributes.DATE_OF_BIRTH,
        FrejaUserAttributes.AGE,
        FrejaUserAttributes.PHOTO,
        FrejaUserAttributes.ADDRESSES,
        FrejaUserAttributes.SSN,
        FrejaUserAttributes.DOCUMENT,
        FrejaUserAttributes.REGISTRATION_LEVEL,
        FrejaUserAttributes.RELYING_PARTY_USER_ID,
        FrejaUserAttributes.INTEGRATOR_SPECIFIC_USER_ID ],
    ALL_BASIC: [
        FrejaUserAttributes.EMAIL_ADDRESS,
        FrejaUserAttributes.ALL_EMAIL_ADDRESSES,
        FrejaUserAttributes.ALL_PHONE_NUMBERS,
        FrejaUserAttributes.PHOTO,
        FrejaUserAttributes.REGISTRATION_LEVEL,
        FrejaUserAttributes.RELYING_PARTY_USER_ID,
        FrejaUserAttributes.INTEGRATOR_SPECIFIC_USER_ID ],    
    COMMON_AUTH: [
        FrejaUserAttributes.BASIC_USER_INFO,
        FrejaUserAttributes.EMAIL_ADDRESS,
        FrejaUserAttributes.SSN ],
    COMMON_SIGN: [
        FrejaUserAttributes.BASIC_USER_INFO,
        FrejaUserAttributes.EMAIL_ADDRESS,
        FrejaUserAttributes.ADDRESSES,
        FrejaUserAttributes.SSN ],
});


/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} STARTED "STARTED"
 * @property {string} DELIVERED "DELIVERED_TO_MOBILE"
 * @property {string} CANCELLED "CANCELLED"
 * @property {string} REJECTED "REJECTED"
 * @property {string} EXPIRED "EXPIRED"
 * @property {string} RP_CANCELLED "RP_CANCELLED"
 * @property {string} RP_REJECTED "RP_REJECTED"
 * @property {string} APPROVED "APPROVED"
 */
const FrejaRequestStatus = Object.freeze({
    STARTED: 'STARTED',
    DELIVERED: 'DELIVERED_TO_MOBILE',
    CANCELLED: 'CANCELED',
    REJECTED: 'REJECTED',
    EXPIRED: 'EXPIRED',
    RP_CANCELLED: 'RP_CANCELLED',
    RP_REJECTED: 'RP_REJECTED',
    APPROVED: 'APPROVED',
});

/**
 * @readonly
 * @enum {Object}
 * @category Enums
 * @property {string} PASSPORT "PASS"
 * @property {string} DRIVER_LICENSE "DRILIC"
 * @property {string} NATIONAL_ID "NATID"
 * @property {string} SIS_ID "IDSIS"
 * @property {string} SWEDISH_TAX_ID "TAXID"
 * @property {string} OTHER "OTHER"
 */
const FrejaDocumentTypes = Object.freeze({
    PASSPORT: 'PASS',
    DRIVER_LICENSE: 'DRILIC',
    NATIONAL_ID: 'NATID',
    SIS_ID: 'IDSIS',
    SWEDISH_TAX_ID: 'TAXID',
    OTHER: 'OTHER'
});

/**
 * @private
 * @typedef {Object} FrejaJwtPayload
 * @extends jwt.JwtPayload
 * @property {IUserInfo} userInfo The user information
 * @property {string} userInfoType The type of user information
 * @property {Object} requestedAttributes The requested attributes
 */

/**
 * @typedef {Object} ISocialSecurityNumber
 * @category UserInfo
 * @property {string} country The country code
 * @property {string} ssn The social security number
 */

/**
 * @typedef {Object} IUserInfo
 * @category UserInfo
 * @property {FrejaUserInfoType} userInfoType The type of user information
 * @property {string | ISocialSecurityNumber} userInfo The user information
 */

/**
  * @typedef {Object} IEmailUserInfo
  * @extends IUserInfo
  * @category UserInfo
  * @property {FrejaUserInfoType} userInfoType Must be "EMAIL"
  * @property {string} userInfo The email address
  */

 /**
  * @typedef {Object} ISSNUserInfo
  * @extends IUserInfo
  * @category UserInfo
  * @property {FrejaUserInfoType} userInfoType Must be "EMAIL"
  * @property {ISocialSecurityNumber} userInfo The social security number
  */

 /**
  * @typedef {Object} IInferredUserInfo
  * @extends IUserInfo
  * @category UserInfo
  * @property {FrejaUserInfoType} userInfoType Must be "INFERRRED"
  * @property {string} userInfo Must be "N/A"
  */

/**
  * @typedef {Object} IPhoneUserInfo
  * @extends IUserInfo
  * @category UserInfo
  * @property {FrejaUserInfoType} userInfoType Must be "PHONE"
  * @property {string} userInfo The email address
  */

/**
  * @typedef {Object} IOrgIdUserInfo
  * @extends IUserInfo
  * @category UserInfo
  * @property {FrejaUserInfoType} userInfoType Must be "ORGID"
  * @property {string} userInfo The email address
  */

/**
 * @typedef {Object} IResultMessage
 * @category Responses
 * @property {boolean} isOk
 */

/**
 * @typedef {Object} IFrejaOrgIdUserInfo
 * @category Freja
 * @property {string} identifier Title of the Organisation ID to be displayed to the end user
 * @property {string} identifierName Display name of specific organisation identifier
 * @property {string} title Value of specific organisation identifier
 * @property {string} [ssn] User SSN in international format if exist
 * @property {string} country User country
 * @property {FrejaRegistrationState} registrationState The extended error message
 */

/**
 * @typedef {Object} IFrejaOrgIdUserList
 * @category Responses
 * @extends IResultMessage
 * @property {boolean} isOk
 * @property {IFrejaOrgIdUserInfo[]} users The organisation information
 */

/**
 * @typedef {Object} ISuccessResultMessage
 * @category Responses
 * @extends IResultMessage
 * @property {boolean} isOk
 * @property {any} data
 */

/**
 * @typedef {Object} IUpdateSuccessMessage
 * @category Responses
 * @extends IResultMessage
 * @property {boolean} isOk
 * @property {number} added
 * @property {number} updated
 * @property {number} deleted
 */

/**
 * @typedef {Object} IFailureResult
 * @category Responses
 * @extends IResultMessage
 * @property {boolean} isOk Must be false
 * @property {number} code The error code
 * @property {string} message The error message
 * @property {string} [extendedMessage] The extended error message
 * @property {string} [trace] The error trace
 */

/**
 * @typedef {Object} IInitializationSuccess
 * @category Responses
 * @extends IResultMessage
 * @property {boolean} isOk Must be true
 * @property {string} token The transaction token
 * @property {function(string): string} qrCodeUrl The URL to the QR code
 * @property {function(string): string} autostartUrl The URL to the autostart
 */

/**
 * @typedef {Object} IRequestStatusMessage
 * @category Responses
 * @extends IResultMessage
 * @property {boolean} isOk Must be true
 * @property {FrejaRequestStatus} status The transaction status
 * @property {boolean} isFinal If the transaction is completed or should be checked again 
 */

/**
 * @typedef {Object} ICompletedRequestMessage
 * @category Responses
 * @extends IRequestStatusMessage
 * @property {boolean} isOk Must be true
 * @property {FrejaRequestStatus} status The transaction status
 * @property {IFrejaResponse} data The results of the request
 * @property {boolean} isFinal Always true
 */

/**
 * @typedef {Object} IFrejaUserOrganisationName
 * @category Freja
 * @property {string} EN The name of the organisation in English
 * @property {string} SV The name of the organisation in Swedish
 */

/**
 * @typedef {Object} IFrejaUserAddress
 * @category Freja
 * @property {FrejaUserAddressType} type The address type
 * @property {string} validFrom The date the address is valid from
 * @property {string} validTo The date the address is valid to
 * @property {string[]} address The first line of the address
 * @property {string} postcode The postal code
 * @property {string} city The city
 * @property {string} country The country
 * @property {FrejaUserAddressSource} source The source of the address
 */

/**
 * @typedef {Object} IFrejaUserDocument
 * @category Freja
 * @property {FrejaDocumentTypes} type The document type
 * @property {string} country The document country
 * @property {string} number The document number
 * @property {string} expiration The document expiration date
 */

/**
 * @typedef {Object} IFrejaUserOrganisation
 * @category Freja
 * @property {string} userId The organisation user ID
 * @property {string} issuerId The organisation issuer ID
 * @property {string} issuerCode The organisation issuer code
 * @property {IFrejaUserOrganisationName} issuerName The organisation issuer name
 * @property {IFrejaUserOrganisationAttributes[]} [attributes=undefined] The organisation attributes
 */

/**
 * @typedef {Object} IFrejaUserAddOrganisation
 * @category Freja
 * @property {string} title Title of the Organisation ID to be displayed to the end user
 * @property {string} identifierName Display name of specific organisation identifier
 * @property {string} identifier Value of specific organisation identifier
 * @property {FrejaIdentifierDisplayType[]} identifierDisplayTypes Displays for the identifier
 * @property {IFrejaUserOrganisationAttributes[]} [attributes=undefined] The organisation attributes
 */

/** 
 * @typedef {Object} IFrejaSignNotification
 * @category Freja
 * @property {string} title The title of the notification
 * @property {string} message The message of the notification
 */

/**
 * @typedef {Object} IFrejaUserOrganisationAttributes
 * @category Freja
 * @property {string} key The attribute key
 * @property {string} value The attribute value
 * @property {string} displayText The attribute display text
 */

/**
 * @typedef {Object} IFrejaUserDetails
 * @category Freja
 * @property {string} [firstname=undefined] The user's first name
 * @property {string} [lastname=undefined] The user's last name
 * @property {string} [fullname=undefined] The user's full name
 * @property {number} [age=undefined] The user's age
 * @property {string} [dateOfBirth=undefined] The user's date of birth
 * @property {string} [ssn=undefined] The user's social security number
 * @property {string} [ssc=undefined] The user's social security country
 * @property {string} [photo=undefined] The user's photo
 */

/**
 * @typedef {Object} IFrejaServiceData
 * @category Freja
 * @property {IUserInfo} freja.userInfo The user information object
 * @property {string} [freja.relyingPartyUserId=undefined] The relying party user ID
 * @property {FrejaRegistrationLevel} [freja.registrationLevel=undefined] The registration level
 * @property {string} [freja.customIdentifier=undefined] The custom identifier
 */

/**
 * @typedef {Object} IFrejaUserContact
 * @category Freja
 * @property {string} [emailAddress=undefined] The user's primary email address
 * @property {string} [phoneNumber=undefined] The user's primary (first) phone number
 * @property {IFrejaUserAddress} [postalAddress=undefined] The user's current postal address
 * @property {IFrejaUserAddress} [residentialAddress=undefined] The user's current residential address
 * @property {string[]} [allEmailAddresses=undefined] The user's other email addresses
 * @property {string[]} [allPhoneNumbers=undefined] The user's other phone numbers
 * @property {IFrejaUserAddress[]} [allAddresses=undefined] The user's addresses 
 */

/**
 * @typedef {Object} IFrejaResponse
 * @category Freja
 * @property {IFrejaUserInfo} info The user information object
 * @property {IFrejaServiceData} freja The Freja object
 * @property {IFrejaUserDocument} [document=undefined] The document object
 * @property {IFrejaUserOrganisation} [organisation=undefined] The organisation object
 * @property {IFrejaUserContact} contact The contacts object
 * @property {IFrejaSignatureData} [signature=undefined] The signature data
 */

/**
 * @typedef {Object} IFrejaSignatureData
 * @category Freja
 * @property {FrejaSignatureType} type The signature type
 * @property {Date} timestamp The date of the signature
 * @property {String} payload The signed data
 * @property {String} transactionId The id of the signing transaction from Freja
 * @property {Buffer} ocspResponse The OCSP response at time of signing
 * @property {String} signature The signature
 * @property {String} kid The signature key ID
 * @property {String} alg The signature algorithm 
 * @property {Object} [advanced=undefined] The advanced signature
 */

/**
 * @private
 * @typedef {Object} IHttpResponse
 * @property {number} code Response code from HTTP request
 * @property {string} [message=undefined] If an error occured, the message
 * @property {Object} [json=undefined] If a response was received, the JSON object
 */

/**
 * The main Freja API class.
 * @class module:freja.FrejaAPI
 * @alias FrejaAPI
 * @param {FrejaAPIEnvironment} apiEnvironment The API mode.
 * @param {string} authPfx The path to the PFX file.
 * @param {string} authPwd The password for the PFX file.
 * @param {Object} [trustedJWTCertificates=undefined] The JWT token files ({'x5t': 'file'}).
 * @param {undefined|string|string[]} [trustedCACertificates=undefined] The path to the CA certificate file(s).
 * @property {FrejaUserAttributes[]} UserAttributes The user attributes to return.
 * @property {FrejaRegistrationLevel} RegistrationLevel The minimum requested level.
 * @property {FrejaConfirmationMethod} ConfirmationMethod
 * @property {APIEnvironment} APIEnvironment The API mode.
 * @property {string} RelyingPartyId The relying party ID (used by integrators only).
 * @throws {Error} If the mode is invalid or if the password is missing.
 * @throws {Error} If the PFX or CA certificate file does not exist. * @example
 */
/**
 * @ignore
 */
class FrejaAPI {

    //Private properties
    /** @type undefined|string */
    #apiBase = undefined;
    /** @type undefined|Buffer */
    #authPfx = undefined;
    /** @type undefined|string */
    #authPwd = undefined;
    /** @type Object */
    #trustedJTWCertificateList = {};
    /** @type Array<string> */
    #trustedCACertificateList = [];

    //Public properties
    /**
     * @memberof module:freja.FrejaAPI 
     * @type FrejaRegistrationLevel
     */
    #registrationLevel = FrejaRegistrationLevel.BASIC;
    get RegistrationLevel() { return this.#registrationLevel; }
    set RegistrationLevel(value) { this.#registrationLevel = value; }

    /**
     * @memberof module:freja.FrejaAPI
     * @type FrejaConfirmationMethod
     */
    #confirmationMethod = FrejaConfirmationMethod.DEFAULT;
    get ConfirmationMethod() { return this.#confirmationMethod; }
    set ConfirmationMethod(value) { this.#confirmationMethod = value; }


    /**
     * @memberof module:freja.FrejaAPI
     * @type FrejaAPIEnvironment
     */
    #apiEnvironment = FrejaAPIEnvironment.TEST;
    get APIEnvironment() { return this.#apiEnvironment; }
    set APIEnvironment(value) { this.#apiEnvironment = value; }    

    /**
     * @memberof module:freja.FrejaAPI
     * @type Array<FrejaUserAttributes>
     */
    #userAttributes = [];
    get UserAttributes() { return this.#userAttributes; }
    set UserAttributes(value) { this.#userAttributes = value; }

    /**
     * @memberof module:freja.FrejaAPI
     * @type undefined|string
     */
    #relyingPartyId = undefined;
    get RelyingPartyId() { return this.#relyingPartyId; }
    set RelyingPartyId(value) { this.#relyingPartyId = value; }    

    /**
     * @constructs
     */
    constructor(apiEnvironment, authPfx, authPwd, trustedJWTCertificates=undefined, trustedCACertificates=undefined) {
        if (!apiEnvironment || (apiEnvironment !== FrejaAPIEnvironment.PRODUCTION && apiEnvironment !== FrejaAPIEnvironment.TEST)) {
            throw new Error("Invalid mode. Please use APIMode.PRODUCTION or APIMode.TEST.");
        }

        if (!authPwd || !apiEnvironment) {
            throw new Error("All parameters are required.");
        }

        if (!authPfx || !existsSync(authPfx)) {
            throw new Error("You must provide a valid PFX for authentication.");
        }

        if (trustedJWTCertificates) {
            if (typeof trustedJWTCertificates !=='object')
                        throw new Error("You must provide a valid JWT-tokens file for authentication.");  

            var keyNames = Object.keys(trustedJWTCertificates);
            for (const key of keyNames) {
                if (!existsSync(trustedJWTCertificates[key])) {
                    throw new Error("You must provide a valid JWT-tokens file for authentication.");
                }
                this.#trustedJTWCertificateList[key] = readFileSync(trustedJWTCertificates[key], { encoding: 'ascii'}).replace(/\r\n/g, "\n");
            }
        } else {
            if (apiEnvironment === FrejaAPIEnvironment.PRODUCTION) {
                this.#trustedJTWCertificateList['wSYLdhe93ToPR2X1UrNXxOg1juI'] = readFileSync(join(__dirname,'certs/prod_wSYLdhe93ToPR2X1UrNXxOg1juI.jwt'), { encoding: 'ascii'}).replace(/\r\n/g, "\n");
            } else {
                this.#trustedJTWCertificateList['DiZbzBfysUm6-IwI-GtienEsbjc'] = readFileSync(join(__dirname,'certs/test_DiZbzBfysUm6-IwI-GtienEsbjc.jwt'), { encoding: 'ascii'}).replace(/\r\n/g, "\n");
            }
        }

        if (trustedCACertificates) {
            if (Array.isArray(trustedCACertificates)) {
                //@ts-ignore We are actually checking already if we are an array so just visual studio validation error
                for (const cert of trustedCACertificates) {
                    if (!existsSync(cert)) {
                        throw new Error("You must provide a valid CA certificate for authentication.");
                    }
                }
            } else if (!existsSync(trustedCACertificates)) {
                throw new Error("You must provide a valid CA certificate for authentication.");
            }
        }        

        if (!trustedCACertificates)
            if (apiEnvironment === FrejaAPIEnvironment.PRODUCTION)
                //@ts-ignore we are asigning it an array so never mind (it is an empty array in initialization)
                trustedCACertificates = [join(__dirname,'certs/prod_root.pem')];
            else
                //@ts-ignore we are asigning it an array so never mind (it is an empty array in initialization)
                trustedCACertificates = [join(__dirname,'certs/test_root.pem')];

        this.#apiEnvironment = apiEnvironment;
        this.#apiBase = apiEnvironment === FrejaAPIEnvironment.PRODUCTION ? "prod.frejaeid.com" : "test.frejaeid.com";
        this.#authPfx = readFileSync(authPfx);
        this.#authPwd = authPwd;
        
        // @ts-ignore caCert is now an array of strings regardless of input
        trustedCACertificates.forEach((certFile) => {
            var content = readFileSync(certFile, { encoding: 'ascii'}).replace(/\r\n/g, "\n");
            //var matches = content.match(/(?<=-----BEGIN CERTIFICATE-----)[\s\S]*?(?=-----END CERTIFICATE-----)/g)
            var matches = content.match(/-----BEGIN CERTIFICATE-----\n[\s\S]+?\n-----END CERTIFICATE-----/g)
            
            // @ts-ignore #caCert is an array, ts-ignore is needed to avoid error
            //if (matches) matches.forEach((certContent) => this.#caCert.push(certContent.replace(/\n/g, "")));
            if (matches) matches.forEach((cert) => this.#trustedCACertificateList.push(cert));
        });

        return;
    }

    /**
     * Create a user info object.
     * @method module:freja.FrejaAPI#UserInfoFactory
     * @public
     * @param {Object|String} userData The user data to create the object from (email, phone, ssn, orgid etc.)
     * @return {IUserInfo} The user info object.
     * @throws {Error} If the data is invalid or missing.
     */
    UserInfoFactory(userData) {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const phoneRegexp = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/;
        const ssnRegexp = /^(SE(19|20)\d{2}([0][1-9]|[1][012])([0|1][1-9]|[3][012])[-]?\d{4}|NO\d{11}|FI\d{6}[-|A]\d{3}[0-9A-Z]|DK\d{10})*$/;

        // No data supplied, we are going inferred
        if (!userData) {
            return {
                userInfoType: FrejaUserInfoType.INFERRED,
                userInfo: "N/A"
            };
        }

        // Check if we have a valid object (SSN)
        if (typeof userData === "object") {
            if (userData.ssn && userData.country) {
                return {
                    userInfoType: FrejaUserInfoType.SSN,
                    userInfo: Buffer.from(JSON.stringify({ country: userData.country, ssn: userData.ssn })).toString('base64')
                };
            }
            if (userData.orgid) {
                return {
                    userInfoType: FrejaUserInfoType.ORGID,
                    userInfo: userData.orgid
                };
            }
            throw new Error("Invalid or missing data.");
        }

        // Check if we have a valid string (email or phone or bad boy SSN)
        if (typeof userData === "string") {
            if (emailRegexp.test(userData)) {
                return {
                    userInfoType: FrejaUserInfoType.EMAIL,
                    userInfo: userData
                };
            }
            if (phoneRegexp.test(userData)) {
                return {
                    userInfoType: FrejaUserInfoType.PHONE,
                    userInfo: userData
                };
            }
            if (ssnRegexp.test(userData)) {
                let country = userData.substring(0, 2);
                let ssn = userData.substring(2);
                if (country="SE") ssn=ssn.replace(/-/g, '');

                return {
                    userInfoType: FrejaUserInfoType.SSN,
                    userInfo: Buffer.from(JSON.stringify({ country, ssn })).toString('base64')
                };
            }            
        }

        // Unknown data type
        throw new Error("Invalid or missing data supplied as userInfo.");
    }

    /**
     * Initialize an authentication request (shorthand method).
     * @method module:freja.FrejaAPI#AuthRequest
     * @public
     * @async
     * @param {undefined | string | object | IUserInfo} [userInfo=undefined] The user to create the authentication request for.
     * @param {boolean} [orgId=false] If the request is for an organisation id
     * @return {Promise<IFailureResult | IInitializationSuccess>}
     */
    async AuthRequest(userInfo,orgId=false) {
        return this.InitRequest(orgId?FrejaRequestType.ORGID_AUTH:FrejaRequestType.AUTH, this.UserInfoFactory(userInfo));
    }

    /**
     * Initialize an signing request (shorthand method).
     * @method module:freja.FrejaAPI#SignRequest
     * @public
     * @async
     * @param {string | object | IUserInfo} userInfo The user to create the signing request for.
     * @param {string} title The title of the request (used for notification).
     * @param {string} text The text to sign.
     * @param {boolean} [orgId=false] If the request is for an organisation id
     * @return {Promise<IFailureResult | IInitializationSuccess>}
     */
    async SignRequest(userInfo, title, text, orgId=false) {
        if (!userInfo || !text) {
            return this._createErrorObject(9012);
        }
        var notification = {
            title,
            message: text,
        }
        return this.InitRequest(orgId?FrejaRequestType.ORGID_SIGN:FrejaRequestType.SIGN, this.UserInfoFactory(userInfo), {
            text,
            notification,
            signatureType: FrejaSignatureType.SIMPLE
        });
    }

    /**
     * Initialize an signing request (shorthand method).
     * @method module:freja.FrejaAPI#SignBufferRequest
     * @public
     * @async
     * @param {string | object | IUserInfo} userInfo The user to create the signing request for.
     * @param {string} title The title of the request (used for notification).
     * @param {string} text The text to sign.
     * @param {Buffer} data The binary data to sign.
     * @param {boolean} [orgId=false] If the request is for an organisation id
     * @returns {Promise<IFailureResult | IInitializationSuccess>}
     */
    async SignBufferRequest(userInfo, title, text, data, orgId=false) {
        if (!userInfo || !text) {
            return this._createErrorObject(9012);
        }
        var notification = {
            title,
            message: text,
        }
        return this.InitRequest(orgId?FrejaRequestType.ORGID_SIGN:FrejaRequestType.SIGN, this.UserInfoFactory(userInfo), {
            text,
            notification,
            binaryData: Buffer.from(data).toString('base64'),
            signatureType: FrejaSignatureType.XML_MINAMEDDELANDEN
        });
    }
    
    /**
     * Initialize an organisation id request (shorthand method).
     * @method module:freja.FrejaAPI#AddOrgIdRequest
     * @public
     * @async
     * @param {string | object | IUserInfo} userInfo The user to create the organisation id for
     * @param {string} title The title of the request (used for notification).
     * @param {string} identifier The identifier name
     * @param {string} value The identifier value
     * @param {FrejaIdentifierDisplayType[]} [displayTypes=[FrejaIdentifierDisplayType.QR_CODE, FrejaIdentifierDisplayType.TEXT]] The display types
     */
    async AddOrgIdRequest(userInfo, title, identifier, value, displayTypes=[FrejaIdentifierDisplayType.QR_CODE, FrejaIdentifierDisplayType.TEXT]) {

        if (!userInfo || !title || !identifier || !value || !displayTypes)
            return this._createErrorObject(9012);

        return this.InitRequest(FrejaRequestType.ORGID_ADD, this.UserInfoFactory(userInfo), { orgId: {
            title,
            identifierName: identifier,
            identifier: value,
            identifierDisplayTypes: displayTypes,
        }});
    }

    /**
     * Gets a full list of issued organisation ids
     * @method module:freja.FrejaAPI#GetOrgIdUserList
     * @public
     * @async
     * @returns {Promise<IFailureResult | IFrejaOrgIdUserList>}
     */ 
    async GetOrgIdUserList() {
        var requestUri = '/organisation/management/orgId/1.0/users/getAll';
        
        const result = await this._apiRequest(requestUri, 'getAllOrganisationIdRequest', undefined);

        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {

            var users = [];
            for (const user of result.json.userInfos) {
                var userObject = {
                    identifier: user.organisationId.identifier,
                    identifierName: user.organisationId.identifierName,
                    title: user.organisationId.title,
                    registrationState: user.registrationState,
                    country: user.ssn.country,
                };
                if (user.ssn.ssn) {
                    userObject.ssn = user.ssn.country+user.ssn.ssn;
                }
                users.push(userObject);
            }

            return this._createSuccessObject({ isFinal: true, users });
        }         
    }

    /**
     * Updates a issued organisation id with additional attributes
     * @method module:freja.FrejaAPI#UpdateOrgId
     * @public
     * @async
     * @param {string} identifier The custom identifier to delete
     * @param {IFrejaUserOrganisationAttributes[]} additionalAttributes Additional attributes to update
     * @returns {Promise<IFailureResult | IUpdateSuccessMessage>}
     */  
    async UpdateOrgId(identifier, additionalAttributes) {

        if (!identifier)
            return this._createErrorObject(9012);

        if (!additionalAttributes || !Array.isArray(additionalAttributes) || additionalAttributes.length === 0)
            return this._createErrorObject(9018);

        var requestUri = '/organisation/management/orgId/1.0/update';
        var requestName = 'updateOrganisationIdRequest';        
        var requestData = { identifier, additionalAttributes };

        const result = await this._apiRequest(requestUri, requestName, requestData)
        
        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {
            return this._createSuccessObject({
                updated: result.json.updateStatus.updated,
                added: result.json.updateStatus.added,
                deleted: result.json.updateStatus.deleted,
                isFinal: true
            });
        }        
    }

    /**
     * Deletes a issued organisation id
     * @method module:freja.FrejaAPI#RevokeOrgId
     * @public
     * @async
     * @param {string} identifier The custom identifier to delete
     * @returns {Promise<IFailureResult | ISuccessResultMessage>}
     */       
    async RevokeOrgId(identifier) {
        if (!identifier)
            return this._createErrorObject(9012);        

        var requestUri = '/organisation/management/orgId/1.0/delete';
        var requestName = 'deleteOrganisationIdRequest';
        var requestData = { identifier };

        const result = await this._apiRequest(requestUri, requestName, requestData)
        
        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {
            return this._createSuccessObject({data: {deleted: true}, isFinal: true});
        }
    } 

    /**
     * Initialize an authentication or signature request.
     * @method module:freja.FrejaAPI#InitRequest
     * @public
     * @async
     * @param {FrejaRequestType} requestType The type of request.
     * @param {string|undefined|object} userInfo The user information used to initialize, leave empty for inferred.
     * @param  {...any} additionalParams Additional parameters for the request.
     * @returns {Promise<IFailureResult | IInitializationSuccess>}
     */
    async InitRequest(requestType, userInfo, ...additionalParams) {

        if (!userInfo && !userInfo.userInfoType && !userInfo.userInfo)
            return this._createErrorObject(9022);

        const requestData = {
            ...userInfo,
        };

        if (this.#userAttributes.length > 0)
            requestData.attributesToReturn = this._convertToAttributeBag(this.#userAttributes)

        if (this.#confirmationMethod !== FrejaConfirmationMethod.DEFAULT)
            requestData.userConfirmationMethod = this.#confirmationMethod

        if (this.#registrationLevel !== FrejaRegistrationLevel.BASIC)
            requestData.minRegistrationLevel = this.#registrationLevel;


        let requestUri;
        let requestName;
        if (requestType === FrejaRequestType.AUTH || requestType === FrejaRequestType.ORGID_AUTH) {

            requestName = 'initAuthRequest';

            if (requestType === FrejaRequestType.ORGID_AUTH) {
                requestUri = '/organisation/authentication/1.0/init';
    
                const orgIdIssuer = this._findParam(additionalParams, 'issuer');
                if (orgIdIssuer)
                    requestData.organisationId = orgIdIssuer;
            } else {
                requestUri = '/authentication/1.0/initAuthentication';
            }

        } else if (requestType === FrejaRequestType.SIGN || requestType === FrejaRequestType.ORGID_SIGN) {

            requestUri = '/sign/1.0/initSignature';
            requestName = 'initSignRequest';

            var expiry = this._findParam(additionalParams, 'waitDays');
            if (expiry)
                requestData.expiry = this._calculateMilisecondsSinceEpoch(this._findParam(additionalParams, 'waitDays'));

            const signText = this._findParam(additionalParams, 'text');
            if (!signText)
                return this._createErrorObject(9001);

            const signatureType = this._findParam(additionalParams, 'signatureType');
            if (!signatureType)
                return this._createErrorObject(9002);

            // Check for binary/Singing bits
            const binaryData = this._findParam(additionalParams, 'binaryData');
            if (signatureType === FrejaSignatureType.SIMPLE && binaryData)
                return this._createErrorObject(9003);

            requestData.signatureType = signatureType;
            requestData.dataToSignType = binaryData ? 'EXTENDED_UTF8_TEXT' : 'SIMPLE_UTF8_TEXT';
            requestData.dataToSign = { text: Buffer.from(signText).toString('base64') };
            if (binaryData) requestData.dataToSign.binaryData = Buffer.from(binaryData).toString('base64')

            //Should we produce a signature
            const notification = this._findParam(additionalParams, 'notification');
            if (notification) {
                if (typeof notification !== 'object')
                    return this._createErrorObject(9004);
                if (!notification.title)
                    return this._createErrorObject(9005);
                if (!notification.message)
                    return this._createErrorObject(9006);
                requestData.pushNotification = {
                    title: notification.title,
                    text: notification.message
                };
            }
        } else if (requestType === FrejaRequestType.ORGID_ADD) {
            requestUri = '/organisation/management/orgId/1.0/initAdd';
            requestName = 'initAddOrganisationIdRequest';

            var expiry = this._findParam(additionalParams, 'waitDays');
            if (expiry)
                requestData.expiry = this._calculateMilisecondsSinceEpoch(this._findParam(additionalParams, 'waitDays'));
    
            /**
             * @private 
             * @type { undefined|IFrejaUserAddOrganisation }
             */
            var orgIdObject = this._findParam(additionalParams, 'orgId');
            if (!orgIdObject) return this._createErrorObject(9013);
            if (!orgIdObject.title) return this._createErrorObject(9014);
            if (!orgIdObject.identifierName) return this._createErrorObject(9015);
            if (!orgIdObject.identifier) return this._createErrorObject(9016);
            if (!orgIdObject.identifierDisplayTypes) return this._createErrorObject(9017);
            if (orgIdObject.attributes && !Array.isArray(orgIdObject.attributes)) return this._createErrorObject(9018);

            requestData.organisationId = {
                title: orgIdObject.title,
                identifierName: orgIdObject.identifierName,
                identifier: orgIdObject.identifier,
                identifierDisplayTypes: orgIdObject.identifierDisplayTypes,
                additionalAttributes: orgIdObject.attributes,
            }
        } else {

            return this._createErrorObject(9009);

        }

        const result = await this._apiRequest(requestUri, requestName, requestData);
        if (!result.code) {
            const token = `${requestType}${result.json.authRef || result.json.signRef || result.json.orgIdRef}`;
            const responseUrl = `frejaeid://bindUserToTransaction?transactionReference=${token.slice(1)}`;
            return this._createSuccessObject({
                token,
                qrCodeUrl: (originAppScheme = undefined) => {
                    const qrUrl = originAppScheme ? `${responseUrl}&originAppScheme=${originAppScheme}` : responseUrl;
                    return `https://resources.${this.#apiBase}/qrcode/generate?qrcodedata=${encodeURIComponent(qrUrl)}`;
                },
                autostartUrl: (originAppScheme = undefined) => {
                    return originAppScheme ? `${responseUrl}&originAppScheme=${originAppScheme}` : responseUrl;
                }
            });
        } else {
            if (result.code === 9000)
                return this._createErrorObject(result.code, result.message);
            else
                return this._createErrorObject(result.code);
        }
    }

    /**
     * Retrieve the status of a request.
     * @method module:freja.FrejaAPI#CancelRequest
     * @public
     * @async
     * @param {string} token The token of the request.
     * @returns {Promise<IFailureResult | ICompletedRequestMessage>}
     */    
    async CancelRequest(token) {
        var requestType = token.charAt(0);
        var requestId = token.slice(1);
        var requestUri = '';
        var requestName = '';
        var requestData = {};

        if (requestType==="A") {
            requestName = 'cancelAuthRequest';
            requestUri = '/authentication/1.0/cancel';
            requestData = { authRef: requestId };
        } else if (requestType==="S") {
            requestName = 'cancelSignRequest';
            requestUri = '/sign/1.0/cancel';
            requestData = { signRef: requestId };
        } else if (requestType==="O") {
            requestName = 'cancelAuthRequest';
            requestUri = '/organisation/authentication/1.0/cancel';
            requestData = { authRef: requestId };
        } else if (requestType==="I") {
            requestName = 'cancelSignRequest';
            requestUri = '/organisation/sign/1.0/cancel';
            requestData = { signRef: requestId };
        } else if (requestType==="M") {
            requestName = 'cancelAddOrganisationIdRequest';
            requestUri = '/organisation/management/orgId/1.0/cancelAdd';
            requestData = { orgIdRef: requestId };    
        }
        
        const result = await this._apiRequest(requestUri, requestName, requestData)
        
        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {
            return this._createSuccessObject({isFinal: true});
        }
    }

    /**
     * Retrieve the status of a request.
     * @method module:freja.FrejaAPI#CheckCustodianship
     * @public
     * @async
     * @param {string} swedishSSN The social security number to check
     * @returns {Promise<IFailureResult | ISuccessResultMessage>}
     */    
    async CheckCustodianship(swedishSSN) {
        const ssnRegexp = /^SE(19|20)\d{2}([0][1-9]|[1][012])([0|1][1-9]|[3][012])[-]?\d{4}$/;

        if (!ssnRegexp.test(swedishSSN)) {
            return this._createErrorObject(9012);
        }

        var requestUri = '/custodianship/user/1.0/getCustodianshipStatus';
        var requestName = 'getCustodianshipStatusRequest';
        var requestData = { userCountryIdAndCrn: swedishSSN };

        const result = await this._apiRequest(requestUri, requestName, requestData)
        
        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {
            return this._createSuccessObject({data: result.json.custodianshipStatus, isFinal: true});
        }
    }

    /**
     * Retrieve the status of a request.
     * @method module:freja.FrejaAPI#NewCustomIdentifier
     * @public
     * @async
     * @param {string} customIdentifier The custom identifier to append
     * @param {IUserInfo} userInfo The user to which to append the custom identifier
     * @returns {Promise<IFailureResult | ISuccessResultMessage>}
     */    
    async NewCustomIdentifier(customIdentifier,userInfo) {

        if (!userInfo)
            return this._createErrorObject(9022);

        userInfo = this.UserInfoFactory(userInfo);

        if (!customIdentifier && typeof customIdentifier !== 'string')
            return this._createErrorObject(9021);

        var requestUri = '/user/manage/1.0/setCustomIdentifier';
        var requestName = 'setCustomIdentifierRequest';
        var requestData = { customIdentifier: customIdentifier };

        const result = await this._apiRequest(requestUri, requestName, requestData)
        
        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {
            return this._createSuccessObject({ isFinal: false});
        }
    }    

    /**
     * Retrieve the status of a request.
     * @method module:freja.FrejaAPI#DeleteCustomIdentifier
     * @public
     * @async
     * @param {string} customIdentifier The custom identifier to append
     * @returns {Promise<IFailureResult | ISuccessResultMessage>}
     */    
    async DeleteCustomIdentifier(customIdentifier) {

        if (!customIdentifier && typeof customIdentifier !== 'string')
            return this._createErrorObject(9021);

        var requestUri = '/user/manage/1.0/deleteCustomIdentifier';
        var requestName = 'deleteCustomIdentifierRequest';
        var requestData = { customIdentifier: customIdentifier };

        const result = await this._apiRequest(requestUri, requestName, requestData)
        
        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {
            return this._createSuccessObject({ isFinal: false});
        }
    }     

    /**
     * Retrieve the status of a request.
     * @method module:freja.FrejaAPI#InquireRequest
     * @public
     * @async
     * @param {string} token The token of the request.
     * @returns {Promise<IFailureResult | IRequestStatusMessage | ICompletedRequestMessage>}
     */    
    async InquireRequest(token) {
        var requestType = token.charAt(0);
        var requestId = token.slice(1);
        var requestUri = '';
        var requestName = '';
        var requestData = {};

        if (requestType==="A") {
            requestName = 'getOneAuthResultRequest';
            requestUri = '/authentication/1.0/getOneResult';
            requestData = { authRef: requestId };
        } else if (requestType==="S") {
            requestName = 'getOneSignResultRequest';
            requestUri = '/sign/1.0/getOneResult';
            requestData = { signRef: requestId };
        } else if (requestType==="O") {
            requestName = 'getOneAuthResultRequest';
            requestUri = '/organisation/authentication/1.0/getOneResult';
            requestData = { authRef: requestId };
        } else if (requestType==="I") {
            requestName = 'getOneSignResultRequest';
            requestUri = '/organisation/sign/1.0/getOneResult';
            requestData = { signRef: requestId };
        } else if (requestType==="M") {
            requestName = 'getOneOrganisationIdResultRequest';
            requestUri = '/organisation/management/orgId/1.0/getOneResult';
            requestData = { orgIdRef: requestId };    
        }

        if (requestUri === '')
            return this._createErrorObject(9009);

        const result = await this._apiRequest(requestUri, requestName, requestData)
        
        if (result.code) {
            return this._createErrorObject(result.code, result.message);
        } else {

            switch (result.json.status) {
                case FrejaRequestStatus.STARTED:
                case FrejaRequestStatus.DELIVERED:
                    return this._createSuccessObject({ status: result.json.status, isFinal: false});
                case FrejaRequestStatus.REJECTED:
                case FrejaRequestStatus.EXPIRED:
                case FrejaRequestStatus.RP_CANCELLED:
                case FrejaRequestStatus.RP_REJECTED:
                case FrejaRequestStatus.CANCELLED:
                        return this._createSuccessObject({ status: result.json.status, isFinal: true});
                case FrejaRequestStatus.APPROVED:
                    var convertedResult = this._processSuccessResponse(result.json);
                    if (convertedResult)
                        return this._createSuccessObject({ status: result.json.status, data: convertedResult, isFinal: true });
                    else
                        return this._createErrorObject(9011);
                default:
                    return this._createErrorObject(9010);
            }
        }

    }    

    /**
     * Convert an array of UserAttributes to an array of AttributeBag for use with API
     * @method module:freja.FrejaAPI#_convertToAttributeBag
     * @private
     * @param {Array<FrejaUserAttributes>} attributeList The list of attributes to convert
     * @returns {Array<Object>} The converted list
     */
    _convertToAttributeBag(attributeList) {
        var attributeBag = [];
        for (const attribute of attributeList) {
            attributeBag.push({ attribute: attribute });
        }
        return attributeBag;
    }    

    /**
     * How many milliseconds is there from 1970 1st of January to a given date from today
     * @method module:freja.FrejaAPI#_calculateMilisecondsSinceEpoch
     * @private
     * @param {number} daysFromNow 
     * @returns {number}
     */
    _calculateMilisecondsSinceEpoch(daysFromNow=7) {
        var result = new Date();
        result.setDate(result.getDate() + daysFromNow)
        return result.valueOf();
    }

    /**
     * Converts an incommin API response to a IFrejaUser object
     * @method module:freja.FrejaAPI#_processSuccessResponse
     * @private
     * @param {Object} apiResponse A JSON-formatted response from Freja API 
     * @returns {IFrejaResponse|undefined} The converted object or undefined on error
     */
    _processSuccessResponse(apiResponse) {
        try {
            const jwtInfo = jwt.decode(apiResponse.details, { complete: true });
            if (!jwtInfo || !jwtInfo.header || !jwtInfo.header.x5t || !this.#trustedJTWCertificateList[jwtInfo.header.x5t])
                return undefined;

            /**
             * @private
             * @type {FrejaJwtPayload}
             */
            const decoded = jwt.verify(apiResponse.details, this.#trustedJTWCertificateList[jwtInfo.header.x5t]);
            const today = new Date();

            var result = { info: {}, contact: {}, freja: { userInfo: decoded.userInfo } };
            if (typeof decoded.userInfo === 'string') {
                var newUserInfo = {};
                newUserInfo.userInfoType = decoded.userInfoType;
                newUserInfo.userInfo = decoded.userInfo;
            } else {
                result.freja.userInfo.userInfoType = decoded.userInfoType;
            }

            if (apiResponse.requestedAttributes && apiResponse.requestedAttributes.photo) {
                result.info.photo = apiResponse.requestedAttributes.photo;            
            }

            if (decoded.requestedAttributes) {
                if (decoded.requestedAttributes.age) result.info.age = decoded.requestedAttributes.age;
                if (decoded.requestedAttributes.dateOfBirth) result.info.dateOfBirth = decoded.requestedAttributes.dateOfBirth;
                if (decoded.requestedAttributes.emailAddress) result.contact.emailAddress = decoded.requestedAttributes.emailAddress;
                if (decoded.requestedAttributes.relyingPartyUserId) result.freja.relyingPartyUserId = decoded.requestedAttributes.relyingPartyUserId;
                if (decoded.requestedAttributes.registrationLevel) result.freja.registrationLevel = decoded.requestedAttributes.registrationLevel;              

                if (decoded.requestedAttributes.addresses) {
                    result.contact.allAddresses = [];

                    for(const address of decoded.requestedAttributes.addresses) {
                        address.validFrom = new Date(address.validFrom);
                        if (!address.validTo)
                            address.validTo = new Date('9999-12-31');
                        else
                            address.validTo = new Date(address.validTo);

                        let newAddressObject = {
                            type: address.type,
                            validFrom: address.validFrom,
                            validTo: address.validTo,
                            address: [address.address1, address.address2, address.address3].filter(Boolean),
                            postcode: address.postCode,
                            city: address.city,
                            country: address.country,
                        };
                        result.contact.allAddresses.push(newAddressObject);

                        if (address.validFrom <= today && today <= address.validTo)
                            if (address.type === 'POSTAL')
                                result.contact.postalAddress = newAddressObject;
                            else
                                result.contact.residentialAddress = newAddressObject;
                    }

                    if (!result.contact.residentialAddress && result.contact.postalAddress)
                        result.contact.residentialAddress = result.contact.postalAddress;

                    if (!result.contact.postalAddress && result.contact.residentialAddress)
                        result.contact.postalAddress = result.contact.residentialAddress;
                }

                if (decoded.requestedAttributes.customIdentifier) {
                    result.freja.customIdentifier = decoded.requestedAttributes.customIdentifier;
                }

                if (decoded.requestedAttributes.allEmailAddresses) {
                    result.contact.allEmailAddresses = [];
                    decoded.requestedAttributes.allEmailAddresses.forEach((emailObject)=>{
                        result.contact.allEmailAddresses.push(emailObject.emailAddress);
                    })
                    if (!result.contact.emailAddress && result.contact.allEmailAddresses.lenght>0) {
                        result.contact.emailAddress = result.contact.allEmailAddresses[0]
                    }
                }

                if (decoded.requestedAttributes.allPhoneNumbers) {
                    result.contact.allPhoneNumbers = [];
                    decoded.requestedAttributes.allPhoneNumbers.forEach((phoneObject)=>{
                        result.contact.allPhoneNumbers.push(phoneObject.phoneNumber);
                    })
                    if (result.contact.allPhoneNumbers.length>0) {
                        result.contact.phoneNumber = result.contact.allPhoneNumbers[0]
                    }
                }
                
                if (decoded.requestedAttributes.ssn) {
                    result.info.ssn = decoded.requestedAttributes.ssn.ssn;
                    result.info.ssc = decoded.requestedAttributes.ssn.country;
                }

                if (decoded.requestedAttributes.document) {
                    result.document = {};
                    result.document.type = decoded.requestedAttributes.document.type;
                    result.document.country = decoded.requestedAttributes.document.country;
                    result.document.number = decoded.requestedAttributes.document.serialNumber;
                    result.document.expiration = decoded.requestedAttributes.document.expirationDate;
                }                        
            
                if (decoded.requestedAttributes.basicUserInfo) {
                    result.info.firstname = decoded.requestedAttributes.basicUserInfo.name;
                    result.info.lastname =  decoded.requestedAttributes.basicUserInfo.surname;
                    result.info.fullname = decoded.requestedAttributes.basicUserInfo.name+' '+decoded.requestedAttributes.basicUserInfo.surname;
                }
                
                if (decoded.requestedAttributes.organisationIdIdentifier) {
                    result.organisation = {};
                    result.organisation.userId = decoded.requestedAttributes.organisationIdIdentifier;
                    result.organisation.issuerId = decoded.requestedAttributes.organisationId.identifier;
                    result.organisation.issuerCode = decoded.requestedAttributes.organisationId.issuerCode;
                    result.organisation.issuerName = decoded.requestedAttributes.organisationId.issuerFriendlyName;
                    result.organisation.attributes = decoded.requestedAttributes.organisationId.additionalAttributes;
                }
                
                if (decoded.signatureData) {
                    var signatureData = jwt.decode(decoded.signatureData.userSignature, { complete: true })
                    if (signatureData) {
                        result.signature = {
                            kid: signatureData.header.kid,
                            alg: signatureData.header.alg,
                            signature: signatureData.signature,
                            payload: signatureData.payload,
                            ocspResponse: Buffer.from(decoded.signatureData.certificateStatus,"base64"),
                            transactionId: decoded.signRef,
                            timestamp: new Date(decoded.timestamp),
                            type: decoded.signatureType,
                            advanced: (decoded.signatureData.advancedSignature) ? Buffer.from(decoded.signatureData.advancedSignature,"base64").toString('utf8') : undefined
                        };
                    }
                }
            }
            return result;
        } catch (error) {
            return undefined;
        }
    }    

    /**
     * Create an success object.
     * @method module:freja.FrejaAPI#_createSuccessObject
     * @private
     * @param {any} data The data to return.
     * @returns {ISuccessResultMessage | IInitializationSuccess | IRequestStatusMessage | ICompletedRequestMessage} The success object
     */
    _createSuccessObject(data) {
        return {
            isOk: true,
            ...data
        };
    }

    /**
     * Create an error object.
     * @method module:freja.FrejaAPI#_createErrorObject
     * @private
     * @param {number} code The error code
     * @param {string} [extendedMessage=undefined] Sub-error code
     * @param {string} [trace=undefined] Extended troubleshooting information
     * @returns {IFailureResult} The error object
     */
    _createErrorObject(code, extendedMessage=undefined, trace=undefined) {
        const errorObject = {
            isOk: false,
            code: code,
            message: FrejaAPI.GetErrorText(code),
        };

        if (extendedMessage) 
            errorObject.extendedMessage = extendedMessage;

        if (trace)
            errorObject.trace = trace;

        return errorObject
    }

    /**
     * Look for a parameter in an array.
     * @method module:freja.FrejaAPI#_findParam
     * @private
     * @param {any[]} params The array to search.
     * @param {any} paramName The parameter to find.
     * @returns {any | undefined} The parameter if found, otherwise undefined.
     */
    _findParam(params, paramName) {
        if(!Array.isArray(params)) params = [params];

        for (const param of params) {
            if (param && param.hasOwnProperty(paramName)) {
                return param[paramName];
            }
        }

        return undefined;
    }

    /**
     * Fetch data from the API.
     * @method module:freja.FrejaAPI#_apiRequest
     * @private
     * @async
     * @param {string} url The URL to fetch.
     * @param {string} apiMethod The method of the api to call
     * @param {any} [data] The data to send.
     * @param {any} [headers] The headers to send.
     * @returns {Promise<IHttpResponse>} The response from the API.
     */
    async _apiRequest(url, apiMethod, data = undefined, headers = undefined) {
        return new Promise((resolve) => {

            const requestOptions = {
                agent: new https.Agent({
                    pfx: this.#authPfx,
                    passphrase: this.#authPwd,
                    ca: this.#trustedCACertificateList,
                    // @ts-ignore This is actually undocumented but needed for the agent to work!!
                    ssl: { rejectUnauthorized: true },
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': `jsFreja/${pjson.version}`,
                    ...headers
                },
                method: 'POST'
            };

            if (data) {
                var jsonData = JSON.stringify(data)
                data = apiMethod + "=" + Buffer.from(jsonData).toString('base64')
                if (this.#relyingPartyId) {
                    data = data + "&relyingPartyId=" + this.#relyingPartyId;
                }
                requestOptions.headers['Content-Length']= data.length;
            } else {
                if (this.#relyingPartyId) {
                    data = "relyingPartyId=" + this.#relyingPartyId;
                }
                requestOptions.headers['Content-Length']= data.length;
            }

            var req = https.request(`https://services.${this.#apiBase}${url}`, requestOptions, (res) => {
                let data = '';

                // called on each piece of data
                res.on('data', (chunk) => {
                    data += chunk;
                });

                // called when the complete response is received.
                res.on('end', () => {
                    if (res.statusCode != 200) {
                        if (res.statusCode === 422) {
                            var responseData = JSON.parse(data);
                            resolve({
                                code: responseData.code,
                                message: responseData.message
                            });
                        } else {
                            resolve({
                                code: 9000,
                                message: res.statusMessage,
                            });
                        }
                    } else {
                        resolve({
                            code: 0,
                            json: JSON.parse(data),
                        });
                    }
                });

            }).on("error", (err) => {
                resolve({
                    code: 9000,
                    message: err.message,
                });
            });

            //If we are doing POST we also need to send the data of
            if (data) {
                req.write(data);   
            }
            req.end();         
        });
    }

    /**
     * Translate a code into a message
     * @method module:freja.FrejaAPI.GetError
     * @static
     * @public
     * @param {number} errorCode The error code
     * @returns {string} The error message
     */
    static GetErrorText(errorCode) {
        var errorTable = {
        1001: 'Invalid or missing userInfoType.',
        1002: 'Invalid or missing userInfo.',
        1003: 'Invalid restrict.',
        1004: 'You are not allowed to call this method.',
        1005: 'User has disabled your service.',
        1007: 'Invalid min registration level.',
        1008: 'Unknown Relying Party.',
        1009: 'You are not allowed to request integratorSpecificUserId parameter.',
        1010: 'JSON request cannot be parsed.',
        1012: 'User with the specified userInfo does not exist in Freja eID database.',
        1013: 'You are not allowed to request user custodianship information.',
        1014: 'Invalid user CRN, CRN missing or user country code is not SE.',
        1100: 'Invalid reference (for example, nonexistent or expired).',
        1200: 'Invalid or missing includePrevious parameter.',
        2000: 'Authentication request failed. Previous authentication request was rejected due to security reasons.',
        2002: 'Invalid attributesToReturn parameter.',
        2003: 'Custom identifier has to exist when it is requested.',
        3000: 'Invalid or missing dataToSignType.',
        3001: 'Invalid or missing dataToSign.',
        3002: 'Invalid or missing signatureType.',
        3003: 'Invalid expiry time.',
        3004: 'Invalid push notification.',
        3005: 'Invalid attributesToReturn parameter.',
        3006: 'Custom identifier has to exist when it is requested.',
        3007: 'Invalid title.',
        3008: 'Invalid SSN for advanced signing. Advanced signing cannot be performed by users from your country.',
        3009: 'Invalid advanced signing request. Missing SSN and basicUserInfo in its attributesToReturn parameter.',
        4000: 'Invalid or missing Organisation ID identifier.',
        4001: 'There is no user for given Organisation ID identifier.',
        4002: 'This Organisation ID identifier is already used.',
        4003: 'Invalid expiry.',
        4004: 'Invalid or missing Organisation ID title.',
        4005: 'Invalid or missing Organisation ID identifier name.',
        4006: 'Invalid or missing Organisation ID.',
        4008: 'Invalid display type.',
        4007: 'Invalid organisation id issuer.',
        4009: 'Invalid additional attributes.',
        5000: 'Invalid or missing custom identifier.',
        5001: 'There is no user for given custom identifier.',
        5002: 'You have already used this custom identifier.',
        9000: 'Local error: communication error.',
        9001: 'Local error: text is needed for signature requests.',
        9002: 'Local error: signatureType is needed for signature requests.',
        9003: 'Local error: binaryData is needed for extended signatures.',
        9004: 'Local error: notification must be of type object.',
        9005: 'Local error: title is needed for notification object.',
        9006: 'Local error: message is needed for notification object.',
        9009: 'Local error: requestType is not valid.',
        9010: 'Unkown status code.',
        9011: 'Unable to parse response.',
        9012: 'Missing arguments.',
        9013: 'Missing or invalid orgId object',
        9014: 'Missing or invalid title',
        9015: 'Missing or invalid identifierName',
        9016: 'Missing or invalid identifier',
        9017: 'Missing or invalid identifierDisplayTypes',
        9018: 'Missing or invalid attributes',
        9019: 'Invalid or missing token',
        9020: 'Invalid or missing swedish SSN',
        }   
    
        return errorTable[errorCode] ? errorTable[errorCode] : 'Unknown error code';
    };
};

export default FrejaAPI;
export { FrejaAPI, FrejaAPIEnvironment, FrejaIdentifierDisplayType, FrejaUserInfoType, FrejaRequestType, FrejaSignatureType, FrejaRegistrationLevel, FrejaConfirmationMethod, FrejaUserAddressType, FrejaUserAddressSource, FrejaUserAttributes, FrejaUserAttributeCollections, FrejaRequestStatus, FrejaDocumentTypes };