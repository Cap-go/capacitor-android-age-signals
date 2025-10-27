package app.capgo.androidagesignals.classes;

public final class CustomExceptions {
    private CustomExceptions() {}

    public static final CustomException API_NOT_AVAILABLE = new CustomException(
        "API_NOT_AVAILABLE",
        "The Play Age Signals API is not available. The installed Play Store might be outdated."
    );
    public static final CustomException PLAY_STORE_NOT_FOUND = new CustomException(
        "PLAY_STORE_NOT_FOUND",
        "Google Play Store is not installed on this device."
    );
    public static final CustomException NETWORK_ERROR = new CustomException("NETWORK_ERROR", "No available network connection.");
    public static final CustomException PLAY_SERVICES_NOT_FOUND = new CustomException(
        "PLAY_SERVICES_NOT_FOUND",
        "Google Play services is missing or out of date."
    );
    public static final CustomException CANNOT_BIND_TO_SERVICE = new CustomException(
        "CANNOT_BIND_TO_SERVICE",
        "Failed to bind to the Google Play service. The Play Store may be outdated or resources are low."
    );
    public static final CustomException PLAY_STORE_VERSION_OUTDATED = new CustomException(
        "PLAY_STORE_VERSION_OUTDATED",
        "Update Google Play Store to continue."
    );
    public static final CustomException PLAY_SERVICES_VERSION_OUTDATED = new CustomException(
        "PLAY_SERVICES_VERSION_OUTDATED",
        "Update Google Play services to continue."
    );
    public static final CustomException CLIENT_TRANSIENT_ERROR = new CustomException(
        "CLIENT_TRANSIENT_ERROR",
        "A transient error occurred on the device. Retry the request."
    );
    public static final CustomException APP_NOT_OWNED = new CustomException(
        "APP_NOT_OWNED",
        "The app was not installed from Google Play."
    );
    public static final CustomException INTERNAL_ERROR = new CustomException(
        "INTERNAL_ERROR",
        "An unknown internal error occurred."
    );
}
