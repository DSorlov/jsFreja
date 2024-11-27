/**
 * <p>The Freja module will allow you to interact with the Freja eID API. The module is designed to be used in a Node.js environment and will allow you to create authentication and signing requests, as well as manage user information.</p>
 */
declare module "freja" {
    const enum APIMode {
        PRODUCTION,
        TEST
    }
    const enum FrejaIdentifierDisplayType {
        QR_CODE,
        TEXT
    }
    enum UserInfo {
        INFERRED,
        EMAIL,
        PHONE,
        SSN,
        ORGID
    }
    const enum RequestType {
        AUTH,
        SIGN,
        ORGID_AUTH,
        ORGID_SIGN,
        ORGID_MGMT
    }
    const enum SignatureType {
        SIMPLE,
        EXTENDED,
        XML_MINAMEDDELANDEN
    }
    const enum RegistrationLevel {
        BASIC,
        EXTENDED,
        PLUS
    }
    const enum ConfirmationMethod {
        DEFAULT,
        DEFAULT_AND_FACE
    }
    const enum FrejaUserAddressType {
        POSTAL,
        RESIDENTIAL
    }
    const enum FrejaUserAddressSource {
        GOVERNMENT_REGISTRY
    }
    const enum UserAttributes {
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
    const enum UserAttributeCollections {
        ALL_EXTENDED,
        ALL_BASIC,
        COMMON_AUTH,
        COMMON_SIGN
    }
    const enum RequestStatus {
        STARTED,
        DELIVERED,
        CANCELLED,
        REJECTED,
        EXPIRED,
        RP_CANCELLED,
        RP_REJECTED,
        APPROVED
    }
    const enum FrejaDocumentTypes {
        PASSPORT,
        DRIVER_LICENSE,
        NATIONAL_ID,
        SIS_ID,
        SWEDISH_TAX_ID,
        OTHER
    }
    /**
     * @property country - <p>The country code</p>
     * @property ssn - <p>The social security number</p>
     */
    type ISocialSecurityNumber = {
        country: string;
        ssn: string;
    };
    /**
     * @property userInfoType - <p>The type of user information</p>
     * @property userInfo - <p>The user information</p>
     */
    type IUserInfo = {
        userInfoType: UserInfoType;
        userInfo: string | ISocialSecurityNumber;
    };
    /**
     * @property userInfoType - <p>Must be &quot;EMAIL&quot;</p>
     * @property userInfo - <p>The email address</p>
     */
    type IEmailUserInfo = {
        userInfoType: UserInfoType;
        userInfo: string;
    };
    /**
     * @property userInfoType - <p>Must be &quot;EMAIL&quot;</p>
     * @property userInfo - <p>The social security number</p>
     */
    type ISSNUserInfo = {
        userInfoType: UserInfoType;
        userInfo: ISocialSecurityNumber;
    };
    /**
     * @property userInfoType - <p>Must be &quot;INFERRRED&quot;</p>
     * @property userInfo - <p>Must be &quot;N/A&quot;</p>
     */
    type IInferredUserInfo = {
        userInfoType: UserInfoType;
        userInfo: string;
    };
    /**
     * @property userInfoType - <p>Must be &quot;PHONE&quot;</p>
     * @property userInfo - <p>The email address</p>
     */
    type IPhoneUserInfo = {
        userInfoType: UserInfoType;
        userInfo: string;
    };
    /**
     * @property userInfoType - <p>Must be &quot;ORGID&quot;</p>
     * @property userInfo - <p>The email address</p>
     */
    type IOrgIdUserInfo = {
        userInfoType: UserInfoType;
        userInfo: string;
    };
    type IResultMessage = {
        isOk: boolean;
    };
    type ISuccessResultMessage = {
        isOk: boolean;
        data: any;
    };
    /**
     * @property isOk - <p>Must be false</p>
     * @property data.code - <p>The error code</p>
     * @property data.message - <p>The error message</p>
     * @property data.extendedMessage - <p>The extended error message</p>
     * @property data.trace - <p>The error trace</p>
     */
    type IFailureResult = {
        isOk: boolean;
        data: {
            code: number;
            message: string;
            extendedMessage: string;
            trace: string;
        };
    };
    /**
     * @property isOk - <p>Must be true</p>
     * @property token - <p>The transaction token</p>
     * @property qrCodeUrl - <p>The URL to the QR code</p>
     * @property autostartUrl - <p>The URL to the autostart</p>
     */
    type IInitializationSuccess = {
        isOk: boolean;
        token: string;
        qrCodeUrl: (...params: any[]) => any;
        autostartUrl: (...params: any[]) => any;
    };
    /**
     * @property isOk - <p>Must be true</p>
     * @property status - <p>The transaction status</p>
     * @property isFinal - <p>If the transaction is completed or should be checked again</p>
     */
    type IRequestStatusMessage = {
        isOk: boolean;
        status: RequestStatus;
        isFinal: boolean;
    };
    /**
     * @property isOk - <p>Must be true</p>
     * @property status - <p>The transaction status</p>
     * @property data - <p>The results of the request</p>
     * @property isFinal - <p>Always true</p>
     */
    type ICompletedRequestMessage = {
        isOk: boolean;
        status: RequestStatus;
        data: IFrejaResponse;
        isFinal: boolean;
    };
    /**
     * @property EN - <p>The name of the organisation in English</p>
     * @property SV - <p>The name of the organisation in Swedish</p>
     */
    type IFrejaUserOrganisationName = {
        EN: string;
        SV: string;
    };
    /**
     * @property type - <p>The address type</p>
     * @property validFrom - <p>The date the address is valid from</p>
     * @property validTo - <p>The date the address is valid to</p>
     * @property address - <p>The first line of the address</p>
     * @property postcode - <p>The postal code</p>
     * @property city - <p>The city</p>
     * @property country - <p>The country</p>
     * @property source - <p>The source of the address</p>
     */
    type IFrejaUserAddress = {
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
     * @property type - <p>The document type</p>
     * @property country - <p>The document country</p>
     * @property number - <p>The document number</p>
     * @property expiration - <p>The document expiration date</p>
     */
    type IFrejaUserDocument = {
        type: FrejaDocumentTypes;
        country: string;
        number: string;
        expiration: string;
    };
    /**
     * @property userId - <p>The organisation user ID</p>
     * @property issuerId - <p>The organisation issuer ID</p>
     * @property issuerCode - <p>The organisation issuer code</p>
     * @property issuerName - <p>The organisation issuer name</p>
     * @property [attributes] - <p>The organisation attributes</p>
     */
    type IFrejaUserOrganisation = {
        userId: string;
        issuerId: string;
        issuerCode: string;
        issuerName: IFrejaUserOrganisationName;
        attributes?: IFrejaUserOrganisationAttributes[];
    };
    /**
     * @property title - <p>Title of the Organisation ID to be displayed to the end user</p>
     * @property identifierName - <p>Display name of specific organisation identifier</p>
     * @property identifier - <p>Value of specific organisation identifier</p>
     * @property identifierDisplayTypes - <p>Displays for the identifier</p>
     * @property [attributes] - <p>The organisation attributes</p>
     */
    type IFrejaUserAddOrganisation = {
        title: string;
        identifierName: string;
        identifier: string;
        identifierDisplayTypes: FrejaIdentifierDisplayType[];
        attributes?: IFrejaUserOrganisationAttributes[];
    };
    /**
     * @property title - <p>The title of the notification</p>
     * @property message - <p>The message of the notification</p>
     */
    type IFrejaSignNotification = {
        title: string;
        message: string;
    };
    /**
     * @property key - <p>The attribute key</p>
     * @property value - <p>The attribute value</p>
     * @property displayText - <p>The attribute display text</p>
     */
    type IFrejaUserOrganisationAttributes = {
        key: string;
        value: string;
        displayText: string;
    };
    /**
     * @property [firstname] - <p>The user's first name</p>
     * @property [lastname] - <p>The user's last name</p>
     * @property [fullname] - <p>The user's full name</p>
     * @property [age] - <p>The user's age</p>
     * @property [dateOfBirth] - <p>The user's date of birth</p>
     * @property [ssn] - <p>The user's social security number</p>
     * @property [ssc] - <p>The user's social security country</p>
     * @property [photo] - <p>The user's photo</p>
     */
    type IFrejaUserInfo = {
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
     * @property freja.userInfo - <p>The user information object</p>
     * @property [freja.relyingPartyUserId] - <p>The relying party user ID</p>
     * @property [freja.registrationLevel] - <p>The registration level</p>
     * @property [freja.customIdentifier] - <p>The custom identifier</p>
     */
    type IFrejaServiceData = {};
    /**
     * @property [emailAddress] - <p>The user's primary email address</p>
     * @property [phoneNumber] - <p>The user's primary (first) phone number</p>
     * @property [postalAddress] - <p>The user's current postal address</p>
     * @property [residentialAddress] - <p>The user's current residential address</p>
     * @property [allEmailAddresses] - <p>The user's other email addresses</p>
     * @property [allPhoneNumbers] - <p>The user's other phone numbers</p>
     * @property [allAddresses] - <p>The user's addresses</p>
     */
    type IFrejaUserContact = {
        emailAddress?: string;
        phoneNumber?: string;
        postalAddress?: IFrejaUserAddress;
        residentialAddress?: IFrejaUserAddress;
        allEmailAddresses?: string[];
        allPhoneNumbers?: string[];
        allAddresses?: IFrejaUserAddress[];
    };
    /**
     * @property info - <p>The user information object</p>
     * @property freja - <p>The Freja object</p>
     * @property [document] - <p>The document object</p>
     * @property [organisation] - <p>The organisation object</p>
     * @property contact - <p>The contacts object</p>
     * @property [signature] - <p>The signature data</p>
     */
    type IFrejaResponse = {
        info: IFrejaUserInfo;
        freja: IFrejaServiceData;
        document?: IFrejaUserDocument;
        organisation?: IFrejaUserOrganisation;
        contact: IFrejaUserContact;
        signature?: IFrejaSignatureData;
    };
    /**
     * @property type - <p>The signature type</p>
     * @property timestamp - <p>The date of the signature</p>
     * @property payload - <p>The signed data</p>
     * @property transactionId - <p>The id of the signing transaction from Freja</p>
     * @property ocspResponse - <p>The OCSP response at time of signing</p>
     * @property signature - <p>The signature</p>
     * @property kid - <p>The signature key ID</p>
     * @property alg - <p>The signature algorithm</p>
     * @property [advanced] - <p>The advanced signature</p>
     */
    type IFrejaSignatureData = {
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
    /**
     * <p>The main Freja API class.</p>
     * @param mode - <p>The API mode.</p>
     * @param authPfx - <p>The path to the PFX file.</p>
     * @param authPwd - <p>The password for the PFX file.</p>
     * @param [jwtToken] - <p>The JWT token files ({'x5t': 'file'}).</p>
     * @param [caCert] - <p>The path to the CA certificate file(s).</p>
     */
    class FrejaAPI {
        constructor(mode: APIMode, authPfx: string, authPwd: string, jwtToken?: any, caCert?: undefined | string | string[]);
        /**
         * <p>Create a user info object.</p>
         * @param userData - <p>The user data to create the object from (email, phone, ssn, orgid etc.)</p>
         * @returns <p>The user info object.</p>
         */
        public UserInfoFactory(userData: any | string): IUserInfo;
        /**
         * <p>Initialize an authentication request (shorthand method).</p>
         * @param [userInfo] - <p>The user to create the authentication request for.</p>
         * @param [orgId = false] - <p>If the request is for an organisation id</p>
         */
        public AuthRequest(userInfo?: undefined | string | any | IUserInfo, orgId?: boolean): Promise<IFailureResult | IInitializationSuccess>;
        /**
         * <p>Initialize an signing request (shorthand method).</p>
         * @param userInfo - <p>The user to create the signing request for.</p>
         * @param title - <p>The title of the request (used for notification).</p>
         * @param text - <p>The text to sign.</p>
         * @param [orgId = false] - <p>If the request is for an organisation id</p>
         */
        public SignRequest(userInfo: string | any | IUserInfo, title: string, text: string, orgId?: boolean): Promise<IFailureResult | IInitializationSuccess>;
        /**
         * <p>Initialize an signing request (shorthand method).</p>
         * @param userInfo - <p>The user to create the signing request for.</p>
         * @param title - <p>The title of the request (used for notification).</p>
         * @param text - <p>The text to sign.</p>
         * @param data - <p>The binary data to sign.</p>
         * @param [orgId = false] - <p>If the request is for an organisation id</p>
         */
        public SignBufferRequest(userInfo: string | any | IUserInfo, title: string, text: string, data: Buffer, orgId?: boolean): Promise<IFailureResult | IInitializationSuccess>;
        /**
         * <p>Initialize an organisation id request (shorthand method).</p>
         * @param userInfo - <p>The user to create the organisation id for</p>
         * @param title - <p>The title of the request (used for notification).</p>
         * @param identifier - <p>The identifier name</p>
         * @param value - <p>The identifier value</p>
         * @param [displayTypes = [FrejaIdentifierDisplayType.QR_CODE, FrejaIdentifierDisplayType.TEXT]] - <p>The display types</p>
         */
        public AddOrgIdRequest(userInfo: string | any | IUserInfo, title: string, identifier: string, value: string, displayTypes?: FrejaIdentifierDisplayType[]): void;
        /**
         * <p>Initialize an authentication or signature request.</p>
         * @param requestType - <p>The type of request.</p>
         * @param userInfo - <p>The user information used to initialize, leave empty for inferred.</p>
         * @param additionalParams - <p>Additional parameters for the request.</p>
         */
        public InitRequest(requestType: RequestType, userInfo: string | undefined | any, ...additionalParams: any[]): Promise<IFailureResult | IInitializationSuccess>;
        /**
         * <p>Retrieve the status of a request.</p>
         * @param token - <p>The token of the request.</p>
         */
        public CancelRequest(token: string): Promise<IFailureResult | ICompletedRequestMessage>;
        /**
         * <p>Retrieve the status of a request.</p>
         * @param swedishSSN - <p>The social security number to check</p>
         */
        public CheckCustodianship(swedishSSN: string): Promise<IFailureResult | ISuccessResultMessage>;
        /**
         * <p>Retrieve the status of a request.</p>
         * @param customIdentifier - <p>The custom identifier to append</p>
         * @param userInfo - <p>The user to which to append the custom identifier</p>
         */
        public NewCustomIdentifier(customIdentifier: string, userInfo: IUserInfo): Promise<IFailureResult | ISuccessResultMessage>;
        /**
         * <p>Retrieve the status of a request.</p>
         * @param customIdentifier - <p>The custom identifier to append</p>
         */
        public DeleteCustomIdentifier(customIdentifier: string): Promise<IFailureResult | ISuccessResultMessage>;
        /**
         * <p>Retrieve the status of a request.</p>
         * @param token - <p>The token of the request.</p>
         */
        public InquireRequest(token: string): Promise<IFailureResult | IRequestStatusMessage | ICompletedRequestMessage>;
        /**
         * <p>Translate a code into a message</p>
         * @param errorCode - <p>The error code</p>
         * @returns <p>The error message</p>
         */
        public static GetError(errorCode: number): string;
    }
}

