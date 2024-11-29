<a name="module_freja"></a>

## freja
The Freja module will allow you to interact with the Freja eID API. The module is designed to be used in a Node.js environment and will allow you to create authentication and signing requests, as well as manage user information.

**Version**: 1.0.3  

* [freja](#module_freja)
    * _static_
        * [.FrejaAPI](#module_freja.FrejaAPI)
            * [new FrejaAPI(apiEnvironment, authPfx, authPwd, [trustedJWTCertificates], [trustedCACertificates])](#new_module_freja.FrejaAPI_new)
            * _instance_
                * [.UserInfoFactory(userData)](#module_freja.FrejaAPI+UserInfoFactory) ⇒ <code>IUserInfo</code>
                * [.AuthRequest([userInfo], [orgId])](#module_freja.FrejaAPI+AuthRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
                * [.SignRequest(userInfo, title, text, [orgId])](#module_freja.FrejaAPI+SignRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
                * [.SignBufferRequest(userInfo, title, text, data, [orgId])](#module_freja.FrejaAPI+SignBufferRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
                * [.AddOrgIdRequest(userInfo, title, identifier, value, [displayTypes])](#module_freja.FrejaAPI+AddOrgIdRequest)
                * [.GetOrgIdUserList()](#module_freja.FrejaAPI+GetOrgIdUserList) ⇒ <code>Promise.&lt;(IFailureResult\|IFrejaOrgIdUserList)&gt;</code>
                * [.UpdateOrgId(identifier, additionalAttributes)](#module_freja.FrejaAPI+UpdateOrgId) ⇒ <code>Promise.&lt;(IFailureResult\|IUpdateSuccessMessage)&gt;</code>
                * [.RevokeOrgId(identifier)](#module_freja.FrejaAPI+RevokeOrgId) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
                * [.InitRequest(requestType, userInfo, ...additionalParams)](#module_freja.FrejaAPI+InitRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
                * [.CancelRequest(token)](#module_freja.FrejaAPI+CancelRequest) ⇒ <code>Promise.&lt;(IFailureResult\|ICompletedRequestMessage)&gt;</code>
                * [.CheckCustodianship(swedishSSN)](#module_freja.FrejaAPI+CheckCustodianship) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
                * [.NewCustomIdentifier(customIdentifier, userInfo)](#module_freja.FrejaAPI+NewCustomIdentifier) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
                * [.DeleteCustomIdentifier(customIdentifier)](#module_freja.FrejaAPI+DeleteCustomIdentifier) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
                * [.InquireRequest(token)](#module_freja.FrejaAPI+InquireRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IRequestStatusMessage\|ICompletedRequestMessage)&gt;</code>
            * _static_
                * [.GetError(errorCode)](#module_freja.FrejaAPI.GetError) ⇒ <code>string</code>
    * _inner_
        * _Enums_
            * [~FrejaAPIEnvironment](#module_freja..FrejaAPIEnvironment) : <code>enum</code>
            * [~FrejaRegistrationState](#module_freja..FrejaRegistrationState) : <code>enum</code>
            * [~FrejaIdentifierDisplayType](#module_freja..FrejaIdentifierDisplayType) : <code>enum</code>
            * [~FrejaRequestType](#module_freja..FrejaRequestType) : <code>enum</code>
            * [~FrejaSignatureType](#module_freja..FrejaSignatureType) : <code>enum</code>
            * [~FrejaRegistrationLevel](#module_freja..FrejaRegistrationLevel) : <code>enum</code>
            * [~FrejaConfirmationMethod](#module_freja..FrejaConfirmationMethod) : <code>enum</code>
            * [~FrejaUserAttributes](#module_freja..FrejaUserAttributes) : <code>enum</code>
            * [~FrejaUserAttributeCollections](#module_freja..FrejaUserAttributeCollections) : <code>enum</code>
            * [~FrejaRequestStatus](#module_freja..FrejaRequestStatus) : <code>enum</code>
            * [~FrejaDocumentTypes](#module_freja..FrejaDocumentTypes) : <code>enum</code>
        * _Freja_
            * [~FrejaUserAddressType](#module_freja..FrejaUserAddressType) : <code>enum</code>
            * [~FrejaUserAddressSource](#module_freja..FrejaUserAddressSource) : <code>enum</code>
            * [~IFrejaOrgIdUserInfo](#module_freja..IFrejaOrgIdUserInfo) : <code>Object</code>
            * [~IFrejaUserOrganisationName](#module_freja..IFrejaUserOrganisationName) : <code>Object</code>
            * [~IFrejaUserAddress](#module_freja..IFrejaUserAddress) : <code>Object</code>
            * [~IFrejaUserDocument](#module_freja..IFrejaUserDocument) : <code>Object</code>
            * [~IFrejaUserOrganisation](#module_freja..IFrejaUserOrganisation) : <code>Object</code>
            * [~IFrejaUserAddOrganisation](#module_freja..IFrejaUserAddOrganisation) : <code>Object</code>
            * [~IFrejaSignNotification](#module_freja..IFrejaSignNotification) : <code>Object</code>
            * [~IFrejaUserOrganisationAttributes](#module_freja..IFrejaUserOrganisationAttributes) : <code>Object</code>
            * [~IFrejaUserDetails](#module_freja..IFrejaUserDetails) : <code>Object</code>
            * [~IFrejaServiceData](#module_freja..IFrejaServiceData) : <code>Object</code>
            * [~IFrejaUserContact](#module_freja..IFrejaUserContact) : <code>Object</code>
            * [~IFrejaResponse](#module_freja..IFrejaResponse) : <code>Object</code>
            * [~IFrejaSignatureData](#module_freja..IFrejaSignatureData) : <code>Object</code>
        * _Responses_
            * [~IResultMessage](#module_freja..IResultMessage) : <code>Object</code>
            * [~IFrejaOrgIdUserList](#module_freja..IFrejaOrgIdUserList) : <code>Object</code>
            * [~ISuccessResultMessage](#module_freja..ISuccessResultMessage) : <code>Object</code>
            * [~IUpdateSuccessMessage](#module_freja..IUpdateSuccessMessage) : <code>Object</code>
            * [~IFailureResult](#module_freja..IFailureResult) : <code>Object</code>
            * [~IInitializationSuccess](#module_freja..IInitializationSuccess) : <code>Object</code>
            * [~IRequestStatusMessage](#module_freja..IRequestStatusMessage) : <code>Object</code>
            * [~ICompletedRequestMessage](#module_freja..ICompletedRequestMessage) : <code>Object</code>
        * _UserInfo_
            * [~UserInfoType](#module_freja..UserInfoType) : <code>enum</code>
            * [~ISocialSecurityNumber](#module_freja..ISocialSecurityNumber) : <code>Object</code>
            * [~IUserInfo](#module_freja..IUserInfo) : <code>Object</code>
            * [~IEmailUserInfo](#module_freja..IEmailUserInfo) : <code>Object</code>
            * [~ISSNUserInfo](#module_freja..ISSNUserInfo) : <code>Object</code>
            * [~IInferredUserInfo](#module_freja..IInferredUserInfo) : <code>Object</code>
            * [~IPhoneUserInfo](#module_freja..IPhoneUserInfo) : <code>Object</code>
            * [~IOrgIdUserInfo](#module_freja..IOrgIdUserInfo) : <code>Object</code>

<a name="module_freja.FrejaAPI"></a>

### freja.FrejaAPI
**Kind**: static class of [<code>freja</code>](#module_freja)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| UserAttributes | <code>Array.&lt;FrejaUserAttributes&gt;</code> | The user attributes to return. |
| RegistrationLevel | <code>FrejaRegistrationLevel</code> | The minimum requested level. |
| ConfirmationMethod | <code>FrejaConfirmationMethod</code> |  |
| APIEnvironment | <code>APIEnvironment</code> | The API mode. |
| RelyingPartyId | <code>string</code> | The relying party ID (used by integrators only). |


* [.FrejaAPI](#module_freja.FrejaAPI)
    * [new FrejaAPI(apiEnvironment, authPfx, authPwd, [trustedJWTCertificates], [trustedCACertificates])](#new_module_freja.FrejaAPI_new)
    * _instance_
        * [.UserInfoFactory(userData)](#module_freja.FrejaAPI+UserInfoFactory) ⇒ <code>IUserInfo</code>
        * [.AuthRequest([userInfo], [orgId])](#module_freja.FrejaAPI+AuthRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
        * [.SignRequest(userInfo, title, text, [orgId])](#module_freja.FrejaAPI+SignRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
        * [.SignBufferRequest(userInfo, title, text, data, [orgId])](#module_freja.FrejaAPI+SignBufferRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
        * [.AddOrgIdRequest(userInfo, title, identifier, value, [displayTypes])](#module_freja.FrejaAPI+AddOrgIdRequest)
        * [.GetOrgIdUserList()](#module_freja.FrejaAPI+GetOrgIdUserList) ⇒ <code>Promise.&lt;(IFailureResult\|IFrejaOrgIdUserList)&gt;</code>
        * [.UpdateOrgId(identifier, additionalAttributes)](#module_freja.FrejaAPI+UpdateOrgId) ⇒ <code>Promise.&lt;(IFailureResult\|IUpdateSuccessMessage)&gt;</code>
        * [.RevokeOrgId(identifier)](#module_freja.FrejaAPI+RevokeOrgId) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
        * [.InitRequest(requestType, userInfo, ...additionalParams)](#module_freja.FrejaAPI+InitRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
        * [.CancelRequest(token)](#module_freja.FrejaAPI+CancelRequest) ⇒ <code>Promise.&lt;(IFailureResult\|ICompletedRequestMessage)&gt;</code>
        * [.CheckCustodianship(swedishSSN)](#module_freja.FrejaAPI+CheckCustodianship) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
        * [.NewCustomIdentifier(customIdentifier, userInfo)](#module_freja.FrejaAPI+NewCustomIdentifier) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
        * [.DeleteCustomIdentifier(customIdentifier)](#module_freja.FrejaAPI+DeleteCustomIdentifier) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
        * [.InquireRequest(token)](#module_freja.FrejaAPI+InquireRequest) ⇒ <code>Promise.&lt;(IFailureResult\|IRequestStatusMessage\|ICompletedRequestMessage)&gt;</code>
    * _static_
        * [.GetError(errorCode)](#module_freja.FrejaAPI.GetError) ⇒ <code>string</code>

<a name="new_module_freja.FrejaAPI_new"></a>

#### new FrejaAPI(apiEnvironment, authPfx, authPwd, [trustedJWTCertificates], [trustedCACertificates])
The main Freja API class.

**Throws**:

- <code>Error</code> If the mode is invalid or if the password is missing.
- <code>Error</code> If the PFX or CA certificate file does not exist. * @example


| Param | Type | Description |
| --- | --- | --- |
| apiEnvironment | <code>FrejaAPIEnvironment</code> | The API mode. |
| authPfx | <code>string</code> | The path to the PFX file. |
| authPwd | <code>string</code> | The password for the PFX file. |
| [trustedJWTCertificates] | <code>Object</code> | The JWT token files ({'x5t': 'file'}). |
| [trustedCACertificates] | <code>undefined</code> \| <code>string</code> \| <code>Array.&lt;string&gt;</code> | The path to the CA certificate file(s). |

<a name="module_freja.FrejaAPI+UserInfoFactory"></a>

#### frejaAPI.UserInfoFactory(userData) ⇒ <code>IUserInfo</code>
Create a user info object.

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Returns**: <code>IUserInfo</code> - The user info object.  
**Throws**:

- <code>Error</code> If the data is invalid or missing.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| userData | <code>Object</code> \| <code>String</code> | The user data to create the object from (email, phone, ssn, orgid etc.) |

<a name="module_freja.FrejaAPI+AuthRequest"></a>

#### frejaAPI.AuthRequest([userInfo], [orgId]) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
Initialize an authentication request (shorthand method).

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [userInfo] | <code>undefined</code> \| <code>string</code> \| <code>object</code> \| <code>IUserInfo</code> |  | The user to create the authentication request for. |
| [orgId] | <code>boolean</code> | <code>false</code> | If the request is for an organisation id |

<a name="module_freja.FrejaAPI+SignRequest"></a>

#### frejaAPI.SignRequest(userInfo, title, text, [orgId]) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
Initialize an signing request (shorthand method).

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userInfo | <code>string</code> \| <code>object</code> \| <code>IUserInfo</code> |  | The user to create the signing request for. |
| title | <code>string</code> |  | The title of the request (used for notification). |
| text | <code>string</code> |  | The text to sign. |
| [orgId] | <code>boolean</code> | <code>false</code> | If the request is for an organisation id |

<a name="module_freja.FrejaAPI+SignBufferRequest"></a>

#### frejaAPI.SignBufferRequest(userInfo, title, text, data, [orgId]) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
Initialize an signing request (shorthand method).

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userInfo | <code>string</code> \| <code>object</code> \| <code>IUserInfo</code> |  | The user to create the signing request for. |
| title | <code>string</code> |  | The title of the request (used for notification). |
| text | <code>string</code> |  | The text to sign. |
| data | <code>Buffer</code> |  | The binary data to sign. |
| [orgId] | <code>boolean</code> | <code>false</code> | If the request is for an organisation id |

<a name="module_freja.FrejaAPI+AddOrgIdRequest"></a>

#### frejaAPI.AddOrgIdRequest(userInfo, title, identifier, value, [displayTypes])
Initialize an organisation id request (shorthand method).

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userInfo | <code>string</code> \| <code>object</code> \| <code>IUserInfo</code> |  | The user to create the organisation id for |
| title | <code>string</code> |  | The title of the request (used for notification). |
| identifier | <code>string</code> |  | The identifier name |
| value | <code>string</code> |  | The identifier value |
| [displayTypes] | <code>Array.&lt;FrejaIdentifierDisplayType&gt;</code> | <code>[FrejaIdentifierDisplayType.QR_CODE, FrejaIdentifierDisplayType.TEXT]</code> | The display types |

<a name="module_freja.FrejaAPI+GetOrgIdUserList"></a>

#### frejaAPI.GetOrgIdUserList() ⇒ <code>Promise.&lt;(IFailureResult\|IFrejaOrgIdUserList)&gt;</code>
Gets a full list of issued organisation ids

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  
<a name="module_freja.FrejaAPI+UpdateOrgId"></a>

#### frejaAPI.UpdateOrgId(identifier, additionalAttributes) ⇒ <code>Promise.&lt;(IFailureResult\|IUpdateSuccessMessage)&gt;</code>
Updates a issued organisation id with additional attributes

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | The custom identifier to delete |
| additionalAttributes | <code>Array.&lt;IFrejaUserOrganisationAttributes&gt;</code> | Additional attributes to update |

<a name="module_freja.FrejaAPI+RevokeOrgId"></a>

#### frejaAPI.RevokeOrgId(identifier) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
Deletes a issued organisation id

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | The custom identifier to delete |

<a name="module_freja.FrejaAPI+InitRequest"></a>

#### frejaAPI.InitRequest(requestType, userInfo, ...additionalParams) ⇒ <code>Promise.&lt;(IFailureResult\|IInitializationSuccess)&gt;</code>
Initialize an authentication or signature request.

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| requestType | <code>FrejaRequestType</code> | The type of request. |
| userInfo | <code>string</code> \| <code>undefined</code> \| <code>object</code> | The user information used to initialize, leave empty for inferred. |
| ...additionalParams | <code>any</code> | Additional parameters for the request. |

<a name="module_freja.FrejaAPI+CancelRequest"></a>

#### frejaAPI.CancelRequest(token) ⇒ <code>Promise.&lt;(IFailureResult\|ICompletedRequestMessage)&gt;</code>
Retrieve the status of a request.

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token of the request. |

<a name="module_freja.FrejaAPI+CheckCustodianship"></a>

#### frejaAPI.CheckCustodianship(swedishSSN) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
Retrieve the status of a request.

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| swedishSSN | <code>string</code> | The social security number to check |

<a name="module_freja.FrejaAPI+NewCustomIdentifier"></a>

#### frejaAPI.NewCustomIdentifier(customIdentifier, userInfo) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
Retrieve the status of a request.

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| customIdentifier | <code>string</code> | The custom identifier to append |
| userInfo | <code>IUserInfo</code> | The user to which to append the custom identifier |

<a name="module_freja.FrejaAPI+DeleteCustomIdentifier"></a>

#### frejaAPI.DeleteCustomIdentifier(customIdentifier) ⇒ <code>Promise.&lt;(IFailureResult\|ISuccessResultMessage)&gt;</code>
Retrieve the status of a request.

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| customIdentifier | <code>string</code> | The custom identifier to append |

<a name="module_freja.FrejaAPI+InquireRequest"></a>

#### frejaAPI.InquireRequest(token) ⇒ <code>Promise.&lt;(IFailureResult\|IRequestStatusMessage\|ICompletedRequestMessage)&gt;</code>
Retrieve the status of a request.

**Kind**: instance method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | The token of the request. |

<a name="module_freja.FrejaAPI.GetError"></a>

#### FrejaAPI.GetError(errorCode) ⇒ <code>string</code>
Translate a code into a message

**Kind**: static method of [<code>FrejaAPI</code>](#module_freja.FrejaAPI)  
**Returns**: <code>string</code> - The error message  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| errorCode | <code>number</code> | The error code |

<a name="module_freja..FrejaAPIEnvironment"></a>

### freja~FrejaAPIEnvironment : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| PRODUCTION | <code>string</code> | "PRODUCTION" |
| TEST | <code>string</code> | "TEST" |

<a name="module_freja..FrejaRegistrationState"></a>

### freja~FrejaRegistrationState : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| EXTENDED | <code>string</code> | "EXTENDED" |
| VETTING_CONFIRMED | <code>string</code> | "VETTING_CONFIRMED" |
| PLUS | <code>string</code> | "PLUS" |

<a name="module_freja..FrejaIdentifierDisplayType"></a>

### freja~FrejaIdentifierDisplayType : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| QR_CODE | <code>string</code> | "QR_CODE" |
| TEXT | <code>string</code> | "TEXT" |

<a name="module_freja..FrejaRequestType"></a>

### freja~FrejaRequestType : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
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

<a name="module_freja..FrejaSignatureType"></a>

### freja~FrejaSignatureType : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| SIMPLE | <code>string</code> | "SIMPLE" |
| EXTENDED | <code>string</code> | "EXTENDED" |
| XML_MINAMEDDELANDEN | <code>string</code> | "XML_MINAMEDDELANDEN" |

<a name="module_freja..FrejaRegistrationLevel"></a>

### freja~FrejaRegistrationLevel : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| BASIC | <code>string</code> | "BASIC" |
| EXTENDED | <code>string</code> | "EXTENDED" |
| PLUS | <code>string</code> | "PLUS" |

<a name="module_freja..FrejaConfirmationMethod"></a>

### freja~FrejaConfirmationMethod : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| DEFAULT | <code>string</code> | "DEFAULT" |
| DEFAULT_AND_FACE | <code>string</code> | "DEFAULT_AND_FACE" |

<a name="module_freja..FrejaUserAttributes"></a>

### freja~FrejaUserAttributes : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
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

<a name="module_freja..FrejaUserAttributeCollections"></a>

### freja~FrejaUserAttributeCollections : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Enums  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ALL_EXTENDED | <code>Array.&lt;UserAttributes&gt;</code> | All user attributes (Requires EXTENDED or PLUS registration level) |
| ALL_BASIC | <code>Array.&lt;UserAttributes&gt;</code> | All attributes when running in basic mode (All attributes when in BASIC registration level) |
| COMMON_AUTH | <code>Array.&lt;UserAttributes&gt;</code> | Attributes commonly used for authentication (Requires EXTENDED or PLUS registration level) |
| COMMON_SIGN | <code>Array.&lt;UserAttributes&gt;</code> | Attributes commonly used for signing (Requires EXTENDED or PLUS registration level) |

<a name="module_freja..FrejaRequestStatus"></a>

### freja~FrejaRequestStatus : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
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

<a name="module_freja..FrejaDocumentTypes"></a>

### freja~FrejaDocumentTypes : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
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

<a name="module_freja..FrejaUserAddressType"></a>

### freja~FrejaUserAddressType : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| POSTAL | <code>string</code> | "POSTAL" |
| RESIDENTIAL | <code>string</code> | "RESIDENTIAL" |

<a name="module_freja..FrejaUserAddressSource"></a>

### freja~FrejaUserAddressSource : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Read only**: true  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| GOVERNMENT_REGISTRY | <code>string</code> | "GOVERNMENT_REGISTRY" |

<a name="module_freja..IFrejaOrgIdUserInfo"></a>

### freja~IFrejaOrgIdUserInfo : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | Title of the Organisation ID to be displayed to the end user |
| identifierName | <code>string</code> | Display name of specific organisation identifier |
| title | <code>string</code> | Value of specific organisation identifier |
| [ssn] | <code>string</code> | User SSN in international format if exist |
| country | <code>string</code> | User country |
| registrationState | <code>FrejaRegistrationState</code> | The extended error message |

<a name="module_freja..IFrejaUserOrganisationName"></a>

### freja~IFrejaUserOrganisationName : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| EN | <code>string</code> | The name of the organisation in English |
| SV | <code>string</code> | The name of the organisation in Swedish |

<a name="module_freja..IFrejaUserAddress"></a>

### freja~IFrejaUserAddress : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>FrejaUserAddressType</code> | The address type |
| validFrom | <code>string</code> | The date the address is valid from |
| validTo | <code>string</code> | The date the address is valid to |
| address | <code>Array.&lt;string&gt;</code> | The first line of the address |
| postcode | <code>string</code> | The postal code |
| city | <code>string</code> | The city |
| country | <code>string</code> | The country |
| source | <code>FrejaUserAddressSource</code> | The source of the address |

<a name="module_freja..IFrejaUserDocument"></a>

### freja~IFrejaUserDocument : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>FrejaDocumentTypes</code> | The document type |
| country | <code>string</code> | The document country |
| number | <code>string</code> | The document number |
| expiration | <code>string</code> | The document expiration date |

<a name="module_freja..IFrejaUserOrganisation"></a>

### freja~IFrejaUserOrganisation : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | The organisation user ID |
| issuerId | <code>string</code> | The organisation issuer ID |
| issuerCode | <code>string</code> | The organisation issuer code |
| issuerName | <code>IFrejaUserOrganisationName</code> | The organisation issuer name |
| [attributes] | <code>Array.&lt;IFrejaUserOrganisationAttributes&gt;</code> | The organisation attributes |

<a name="module_freja..IFrejaUserAddOrganisation"></a>

### freja~IFrejaUserAddOrganisation : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | Title of the Organisation ID to be displayed to the end user |
| identifierName | <code>string</code> | Display name of specific organisation identifier |
| identifier | <code>string</code> | Value of specific organisation identifier |
| identifierDisplayTypes | <code>Array.&lt;FrejaIdentifierDisplayType&gt;</code> | Displays for the identifier |
| [attributes] | <code>Array.&lt;IFrejaUserOrganisationAttributes&gt;</code> | The organisation attributes |

<a name="module_freja..IFrejaSignNotification"></a>

### freja~IFrejaSignNotification : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The title of the notification |
| message | <code>string</code> | The message of the notification |

<a name="module_freja..IFrejaUserOrganisationAttributes"></a>

### freja~IFrejaUserOrganisationAttributes : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The attribute key |
| value | <code>string</code> | The attribute value |
| displayText | <code>string</code> | The attribute display text |

<a name="module_freja..IFrejaUserDetails"></a>

### freja~IFrejaUserDetails : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
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

<a name="module_freja..IFrejaServiceData"></a>

### freja~IFrejaServiceData : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| freja.userInfo | <code>IUserInfo</code> | The user information object |
| [freja.relyingPartyUserId] | <code>string</code> | The relying party user ID |
| [freja.registrationLevel] | <code>FrejaRegistrationLevel</code> | The registration level |
| [freja.customIdentifier] | <code>string</code> | The custom identifier |

<a name="module_freja..IFrejaUserContact"></a>

### freja~IFrejaUserContact : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [emailAddress] | <code>string</code> | The user's primary email address |
| [phoneNumber] | <code>string</code> | The user's primary (first) phone number |
| [postalAddress] | <code>IFrejaUserAddress</code> | The user's current postal address |
| [residentialAddress] | <code>IFrejaUserAddress</code> | The user's current residential address |
| [allEmailAddresses] | <code>Array.&lt;string&gt;</code> | The user's other email addresses |
| [allPhoneNumbers] | <code>Array.&lt;string&gt;</code> | The user's other phone numbers |
| [allAddresses] | <code>Array.&lt;IFrejaUserAddress&gt;</code> | The user's addresses |

<a name="module_freja..IFrejaResponse"></a>

### freja~IFrejaResponse : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| info | <code>IFrejaUserInfo</code> | The user information object |
| freja | <code>IFrejaServiceData</code> | The Freja object |
| [document] | <code>IFrejaUserDocument</code> | The document object |
| [organisation] | <code>IFrejaUserOrganisation</code> | The organisation object |
| contact | <code>IFrejaUserContact</code> | The contacts object |
| [signature] | <code>IFrejaSignatureData</code> | The signature data |

<a name="module_freja..IFrejaSignatureData"></a>

### freja~IFrejaSignatureData : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Freja  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>FrejaSignatureType</code> | The signature type |
| timestamp | <code>Date</code> | The date of the signature |
| payload | <code>String</code> | The signed data |
| transactionId | <code>String</code> | The id of the signing transaction from Freja |
| ocspResponse | <code>Buffer</code> | The OCSP response at time of signing |
| signature | <code>String</code> | The signature |
| kid | <code>String</code> | The signature key ID |
| alg | <code>String</code> | The signature algorithm |
| [advanced] | <code>Object</code> | The advanced signature |

<a name="module_freja..IResultMessage"></a>

### freja~IResultMessage : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: Responses  
**Properties**

| Name | Type |
| --- | --- |
| isOk | <code>boolean</code> | 

<a name="module_freja..IFrejaOrgIdUserList"></a>

### freja~IFrejaOrgIdUserList : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IResultMessage</code>  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> |  |
| users | <code>Array.&lt;IFrejaOrgIdUserInfo&gt;</code> | The organisation information |

<a name="module_freja..ISuccessResultMessage"></a>

### freja~ISuccessResultMessage : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IResultMessage</code>  
**Category**: Responses  
**Properties**

| Name | Type |
| --- | --- |
| isOk | <code>boolean</code> | 
| data | <code>any</code> | 

<a name="module_freja..IUpdateSuccessMessage"></a>

### freja~IUpdateSuccessMessage : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IResultMessage</code>  
**Category**: Responses  
**Properties**

| Name | Type |
| --- | --- |
| isOk | <code>boolean</code> | 
| added | <code>number</code> | 
| updated | <code>number</code> | 
| deleted | <code>number</code> | 

<a name="module_freja..IFailureResult"></a>

### freja~IFailureResult : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IResultMessage</code>  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be false |
| code | <code>number</code> | The error code |
| message | <code>string</code> | The error message |
| [extendedMessage] | <code>string</code> | The extended error message |
| [trace] | <code>string</code> | The error trace |

<a name="module_freja..IInitializationSuccess"></a>

### freja~IInitializationSuccess : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IResultMessage</code>  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be true |
| token | <code>string</code> | The transaction token |
| qrCodeUrl | <code>function</code> | The URL to the QR code |
| autostartUrl | <code>function</code> | The URL to the autostart |

<a name="module_freja..IRequestStatusMessage"></a>

### freja~IRequestStatusMessage : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IResultMessage</code>  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be true |
| status | <code>FrejaRequestStatus</code> | The transaction status |
| isFinal | <code>boolean</code> | If the transaction is completed or should be checked again |

<a name="module_freja..ICompletedRequestMessage"></a>

### freja~ICompletedRequestMessage : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IRequestStatusMessage</code>  
**Category**: Responses  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| isOk | <code>boolean</code> | Must be true |
| status | <code>FrejaRequestStatus</code> | The transaction status |
| data | <code>IFrejaResponse</code> | The results of the request |
| isFinal | <code>boolean</code> | Always true |

<a name="module_freja..UserInfoType"></a>

### freja~UserInfoType : <code>enum</code>
**Kind**: inner enum of [<code>freja</code>](#module_freja)  
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

<a name="module_freja..ISocialSecurityNumber"></a>

### freja~ISocialSecurityNumber : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| country | <code>string</code> | The country code |
| ssn | <code>string</code> | The social security number |

<a name="module_freja..IUserInfo"></a>

### freja~IUserInfo : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | <code>FrejaUserInfoType</code> | The type of user information |
| userInfo | <code>string</code> \| <code>ISocialSecurityNumber</code> | The user information |

<a name="module_freja..IEmailUserInfo"></a>

### freja~IEmailUserInfo : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IUserInfo</code>  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | <code>FrejaUserInfoType</code> | Must be "EMAIL" |
| userInfo | <code>string</code> | The email address |

<a name="module_freja..ISSNUserInfo"></a>

### freja~ISSNUserInfo : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IUserInfo</code>  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | <code>FrejaUserInfoType</code> | Must be "EMAIL" |
| userInfo | <code>ISocialSecurityNumber</code> | The social security number |

<a name="module_freja..IInferredUserInfo"></a>

### freja~IInferredUserInfo : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IUserInfo</code>  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | <code>FrejaUserInfoType</code> | Must be "INFERRRED" |
| userInfo | <code>string</code> | Must be "N/A" |

<a name="module_freja..IPhoneUserInfo"></a>

### freja~IPhoneUserInfo : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IUserInfo</code>  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | <code>FrejaUserInfoType</code> | Must be "PHONE" |
| userInfo | <code>string</code> | The email address |

<a name="module_freja..IOrgIdUserInfo"></a>

### freja~IOrgIdUserInfo : <code>Object</code>
**Kind**: inner typedef of [<code>freja</code>](#module_freja)  
**Extends**: <code>IUserInfo</code>  
**Category**: UserInfo  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userInfoType | <code>FrejaUserInfoType</code> | Must be "ORGID" |
| userInfo | <code>string</code> | The email address |

