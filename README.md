<div align="center">
  <a href="https://github.com/dsorlov/jsfreja/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/dsorlov/jsfreja/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  · <a href="https://github.com/dsorlov/jsfreja/discussions">Ask a Question</a>
</div>

<div align="center">
<br />

[![Project license](https://img.shields.io/github/license/dsorlov/jsfreja.svg?style=flat-square)](LICENSE) [![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/dsorlov/jsfreja/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) [![code with love by dsorlov](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-dsorlov-ff1414.svg?style=flat-square)](https://github.com/dsorlov)

</div>


# freja 

## About

This project is created as a simple way of interacting with the [Freja REST API](https://frejaeid.atlassian.net/wiki/spaces/DOC/overview) from [Node.js](https://nodejs.org/en). The problem is not that the REST API is hard to use in it self but rather to make a friendlier way to inteact interact and integrate. The **jsfreja** module commes with typings, jsdoc typings, and practical shortcut functions to common functions and actions. You do not have to encode or decode, veryify and keep track of what URIs are used for what. The module does that for you. Kind of like magic.

This module can interact with most parts of Freja.

* Authentication Service
* Signature Service 
* Organisation ID Service
* Custom Identifiers
* Custodianship Service

The module is created after many years as a part of my [eid](http://github.com/dsorlov/eid-provider) moddule, and as many parts of that module were less and less used and the code getting old I decided to branch of into this for just the Freja parts and also raise the bar with more documentation and typings etc. In due time [eid](http://github.com/dsorlov/eid-provider) will probably be archived.

## Getting Started

The module is built as an ES6/CommonJS module. The only external dependency except node itself is [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken). It should be usable on many different enviroments such as Bun but we do not test for that for now.

### Prerequisites

**TL;DR There really is no must-do to get started in the testing enviroment.**

To get started you can [obtain your own testing certifiate](https://frejaeid.atlassian.net/wiki/spaces/DOC/pages/34668551/Obtaining+a+Client+TLS+Certificate) from Freja but we have also by special arrangement with Freja included one for you already which you may use for testing (it will not work in production). Before going to production you will need a [production certificate](https://frejaeid.atlassian.net/wiki/spaces/DOC/pages/34701317/Registering+Your+Service+with+Freja) from Freja to start up your services, which you will get after signing a contract.

### Installation

```console
npm install @dsorlov/jsfreja
```

### Documentation

This page should give you most hints and the knowledge needed to use the module.
There is also some [documentation](/docs/jsdoc) to help you get insights to the objects and more.

### Introduction

The basic and most used function is `initRequest()` method however there is some shortcut methods defined such as `initAuth()`, `initSign()`, `initSignBuffer()` and `initAddOrganisationId()` which all have some good default values set so you dont need to send the arguments to `initRequest()`.

This is a breif example of an authentication request. The following code is initializing the library with a specified pfx and password. Relative paths are ok. Then we set the minimum requested level using [FrejaAPI.RegistrationLevel](FrejaAPI#registrationlevel--enum) for the authentication and which attributes to return. Either the [FrejaAPI.UserAttributeCollections](FrejaAPI#userattributecollections--enum) or the [FrejaAPI.UserAttributes](FrejaAPI#userattributes--enum) can be used to assist in getting the right value.

```javascript
import { APIMode, FrejaAPI, RegistrationLevel, UserAttributeCollections } from '@dsorlov/jsfreja';

const frejaApi = new FrejaAPI(APIMode.TEST,'<path-to-your-pfx>','<pfx-password>');
frejaApi.RegistrationLevel = RegistrationLevel.PLUS;
frejaApi.UserAttributes = UserAttributeCollections.ALL_EXTENDED;
```

Next let us execute the request. The following code with get us a code to use with a QR-reader or in a mobile app. You can also supply arguments to the initAuthRequest to make sure a specific user is targeted.

```javascript
let result = await frejaApi.InitAuthRequest();
```

All operations we execute returns objects of the [IResultMessage](FrejaAPI#iresultmessage--object) or one of its derrative classes. They all have a `isOk` property (boolean). `isOk` means the operation was successfull.

Next we define a function to check status in the test script. This function will be called every 2.5s as suggested by Freja. We check the response and if its property `isFinal` (boolean) is true: we have got a final result. Otherwise we just continue pulling here. Also a good expansion of this code could be to also handle fault stats where the `isOk` flag is false.

```javascript
let checkResult = await frejaApi.InquireRequest(result.token)
```

Errors will have the `isOk` set to false and `code` field set to something in the [FrejaAPI.FrejaAPIErrors](FrejaAPI#frejaapierrors--enum) collection which can help you troubleshoot.

When an authentication request finishes you will get a [ICompletedRequestMessage](FrejaAPI#icompletedrequestmessage--object) where the `data` property will be a [IFrejaUserInfo](FrejaAPI#ifrejauserinfo--object) where you will find your requested attributes for the user.

### Autentication Example

So putting the above together into an simple example for an authentication client.
This will initiate an authentication request, and poll untill we got a result.

```javascript
// @ts-check
import { APIMode, FrejaAPI, RegistrationLevel, UserAttributeCollections } from '@dsorlov/jsfreja';

//Setup some API testing stuff
const frejaApi = new FrejaAPI(APIMode.PRODUCTION,'<path-to-pfxfile>','<pfxfile-password>');
frejaApi.RegistrationLevel = RegistrationLevel.PLUS;
frejaApi.UserAttributes = UserAttributeCollections.ALL_EXTENDED;

// Initiate an authentication request
var result = await frejaApi.InitAuthRequest('<identifier>');

// Check if the request was successful
if (result.isOk) {
    console.log(`Token: ${result.token}`);
} else {
    console.error(result);
    process.exit(1);
}

async function checkStatus() {

    //Get current status of the request
    var checkResult = await frejaApi.InquireRequest(result.token);
    
    //The status is not final yet?
    if (checkResult.isOk && !checkResult.isFinal) {
        setTimeout(checkStatus, 2500);
        console.log('Not final yet: ' + checkResult.status);
    } else {
        console.log('Final status: ' + checkResult.status);
        console.log(checkResult);
    }
}

//Check status every 2.5 seconds
setTimeout(checkStatus, 2500);
```

### Signing Example 1 (Simple)

The only difference when doing a sign request is basically that you also need to send text and title of the signing. The initSign expects a identifier (because normally you would like to have a specific person sign and not just the first to scan), it could be set to `nothing` if needed.

```javascript
var result = await frejaApi.InitSignRequest('<identifier>','title to sign','text to sign');
```

### Signing Example 2 (Buffer and OrgId)

You can also send a hidden piece of information with as proof of the signing. This is done via a Buffer containing the data you need signed. Also in this example we are using the OrgId service (last argument), if you dont need that just remove that parameter.

```javascript
var result = await frejaApi.InitSignBufferRequest('<identifier>','title to sign','text to sign', <data-in-a-buffer>, true);
```

### Adding OrgId 

To issue an OrgId you must send a request for the person to accept the id. To start such a process you can use the 

```javascript
var result = await frejaApi.AddOrgIdRequest('<identifier>','<org-name>','<attribute-name>','<attribute-value>');
```

### All methods

The fundamental methods are

```javascript
frejaApi.InitRequest(<requestType:RequestType>, <userInfo:IUserInfo|string|undefined>, <additionalParams:Object>);
frejaApi.CancelRequest(<token:string>);
frejaApi.InquireRequest(<token:string>);
```

Shortcut methods to make life easier are most commonly used

```javascript
frejaApi.InitAuthRequest(<userInfo:IUserInfo|string|undefined>)
frejaApi.InitSignRequest(<userInfo:IUserInfo|string|undefined>,<title:string>,<text:string>);
frejaApi.InitSignBufferRequest(<userInfo:IUserInfo|string|undefined>,<title:string>,<text:string>, <data:Buffer>);
frejaApi.AddOrgIdRequest(<userInfo:IUserInfo|string>,<org-name:string>,<attribute-name:string>,<attribute-value:string>);
```

Not so commonly used functions

```javascript
frejaApi.CheckCustodianship(<swedishSSN:string>);
frejaApi.NewCustomIdentifier(<customIdentifier:string>,<userInfo:IUserInfo|string>);
frejaApi.DeleteCustomIdentifier(<customIdentifier:string>);
```

### additionalParams 

The additionalParams object is used when doing advanced Requests directly via `InitRequest()` Depending on the type of requests theese can be combined in different ways and a good amount of local validation is done before trying the request.

The most common are (for all types of requests)

* `userInfo` **{[IUserInfo](/FrejaAPI#iuserinfo--object)}** the user info object (see all inherited IUserInfo types in doc)
* `userInfoType` **{[UserInfoType](/FrejaAPI#userinfotype--enum)}** the user info object type
* `attributesToReturn` **{Array<[UserAttributes](/FrejaAPI#userattributes--enum)>}** to return if successfull.
* `userConfirmationMethod` **{[ConfirmationMethod](/FrejaAPI#confirmationmethod--enum)}** to use for the request.
* `minRegistrationLevel` **{[RegistrationLevel](/FrejaAPI#registrationlevel--enum)}** the minimum level to use for the request.

For requests of signing (both standard and orgid signing)

* `waitDays` **{Number}** how long the transaction should live. 1-30 days (default is 1 day)
* `text` **{String}** The message presented when signing
* `signatureType` **{[SignatureType](/FrejaAPI#signaturetype--enum)}** for the signature you wish in the response
* `binaryData` **{Buffer}** a buffer with any data to include in the signature
* `notification` **{[IFrejaSignNotification](/FrejaAPI#ifrejasignnotification--object)}** describing the user device notification

For adding a orgId (only when adding a new orgid)
* `waitDays` **{Number}** how long the transaction should live. 1-30 days (default is 1 day)
* `orgId` **{[IFrejaUserAddOrganisation](/FrejaAPI#ifrejauseraddorganisation--object)}** describing the orgId

## Roadmap

See the [open issues](https://github.com/dsorlov/jsfreja/issues) for a list of proposed features (and known issues).

- [Top Feature Requests](https://github.com/dsorlov/jsfreja/issues?q=label%3Aenhancement+is%3Aopen+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Top Bugs](https://github.com/dsorlov/jsfreja/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Newest Bugs](https://github.com/dsorlov/jsfreja/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

## Support

Reach out to the maintainer at one of the following places:

- [GitHub Discussions](https://github.com/dsorlov/jsfreja/discussions)
- Contact options listed on [this GitHub profile](https://github.com/dsorlov)

## Project assistance

If you want to say **thank you** or/and support active development of freja:

- Add a [GitHub Star](https://github.com/dsorlov/jsfreja) to the project.
- Tweet about freja.
- Write interesting articles about the project on [Dev.to](https://dev.to/), [Medium](https://medium.com/) or your personal blog.

Together, we can make freja **better**!

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Authors & contributors

The original setup of this repository is by [Daniel Sörlöv](https://github.com/dsorlov).

For a full list of all authors and contributors, see [the contributors page](https://github.com/dsorlov/jsfreja/contributors).

## Security

jsfreja follows good practices of security, but 100% security cannot be assured.
jsfreja is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](docs/SECURITY.md)._

## License

This project is licensed under the **MIT license**.

See [LICENSE](LICENSE) for more information.

## Acknowledgements

Huge thanks to [Freja eID Group](https://frejaeid.com/) and specifically [@vetobus](https://github.com/vetobus/) for providing me with access to senior technical staff and accepting my suggestions for improvements and beeing so open to the developer community in general.

Also thanks to [auth0](https://github.com/auth0) for the excellently stable [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) module used to authenticate the data.