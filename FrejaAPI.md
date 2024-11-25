## Classes

<dl>
<dt><a href="#FrejaAPI">FrejaAPI</a></dt>
<dd><p>The main Freja API class.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#IFrejaUserOrganisationName">IFrejaUserOrganisationName</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaUserAddress">IFrejaUserAddress</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaUserDocument">IFrejaUserDocument</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaUserOrganisation">IFrejaUserOrganisation</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaUserAddOrganisation">IFrejaUserAddOrganisation</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaSignNotification">IFrejaSignNotification</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaUserOrganisationAttributes">IFrejaUserOrganisationAttributes</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaUserInfo">IFrejaUserInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaServiceData">IFrejaServiceData</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaUserContact">IFrejaUserContact</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaResponse">IFrejaResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFrejaSignatureData">IFrejaSignatureData</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IResultMessage">IResultMessage</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ISuccessResultMessage">ISuccessResultMessage</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IFailureResult">IFailureResult</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IInitializationSuccess">IInitializationSuccess</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IRequestStatusMessage">IRequestStatusMessage</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ICompletedRequestMessage">ICompletedRequestMessage</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ISocialSecurityNumber">ISocialSecurityNumber</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IUserInfo">IUserInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IEmailUserInfo">IEmailUserInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ISSNUserInfo">ISSNUserInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IInferredUserInfo">IInferredUserInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IPhoneUserInfo">IPhoneUserInfo</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#IOrgIdUserInfo">IOrgIdUserInfo</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="APIMode"></a>

## APIMode : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| PRODUCTION | <code>string</code> | "PRODUCTION" |
| TEST | <code>string</code> | "TEST" |

<a name="FrejaIdentifierDisplayType"></a>

## FrejaIdentifierDisplayType : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| QR_CODE | <code>string</code> | "QR_CODE" |
| TEXT | <code>string</code> | "TEXT" |

<a name="RequestType"></a>

## RequestType : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| AUTH | <code>string</code> | "A" |
| SIGN | <code>string</code> | "S" |
| ORGID_AUTH | <code>string</code> | "O" |
| ORGID_SIGN | <code>string</code> | "I" |
| ORGID_MGMT | <code>string</code> | "M" |

<a name="SignatureType"></a>

## SignatureType : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| SIMPLE | <code>string</code> | "SIMPLE" |
| EXTENDED | <code>string</code> | "EXTENDED" |
| XML_MINAMEDDELANDEN | <code>string</code> | "XML_MINAMEDDELANDEN" |

<a name="RegistrationLevel"></a>

## RegistrationLevel : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BASIC | <code>string</code> | "BASIC" |
| EXTENDED | <code>string</code> | "EXTENDED" |
| PLUS | <code>string</code> | "PLUS" |

<a name="ConfirmationMethod"></a>

## ConfirmationMethod : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| DEFAULT | <code>string</code> | "DEFAULT" |
| DEFAULT_AND_FACE | <code>string</code> | "DEFAULT_AND_FACE" |

<a name="UserAttributes"></a>

## UserAttributes : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BASIC_USER_INFO | <code>string</code> | First, last and full name |
| EMAIL_ADDRESS | <code>string</code> | Only primary email address |
| ALL_EMAIL_ADDRESSES | <code>string</code> | All the users email addresses |
| ALL_PHONE_NUMBERS | <code>string</code> | All the users phone numbers |
| DATE_OF_BIRTH | <code>string</code> | The date of birth |
| AGE | <code>string</code> | The user's age |
| PHOTO | <code>string</code> | User enrolled photo |
| ADDRESSES | <code>string</code> | All the user's addresses (Sweden and Norway only) |
| SSN | <code>string</code> | Social security number |
| DOCUMENT | <code>string</code> | Document information |
| REGISTRATION_LEVEL | <code>string</code> | The users registaion level |
| RELYING_PARTY_USER_ID | <code>string</code> | The relying party user ID |
| INTEGRATOR_SPECIFIC_USER_ID | <code>string</code> | The integrator specific user ID |

<a name="UserAttributeCollections"></a>

## UserAttributeCollections : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ALL_EXTENDED | [<code>Array.&lt;UserAttributes&gt;</code>](#UserAttributes) | All user attributes (Requires EXTENDED or PLUS registration level) |
| ALL_BASIC | [<code>Array.&lt;UserAttributes&gt;</code>](#UserAttributes) | All attributes when running in basic mode (All attributes when in BASIC registration level) |
| COMMON_AUTH | [<code>Array.&lt;UserAttributes&gt;</code>](#UserAttributes) | Attributes commonly used for authentication (Requires EXTENDED or PLUS registration level) |
| COMMON_SIGN | [<code>Array.&lt;UserAttributes&gt;</code>](#UserAttributes) | Attributes commonly used for signing (Requires EXTENDED or PLUS registration level) |

<a name="RequestStatus"></a>

## RequestStatus : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| STARTED | <code>string</code> | "STARTED" |
| DELIVERED | <code>string</code> | "DELIVERED_TO_MOBILE" |
| CANCELLED | <code>string</code> | "CANCELLED" |
| REJECTED | <code>string</code> | "REJECTED" |
| EXPIRED | <code>string</code> | "EXPIRED" |
| RP_CANCELLED | <code>string</code> | "RP_CANCELLED" |
| RP_REJECTED | <code>string</code> | "RP_REJECTED" |
| APPROVED | <code>string</code> | "APPROVED" |

<a name="FrejaDocumentTypes"></a>

## FrejaDocumentTypes : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| PASSPORT | <code>string</code> | "PASS" |
| DRIVER_LICENSE | <code>string</code> | "DRILIC" |
| NATIONAL_ID | <code>string</code> | "NATID" |
| SIS_ID | <code>string</code> | "IDSIS" |
| SWEDISH_TAX_ID | <code>string</code> | "TAXID" |
| OTHER | <code>string</code> | "OTHER" |

<a name="FrejaAPIErrors"></a>

## FrejaAPIErrors : <code>enum</code>
**Kind**: global enum  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| 1001 | <code>string</code> | Invalid or missing userInfoType. |
| 1002 | <code>string</code> | Invalid or missing userInfo. |
| 1003 | <code>string</code> | Invalid restrict. |
| 1004 | <code>string</code> | You are not allowed to call this method. |
| 1005 | <code>string</code> | User has disabled your service. |
| 1007 | <code>string</code> | Invalid min registration level. |
| 1008 | <code>string</code> | Unknown Relying Party. |
| 1009 | <code>string</code> | You are not allowed to request integratorSpecificUserId parameter. |
| 1010 | <code>string</code> | JSON request cannot be parsed. |
| 1012 | <code>string</code> | User with the specified userInfo does not exist in Freja eID database. |
| 1013 | <code>string</code> | You are not allowed to request user custodianship information. |
| 1014 | <code>string</code> | Invalid user CRN, CRN missing or user country code is not SE. (The CRN is the equivalent of an SSN) |
| 1100 | <code>string</code> | Invalid reference (for example, nonexistent or expired). |
| 1200 | <code>string</code> | Invalid or missing includePrevious parameter. |
| 2000 | <code>string</code> | Authentication request failed. Previous authentication request was rejected due to security reasons. |
| 2002 | <code>string</code> | Invalid attributesToReturn parameter. |
| 2003 | <code>string</code> | Custom identifier has to exist when it is requested. |
| 3000 | <code>string</code> | Invalid or missing dataToSignType. |
| 3001 | <code>string</code> | Invalid or missing dataToSign. |
| 3002 | <code>string</code> | Invalid or missing signatureType. |
| 3003 | <code>string</code> | Invalid expiry time. |
| 3004 | <code>string</code> | Invalid push notification. |
| 3005 | <code>string</code> | Invalid attributesToReturn parameter. |
| 3006 | <code>string</code> | Custom identifier has to exist when it is requested. |
| 3007 | <code>string</code> | Invalid title. |
| 3008 | <code>string</code> | Invalid SSN for advanced signing. Advanced signing cannot be performed by users from your country. |
| 3009 | <code>string</code> | Invalid advanced signing request. Missing SSN and basicUserInfo in its attributesToReturn parameter. |
| 4000 | <code>string</code> | Invalid or missing Organisation ID identifier. |
| 4002 | <code>string</code> | This Organisation ID identifier is already used. |
| 4003 | <code>string</code> | Invalid expiry. |
| 4004 | <code>string</code> | Invalid or missing Organisation ID title. |
| 4005 | <code>string</code> | Invalid or missing Organisation ID identifier name. |
| 4006 | <code>string</code> | Invalid or missing Organisation ID. |
| 4008 | <code>string</code> | Invalid display type. |
| 4007 | <code>string</code> | Invalid organisation id issuer. |
| 4009 | <code>string</code> | Invalid additional attributes. |
| 5000 | <code>string</code> | Invalid or missing customIdentifier. |
| 5001 | <code>string</code> | There is no user for given custom identifier. |
| 5002 | <code>string</code> | You have already used this customIdentifier |
| 9000 | <code>string</code> | communication error. |
| 9001 | <code>string</code> | text is needed for signature requests. |
| 9002 | <code>string</code> | signatureType is needed for signature requests. |
| 9003 | <code>string</code> | binaryData may not be present on SignatureType.SIMPLE requests. |
| 9004 | <code>string</code> | notification must be of type object. |
| 9005 | <code>string</code> | title is needed for notification object. |
| 9006 | <code>string</code> | message is needed for notification object. |
| 9009 | <code>string</code> | requestType is not valid. |
| 9010 | <code>string</code> | Unkown status code. |
| 9011 | <code>string</code> | Unable to parse response. |
| 9012 | <code>string</code> | Missing arguments. |
| 9013 | <code>string</code> | Missing or invalid orgId object |
| 9014 | <code>string</code> | Missing or invalid title |
| 9015 | <code>string</code> | Missing or invalid identifierName |
| 9016 | <code>string</code> | Missing or invalid identifier |
| 9017 | <code>string</code> | Missing or invalid identifierDisplayTypes |
| 9018 | <code>string</code> | Missing or invalid attributes |
| 9019 | <code>string</code> | Invalid or missing token |
| 9020 | <code>string</code> | Invalid or missing swedish SSN |
| 9021 | <code>string</code> | Invalid or missing custom identifier |
| 9022 | <code>string</code> | Invalid or missing userInfo |

<a name="FrejaUserAddressType"></a>

## FrejaUserAddressType : <code>enum</code>
**Kind**: global enum  
**Category**: Freja  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| POSTAL | <code>string</code> | "POSTAL" |
| RESIDENTIAL | <code>string</code> | "RESIDENTIAL" |

<a name="FrejaUserAddressSource"></a>

## FrejaUserAddressSource : <code>enum</code>
**Kind**: global enum  
**Category**: Freja  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| GOVERNMENT_REGISTRY | <code>string</code> | "GOVERNMENT_REGISTRY" |

<a name="IFrejaUserOrganisationName"></a>

## IFrejaUserOrganisationName : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| EN | <code>string</code> | The name of the organisation in English |
| SV | <code>string</code> | The name of the organisation in Swedish |

<a name="IFrejaUserAddress"></a>

## IFrejaUserAddress : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | [<code>FrejaUserAddressType</code>](#FrejaUserAddressType) | The address type |
| validFrom | <code>string</code> | The date the address is valid from |
| validTo | <code>string</code> | The date the address is valid to |
| address | <code>Array.&lt;string&gt;</code> | The first line of the address |
| postcode | <code>string</code> | The postal code |
| city | <code>string</code> | The city |
| country | <code>string</code> | The country |
| source | [<code>FrejaUserAddressSource</code>](#FrejaUserAddressSource) | The source of the address |

<a name="IFrejaUserDocument"></a>

## IFrejaUserDocument : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | [<code>FrejaDocumentTypes</code>](#FrejaDocumentTypes) | The document type |
| country | <code>string</code> | The document country |
| number | <code>string</code> | The document number |
| expiration | <code>string</code> | The document expiration date |

<a name="IFrejaUserOrganisation"></a>

## IFrejaUserOrganisation : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The organisation user ID |
| issuerId | <code>string</code> | The organisation issuer ID |
| issuerCode | <code>string</code> | The organisation issuer code |
| issuerName | [<code>IFrejaUserOrganisationName</code>](#IFrejaUserOrganisationName) | The organisation issuer name |
| [attributes] | [<code>Array.&lt;IFrejaUserOrganisationAttributes&gt;</code>](#IFrejaUserOrganisationAttributes) | The organisation attributes |

<a name="IFrejaUserAddOrganisation"></a>

## IFrejaUserAddOrganisation : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | Title of the Organisation ID to be displayed to the end user |
| identifierName | <code>string</code> | Display name of specific organisation identifier |
| identifier | <code>string</code> | Value of specific organisation identifier |
| identifierDisplayTypes | [<code>Array.&lt;FrejaIdentifierDisplayType&gt;</code>](#FrejaIdentifierDisplayType) | Displays for the identifier |
| [attributes] | [<code>Array.&lt;IFrejaUserOrganisationAttributes&gt;</code>](#IFrejaUserOrganisationAttributes) | The organisation attributes |

<a name="IFrejaSignNotification"></a>

## IFrejaSignNotification : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the notification |
| message | <code>string</code> | The message of the notification |

<a name="IFrejaUserOrganisationAttributes"></a>

## IFrejaUserOrganisationAttributes : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The attribute key |
| value | <code>string</code> | The attribute value |
| displayText | <code>string</code> | The attribute display text |

<a name="IFrejaUserInfo"></a>

## IFrejaUserInfo : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [firstname] | <code>string</code> | The user's first name |
| [lastname] | <code>string</code> | The user's last name |
| [fullname] | <code>string</code> | The user's full name |
| [age] | <code>number</code> | The user's age |
| [dateOfBirth] | <code>string</code> | The user's date of birth |
| [ssn] | <code>string</code> | The user's social security number |
| [ssc] | <code>string</code> | The user's social security country |
| [photo] | <code>string</code> | The user's photo |

<a name="IFrejaServiceData"></a>

## IFrejaServiceData : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| freja.userInfo | [<code>IUserInfo</code>](#IUserInfo) | The user information object |
| [freja.relyingPartyUserId] | <code>string</code> | The relying party user ID |
| [freja.registrationLevel] | [<code>RegistrationLevel</code>](#RegistrationLevel) | The registration level |
| [freja.customIdentifier] | <code>string</code> | The custom identifier |

<a name="IFrejaUserContact"></a>

## IFrejaUserContact : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [emailAddress] | <code>string</code> | The user's primary email address |
| [phoneNumber] | <code>string</code> | The user's primary (first) phone number |
| [postalAddress] | [<code>IFrejaUserAddress</code>](#IFrejaUserAddress) | The user's current postal address |
| [residentialAddress] | [<code>IFrejaUserAddress</code>](#IFrejaUserAddress) | The user's current residential address |
| [allEmailAddresses] | <code>Array.&lt;string&gt;</code> | The user's other email addresses |
| [allPhoneNumbers] | <code>Array.&lt;string&gt;</code> | The user's other phone numbers |
| [allAddresses] | [<code>Array.&lt;IFrejaUserAddress&gt;</code>](#IFrejaUserAddress) | The user's addresses |

<a name="IFrejaResponse"></a>

## IFrejaResponse : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| info | [<code>IFrejaUserInfo</code>](#IFrejaUserInfo) | The user information object |
| freja | [<code>IFrejaServiceData</code>](#IFrejaServiceData) | The Freja object |
| [document] | [<code>IFrejaUserDocument</code>](#IFrejaUserDocument) | The document object |
| [organisation] | [<code>IFrejaUserOrganisation</code>](#IFrejaUserOrganisation) | The organisation object |
| contact | [<code>IFrejaUserContact</code>](#IFrejaUserContact) | The contacts object |
| [signature] | [<code>IFrejaSignatureData</code>](#IFrejaSignatureData) | The signature data |

<a name="IFrejaSignatureData"></a>

## IFrejaSignatureData : <code>Object</code>
**Kind**: global typedef  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | [<code>SignatureType</code>](#SignatureType) | The signature type |
| timestamp | <code>Date</code> | The date of the signature |
| payload | <code>String</code> | The signed data |
| transactionId | <code>String</code> | The id of the signing transaction from Freja |
| ocspResponse | <code>Buffer</code> | The OCSP response at time of signing |
| signature | <code>String</code> | The signature |
| kid | <code>String</code> | The signature key ID |
| alg | <code>String</code> | The signature algorithm |
| [advanced] | <code>Object</code> | The advanced signature |

<a name="IResultMessage"></a>

## IResultMessage : <code>Object</code>
**Kind**: global typedef  
**Category**: Responses  
**Properties**

| Name | Type |
| --- | --- |
| isOk | <code>boolean</code> | 

<a name="ISuccessResultMessage"></a>

## ISuccessResultMessage : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IResultMessage</code>](#IResultMessage)  
**Category**: Responses  
**Properties**

| Name | Type |
| --- | --- |
| isOk | <code>boolean</code> | 
| data | <code>any</code> | 

<a name="IFailureResult"></a>

## IFailureResult : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IResultMessage</code>](#IResultMessage)  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be false |
| data | <code>Object</code> |  |
| data.code | <code>number</code> | The error code |
| data.message | <code>string</code> | The error message |
| data.extendedMessage | <code>string</code> | The extended error message |
| data.trace | <code>string</code> | The error trace |

<a name="IInitializationSuccess"></a>

## IInitializationSuccess : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IResultMessage</code>](#IResultMessage)  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be true |
| token | <code>string</code> | The transaction token |
| qrCodeUrl | <code>function</code> | The URL to the QR code |
| autostartUrl | <code>function</code> | The URL to the autostart |

<a name="IRequestStatusMessage"></a>

## IRequestStatusMessage : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IResultMessage</code>](#IResultMessage)  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be true |
| status | [<code>RequestStatus</code>](#RequestStatus) | The transaction status |
| isFinal | <code>boolean</code> | If the transaction is completed or should be checked again |

<a name="ICompletedRequestMessage"></a>

## ICompletedRequestMessage : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IRequestStatusMessage</code>](#IRequestStatusMessage)  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be true |
| status | [<code>RequestStatus</code>](#RequestStatus) | The transaction status |
| data | <code>IFrejaUser</code> | The results of the request |
| isFinal | <code>boolean</code> | Always true |

<a name="UserInfoType"></a>

## UserInfoType : <code>enum</code>
**Kind**: global enum  
**Category**: UserInfo  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| INFERRED | <code>string</code> | "INFERRED" |
| EMAIL | <code>string</code> | "EMAIL" |
| PHONE | <code>string</code> | "PHONE" |
| SSN | <code>string</code> | "SSN" |
| ORGID | <code>string</code> | "ORG_ID" |

<a name="ISocialSecurityNumber"></a>

## ISocialSecurityNumber : <code>Object</code>
**Kind**: global typedef  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| country | <code>string</code> | The country code |
| ssn | <code>string</code> | The social security number |

<a name="IUserInfo"></a>

## IUserInfo : <code>Object</code>
**Kind**: global typedef  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | [<code>UserInfoType</code>](#UserInfoType) | The type of user information |
| userInfo | <code>string</code> \| [<code>ISocialSecurityNumber</code>](#ISocialSecurityNumber) | The user information |

<a name="IEmailUserInfo"></a>

## IEmailUserInfo : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IUserInfo</code>](#IUserInfo)  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | [<code>UserInfoType</code>](#UserInfoType) | Must be "EMAIL" |
| userInfo | <code>string</code> | The email address |

<a name="ISSNUserInfo"></a>

## ISSNUserInfo : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IUserInfo</code>](#IUserInfo)  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | [<code>UserInfoType</code>](#UserInfoType) | Must be "EMAIL" |
| userInfo | [<code>ISocialSecurityNumber</code>](#ISocialSecurityNumber) | The social security number |

<a name="IInferredUserInfo"></a>

## IInferredUserInfo : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IUserInfo</code>](#IUserInfo)  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | [<code>UserInfoType</code>](#UserInfoType) | Must be "INFERRRED" |
| userInfo | <code>string</code> | Must be "N/A" |

<a name="IPhoneUserInfo"></a>

## IPhoneUserInfo : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IUserInfo</code>](#IUserInfo)  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | [<code>UserInfoType</code>](#UserInfoType) | Must be "PHONE" |
| userInfo | <code>string</code> | The email address |

<a name="IOrgIdUserInfo"></a>

## IOrgIdUserInfo : <code>Object</code>
**Kind**: global typedef  
**Extends**: [<code>IUserInfo</code>](#IUserInfo)  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | [<code>UserInfoType</code>](#UserInfoType) | Must be "ORGID" |
| userInfo | <code>string</code> | The email address |

