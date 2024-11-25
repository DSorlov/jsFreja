declare const enum APIMode {
    PRODUCTION,
    TEST
}

declare const enum FrejaIdentifierDisplayType {
    QR_CODE,
    TEXT
}

declare const enum UserInfoType {
    INFERRED,
    EMAIL,
    PHONE,
    SSN,
    ORGID
}

declare const enum RequestType {
    AUTH,
    SIGN,
    ORGID_AUTH,
    ORGID_SIGN,
    ORGID_MGMT
}

declare const enum SignatureType {
    SIMPLE,
    EXTENDED,
    XML_MINAMEDDELANDEN
}

declare const enum RegistrationLevel {
    BASIC,
    EXTENDED,
    PLUS
}

declare const enum ConfirmationMethod {
    DEFAULT,
    DEFAULT_AND_FACE
}

declare const enum FrejaUserAddressType {
    POSTAL,
    RESIDENTIAL
}

declare const enum FrejaUserAddressSource {
    GOVERNMENT_REGISTRY
}

declare const enum UserAttributes {
    BASIC_USER_INFO,
    EMAIL_ADDRESS,
    ALL_EMAIL_ADDRESSES,
    ALL_PHONE_NUMBERS,
    DATE_OF_BIRTH,
    AGE,
    PHOTO,
    ADDRESSES,
    SSN,
    DOCUMENT,
    REGISTRATION_LEVEL,
    RELYING_PARTY_USER_ID,
    INTEGRATOR_SPECIFIC_USER_ID
}

declare const enum UserAttributeCollections {
    ALL_EXTENDED,
    ALL_BASIC,
    COMMON_AUTH,
    COMMON_SIGN
}

declare const enum RequestStatus {
    STARTED,
    DELIVERED,
    CANCELLED,
    REJECTED,
    EXPIRED,
    RP_CANCELLED,
    RP_REJECTED,
    APPROVED
}

declare const enum FrejaDocumentTypes {
    PASSPORT,
    DRIVER_LICENSE,
    NATIONAL_ID,
    SIS_ID,
    SWEDISH_TAX_ID,
    OTHER
}

/**
 * @property country - The country code
 * @property ssn - The social security number
 */
declare type ISocialSecurityNumber = {
    country: string;
    ssn: string;
};

/**
 * @property userInfoType - The type of user information
 * @property userInfo - The user information
 */
declare type IUserInfo = {
    userInfoType: UserInfoType;
    userInfo: string | ISocialSecurityNumber;
};

/**
 * @property userInfoType - Must be "EMAIL"
 * @property userInfo - The email address
 */
declare type IEmailUserInfo = {
    userInfoType: UserInfoType;
    userInfo: string;
};

/**
 * @property userInfoType - Must be "EMAIL"
 * @property userInfo - The social security number
 */
declare type ISSNUserInfo = {
    userInfoType: UserInfoType;
    userInfo: ISocialSecurityNumber;
};

/**
 * @property userInfoType - Must be "INFERRRED"
 * @property userInfo - Must be "N/A"
 */
declare type IInferredUserInfo = {
    userInfoType: UserInfoType;
    userInfo: string;
};

/**
 * @property userInfoType - Must be "PHONE"
 * @property userInfo - The email address
 */
declare type IPhoneUserInfo = {
    userInfoType: UserInfoType;
    userInfo: string;
};

/**
 * @property userInfoType - Must be "ORGID"
 * @property userInfo - The email address
 */
declare type IOrgIdUserInfo = {
    userInfoType: UserInfoType;
    userInfo: string;
};

declare type IResultMessage = {
    isOk: boolean;
};

declare type ISuccessResultMessage = {
    isOk: boolean;
    data: any;
};

/**
 * @property isOk - Must be false
 * @property data.code - The error code
 * @property data.message - The error message
 * @property data.extendedMessage - The extended error message
 * @property data.trace - The error trace
 */
declare type IFailureResult = {
    isOk: boolean;
    data: {
        code: number;
        message: string;
        extendedMessage: string;
        trace: string;
    };
};

/**
 * @property isOk - Must be true
 * @property token - The transaction token
 * @property qrCodeUrl - The URL to the QR code
 * @property autostartUrl - The URL to the autostart
 */
declare type IInitializationSuccess = {
    isOk: boolean;
    token: string;
    qrCodeUrl: (...params: any[]) => any;
    autostartUrl: (...params: any[]) => any;
};

/**
 * @property isOk - Must be true
 * @property status - The transaction status
 * @property isFinal - If the transaction is completed or should be checked again
 */
declare type IRequestStatusMessage = {
    isOk: boolean;
    status: RequestStatus;
    isFinal: boolean;
};

/**
 * @property isOk - Must be true
 * @property status - The transaction status
 * @property data - The results of the request
 * @property isFinal - Always true
 */
declare type ICompletedRequestMessage = {
    isOk: boolean;
    status: RequestStatus;
    data: IFrejaUser;
    isFinal: boolean;
};

/**
 * @property EN - The name of the organisation in English
 * @property SV - The name of the organisation in Swedish
 */
declare type IFrejaUserOrganisationName = {
    EN: string;
    SV: string;
};

/**
 * @property type - The address type
 * @property validFrom - The date the address is valid from
 * @property validTo - The date the address is valid to
 * @property address - The first line of the address
 * @property postcode - The postal code
 * @property city - The city
 * @property country - The country
 * @property source - The source of the address
 */
declare type IFrejaUserAddress = {
    type: FrejaUserAddressType;
    validFrom: string;
    validTo: string;
    address: string[];
    postcode: string;
    city: string;
    country: string;
    source: FrejaUserAddressSource;
};

/**
 * @property type - The document type
 * @property country - The document country
 * @property number - The document number
 * @property expiration - The document expiration date
 */
declare type IFrejaUserDocument = {
    type: FrejaDocumentTypes;
    country: string;
    number: string;
    expiration: string;
};

/**
 * @property userId - The organisation user ID
 * @property issuerId - The organisation issuer ID
 * @property issuerCode - The organisation issuer code
 * @property issuerName - The organisation issuer name
 * @property [attributes] - The organisation attributes
 */
declare type IFrejaUserOrganisation = {
    userId: string;
    issuerId: string;
    issuerCode: string;
    issuerName: IFrejaUserOrganisationName;
    attributes?: IFrejaUserOrganisationAttributes[];
};

/**
 * @property title - Title of the Organisation ID to be displayed to the end user
 * @property identifierName - Display name of specific organisation identifier
 * @property identifier - Value of specific organisation identifier
 * @property identifierDisplayTypes - Displays for the identifier
 * @property [attributes] - The organisation attributes
 */
declare type IFrejaUserAddOrganisation = {
    title: string;
    identifierName: string;
    identifier: string;
    identifierDisplayTypes: FrejaIdentifierDisplayType[];
    attributes?: IFrejaUserOrganisationAttributes[];
};

/**
 * @property title - The title of the notification
 * @property message - The message of the notification
 */
declare type IFrejaSignNotification = {
    title: string;
    message: string;
};

/**
 * @property key - The attribute key
 * @property value - The attribute value
 * @property displayText - The attribute display text
 */
declare type IFrejaUserOrganisationAttributes = {
    key: string;
    value: string;
    displayText: string;
};

/**
 * @property [firstname] - The user's first name
 * @property [lastname] - The user's last name
 * @property [fullname] - The user's full name
 * @property [age] - The user's age
 * @property [dateOfBirth] - The user's date of birth
 * @property [ssn] - The user's social security number
 * @property [ssc] - The user's social security country
 * @property [photo] - The user's photo
 */
declare type IFrejaUserInfo = {
    firstname?: string;
    lastname?: string;
    fullname?: string;
    age?: number;
    dateOfBirth?: string;
    ssn?: string;
    ssc?: string;
    photo?: string;
};

/**
 * @property freja.userInfo - The user information object
 * @property [freja.relyingPartyUserId] - The relying party user ID
 * @property [freja.registrationLevel] - The registration level
 * @property [freja.customIdentifier] - The custom identifier
 */
declare type IFrejaServiceData = {};

/**
 * @property [emailAddress] - The user's primary email address
 * @property [phoneNumber] - The user's primary (first) phone number
 * @property [postalAddress] - The user's current postal address
 * @property [residentialAddress] - The user's current residential address
 * @property [allEmailAddresses] - The user's other email addresses
 * @property [allPhoneNumbers] - The user's other phone numbers
 * @property [allAddresses] - The user's addresses
 */
declare type IFrejaUserContact = {
    emailAddress?: string;
    phoneNumber?: string;
    postalAddress?: IFrejaUserAddress;
    residentialAddress?: IFrejaUserAddress;
    allEmailAddresses?: string[];
    allPhoneNumbers?: string[];
    allAddresses?: IFrejaUserAddress[];
};

/**
 * @property info - The user information object
 * @property freja - The Freja object
 * @property [document] - The document object
 * @property [organisation] - The organisation object
 * @property contact - The contacts object
 * @property [signature] - The signature data
 */
declare type IFrejaResponse = {
    info: IFrejaUserInfo;
    freja: IFrejaServiceData;
    document?: IFrejaUserDocument;
    organisation?: IFrejaUserOrganisation;
    contact: IFrejaUserContact;
    signature?: IFrejaSignatureData;
};

/**
 * @property type - The signature type
 * @property timestamp - The date of the signature
 * @property payload - The signed data
 * @property transactionId - The id of the signing transaction from Freja
 * @property ocspResponse - The OCSP response at time of signing
 * @property signature - The signature
 * @property kid - The signature key ID
 * @property alg - The signature algorithm
 * @property [advanced] - The advanced signature
 */
declare type IFrejaSignatureData = {
    type: SignatureType;
    timestamp: Date;
    payload: string;
    transactionId: string;
    ocspResponse: Buffer;
    signature: string;
    kid: string;
    alg: string;
    advanced?: any;
};

declare const enum FrejaAPIErrors {
    1001,
    1002,
    1003,
    1004,
    1005,
    1007,
    1008,
    1009,
    1010,
    1012,
    1013,
    1014,
    1100,
    1200,
    2000,
    2002,
    2003,
    3000,
    3001,
    3002,
    3003,
    3004,
    3005,
    3006,
    3007,
    3008,
    3009,
    4000,
    4002,
    4003,
    4004,
    4005,
    4006,
    4008,
    4007,
    4009,
    5000,
    5001,
    5002,
    9000,
    9001,
    9002,
    9003,
    9004,
    9005,
    9006,
    9009,
    9010,
    9011,
    9012,
    9013,
    9014,
    9015,
    9016,
    9017,
    9018,
    9019,
    9020,
    9021,
    9022
}

