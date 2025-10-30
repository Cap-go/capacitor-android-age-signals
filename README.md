# @capgo/capacitor-android-age-signals
<a href="https://capgo.app/"><img src="https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png" alt="Capgo - Instant updates for Capacitor"/></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_android_age_signals">➡️ Ship Instant Updates with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_android_age_signals">Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>

Capacitor wrapper for the Google Play Age Signals API. Detect supervised accounts, guardian approvals, and verified users directly from your app (Android only).

## Documentation

Authoritative docs live inside this repo for now. Explore the TypeScript definitions in `src/definitions.ts` and the Android implementation under `android/` for platform behavior. Run the included example app for an end-to-end walkthrough.

## Install

```bash
npm install @capgo/capacitor-android-age-signals
npx cap sync android
```

Google Play Age Signals is available only on Android phones with the Play Store installed.

## Usage

```ts
import { AgeSignals } from '@capgo/capacitor-android-age-signals';
import { UserStatus } from '@capgo/capacitor-android-age-signals';

const result = await AgeSignals.checkAgeSignals();

if (result.userStatus === UserStatus.Supervised) {
  console.info(`Supervised user aged between ${result.ageLower} and ${result.ageUpper}`);
} else if (result.userStatus === UserStatus.Verified) {
  console.info('User is 18+ and verified by Google.');
} else {
  console.warn('No definitive age signal returned.');
}
```

## API

<docgen-index>

* [`checkAgeSignals()`](#checkagesignals)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor interface for retrieving Play Age Signals.

### checkAgeSignals()

```typescript
checkAgeSignals() => Promise<CheckAgeSignalsResult>
```

Request the current Play Age Signals for the active user.

Only available on Android devices with Google Play installed.

**Returns:** <code>Promise&lt;<a href="#checkagesignalsresult">CheckAgeSignalsResult</a>&gt;</code>

**Since:** 0.0.1

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<{ version: string; }>
```

Get the native Capacitor plugin version.

**Returns:** <code>Promise&lt;{ version: string; }&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### CheckAgeSignalsResult

Structured result returned by {@link AgeSignalsPlugin.checkAgeSignals}.

| Prop                         | Type                                              | Description                                                                                                                                                                                                              | Since |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`userStatus`**             | <code><a href="#userstatus">UserStatus</a></code> | The user's verification status as reported by Google Play.                                                                                                                                                               | 0.0.1 |
| **`ageLower`**               | <code>number</code>                               | Inclusive lower bound of the supervised user's age range. Present only when `userStatus` is `SUPERVISED`, `SUPERVISED_APPROVAL_PENDING`, or `SUPERVISED_APPROVAL_DENIED`.                                                | 0.0.1 |
| **`ageUpper`**               | <code>number</code>                               | Inclusive upper bound of the supervised user's age range. Present only when `userStatus` is `SUPERVISED`, `SUPERVISED_APPROVAL_PENDING`, or `SUPERVISED_APPROVAL_DENIED` and the user's age is reported as less than 18. | 0.0.1 |
| **`mostRecentApprovalDate`** | <code>string</code>                               | Effective date for the most recent significant change that received guardian approval. Present only when `userStatus` is `SUPERVISED_APPROVAL_PENDING` or `SUPERVISED_APPROVAL_DENIED`.                                  | 0.0.1 |
| **`installId`**              | <code>string</code>                               | Identifier assigned to supervised installs in Google Play for revocation notifications. Present only when `userStatus` is `SUPERVISED`, `SUPERVISED_APPROVAL_PENDING`, or `SUPERVISED_APPROVAL_DENIED`.                  | 0.0.1 |


### Enums


#### UserStatus

| Members                         | Value                                      | Description                                                                                                                                                                                                               | Since |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`Verified`**                  | <code>'VERIFIED'</code>                    | The user is over 18 and their age has been verified by Google.                                                                                                                                                            | 0.0.1 |
| **`Supervised`**                | <code>'SUPERVISED'</code>                  | The user has a supervised Google Account managed by a guardian. Use `ageLower` and `ageUpper` to determine the user's age range.                                                                                          | 0.0.1 |
| **`SupervisedApprovalPending`** | <code>'SUPERVISED_APPROVAL_PENDING'</code> | The supervised user has pending significant changes awaiting guardian approval. Use `ageLower` and `ageUpper` to determine the user's age range and `mostRecentApprovalDate` to identify the most recent approved change. | 0.0.1 |
| **`SupervisedApprovalDenied`**  | <code>'SUPERVISED_APPROVAL_DENIED'</code>  | The supervised user's guardian denied one or more significant changes. Use `ageLower` and `ageUpper` to determine the user's age range and `mostRecentApprovalDate` to identify the last approved change.                 | 0.0.1 |
| **`Unknown`**                   | <code>'UNKNOWN'</code>                     | The user is not verified or supervised in supported regions. You should prompt the user to resolve their status in the Play Store.                                                                                        | 0.0.1 |
| **`Empty`**                     | <code>'EMPTY'</code>                       | All other users return this value.                                                                                                                                                                                        | 0.0.1 |

</docgen-api>
