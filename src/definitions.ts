import type { PermissionState } from '@capacitor/core';

/**
 * Capacitor interface for retrieving Play Age Signals.
 *
 * @since 0.0.1
 */
export interface AgeSignalsPlugin {
  /**
   * Request the current Play Age Signals for the active user.
   *
   * Only available on Android devices with Google Play installed.
   *
   * @since 0.0.1
   */
  checkAgeSignals(): Promise<CheckAgeSignalsResult>;
}

/**
 * Structured result returned by {@link AgeSignalsPlugin.checkAgeSignals}.
 *
 * @since 0.0.1
 */
export interface CheckAgeSignalsResult {
  /**
   * The user's verification status as reported by Google Play.
   *
   * @since 0.0.1
   */
  userStatus: UserStatus;
  /**
   * Inclusive lower bound of the supervised user's age range.
   *
   * Present only when `userStatus` is `SUPERVISED`, `SUPERVISED_APPROVAL_PENDING`, or `SUPERVISED_APPROVAL_DENIED`.
   *
   * @since 0.0.1
   * @example 13
   */
  ageLower?: number;
  /**
   * Inclusive upper bound of the supervised user's age range.
   *
   * Present only when `userStatus` is `SUPERVISED`, `SUPERVISED_APPROVAL_PENDING`, or `SUPERVISED_APPROVAL_DENIED`
   * and the user's age is reported as less than 18.
   *
   * @since 0.0.1
   * @example 15
   */
  ageUpper?: number;
  /**
   * Effective date for the most recent significant change that received guardian approval.
   *
   * Present only when `userStatus` is `SUPERVISED_APPROVAL_PENDING` or `SUPERVISED_APPROVAL_DENIED`.
   *
   * @since 0.0.1
   * @example "2024-01-15"
   */
  mostRecentApprovalDate?: string;
  /**
   * Identifier assigned to supervised installs in Google Play for revocation notifications.
   *
   * Present only when `userStatus` is `SUPERVISED`, `SUPERVISED_APPROVAL_PENDING`, or `SUPERVISED_APPROVAL_DENIED`.
   *
   * @since 0.0.1
   * @example "abc123xyz"
   */
  installId?: string;
}

/**
 * Status values reported by Google Play Age Signals.
 *
 * @since 0.0.1
 */
export enum UserStatus {
  /**
   * The user is over 18 and their age has been verified by Google.
   *
   * @since 0.0.1
   */
  Verified = 'VERIFIED',
  /**
   * The user has a supervised Google Account managed by a guardian.
   *
   * Use `ageLower` and `ageUpper` to determine the user's age range.
   *
   * @since 0.0.1
   */
  Supervised = 'SUPERVISED',
  /**
   * The supervised user has pending significant changes awaiting guardian approval.
   *
   * Use `ageLower` and `ageUpper` to determine the user's age range and `mostRecentApprovalDate`
   * to identify the most recent approved change.
   *
   * @since 0.0.1
   */
  SupervisedApprovalPending = 'SUPERVISED_APPROVAL_PENDING',
  /**
   * The supervised user's guardian denied one or more significant changes.
   *
   * Use `ageLower` and `ageUpper` to determine the user's age range and `mostRecentApprovalDate`
   * to identify the last approved change.
   *
   * @since 0.0.1
   */
  SupervisedApprovalDenied = 'SUPERVISED_APPROVAL_DENIED',
  /**
   * The user is not verified or supervised in supported regions.
   *
   * You should prompt the user to resolve their status in the Play Store.
   *
   * @since 0.0.1
   */
  Unknown = 'UNKNOWN',
  /**
   * All other users return this value.
   *
   * @since 0.0.1
   */
  Empty = 'EMPTY',
}

/**
 * Error codes representing failures returned by the Play Age Signals API.
 *
 * @since 0.0.1
 */
export enum ErrorCode {
  /**
   * The Play Age Signals API is not available. The installed Play Store version might be outdated.
   *
   * @since 0.0.1
   */
  ApiNotAvailable = 'API_NOT_AVAILABLE',
  /**
   * No Play Store app was found on the device.
   *
   * @since 0.0.1
   */
  PlayStoreNotFound = 'PLAY_STORE_NOT_FOUND',
  /**
   * No network connection is currently available.
   *
   * @since 0.0.1
   */
  NetworkError = 'NETWORK_ERROR',
  /**
   * Google Play services is missing or too old.
   *
   * @since 0.0.1
   */
  PlayServicesNotFound = 'PLAY_SERVICES_NOT_FOUND',
  /**
   * The Play Store service binding failed.
   *
   * @since 0.0.1
   */
  CannotBindToService = 'CANNOT_BIND_TO_SERVICE',
  /**
   * The Play Store application needs to be updated.
   *
   * @since 0.0.1
   */
  PlayStoreVersionOutdated = 'PLAY_STORE_VERSION_OUTDATED',
  /**
   * Google Play services needs to be updated.
   *
   * @since 0.0.1
   */
  PlayServicesVersionOutdated = 'PLAY_SERVICES_VERSION_OUTDATED',
  /**
   * A transient error occurred on the client device.
   *
   * @since 0.0.1
   */
  ClientTransientError = 'CLIENT_TRANSIENT_ERROR',
  /**
   * The app was not installed through Google Play.
   *
   * @since 0.0.1
   */
  AppNotOwned = 'APP_NOT_OWNED',
  /**
   * An unknown internal error occurred.
   *
   * @since 0.0.1
   */
  InternalError = 'INTERNAL_ERROR',
}

/**
 * @deprecated Permissions are not required for this plugin.
 *
 * @since 0.0.1
 */
export type AgeSignalsPermissionState = PermissionState;
