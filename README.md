# Angular.js ajax calls status management
This is a super light ```Angular.js``` library without any external dependencies for managing and controlling ajax calls, specially for showing and hiding any kind of indication during a specifc call to and from the server.
Installation
-
### Bower
```javascript
bower install angular-ajax-indicator --save
```
```javascript
angular.module('myApp', ['ajax.indicator']);
```
Getting Started
-
### General idea
The library adds an **`HttpInterceptor`** for catching any ajax call that has been created with **`config.loadingIndicatorId`** property.e

When this property exists, all its registered **`indicators`** will be notified when the ajax call sent to the server, and on the call's response.

### Preparing your ajax calls
Adding **`config.loadingIndicatorId`** to the ajax call is simple as:
```javascript
$http.get([URL], {loadingIndicatorId: "[indicatorId string]"})
```
For example:
```javascript
$http.get("http://www.rest.com/v1/users, {loadingIndicatorId: "GET_ALL_USERS"})
```
The **`HttpInterceptor`** will catch this specific ajax call and will notify everyone every time this call sent to server and this call's response.

### Subscribe and Unsubscribe for notification
Except of the **`HttpInterceptor`**, this library also comes with a **`loadingIndicatorsService`** which can be injected everywhere you would like.

Subscribing for a specific `indicatorId` notifications from the **`HttpInterceptor`** is simple as:
```javascript
loadingIndicatorsService.subscribe([IndicatorId], [RequestNotificationCB], [ResponsetNotificationCB]);
```
Where:
* `[IndicatorId]` - a **uniqe** string representing a specific ajax call
* `[RequestNotificationCB]` - will be called when this ajax call sent to server
* `[ResponsetNotificationCB]` - will be called when on ajax call response
* `subscribe return value` - a **uniqe** id for the subscription, **IMPORTANT** - two subscriptions for the same `indicatorId` will return **different** id
For example:
```javascript
var uuid = loadingIndicatorsService.subscribe($scope.indicatorId, notifyOnRequest, notifyOnResponse);
```

Saving this ```uuid``` is important when subscribing from within directives, since these directives could also be destroyed and you don't want them to get any notifications:
```javascript
loadingIndicatorsService.unsubscribe($scope.indicatorId, uuid);
```
