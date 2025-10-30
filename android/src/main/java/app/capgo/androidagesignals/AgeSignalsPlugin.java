package app.capgo.androidagesignals;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import app.capgo.androidagesignals.classes.results.CheckAgeSignalsResult;
import app.capgo.androidagesignals.interfaces.NonEmptyResultCallback;
import app.capgo.androidagesignals.interfaces.Result;
import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AgeSignals")
public class AgeSignalsPlugin extends Plugin {

    private final String pluginVersion = "7.0.0";
    public static final String TAG = "AgeSignals";
    private static final String ERROR_UNKNOWN = "An unknown error occurred.";

    private AgeSignals implementation;

    @Override
    public void load() {
        implementation = new AgeSignals(this);
    }

    @PluginMethod
    public void checkAgeSignals(@NonNull PluginCall call) {
        try {
            NonEmptyResultCallback<CheckAgeSignalsResult> callback = new NonEmptyResultCallback<>() {
                @Override
                public void success(@NonNull CheckAgeSignalsResult result) {
                    resolveCall(call, result);
                }

                @Override
                public void error(@NonNull Exception exception) {
                    rejectCall(call, exception);
                }
            };

            if (implementation == null) {
                rejectCall(call, new Exception("Plugin not initialized."));
                return;
            }

            implementation.checkAgeSignals(callback);
        } catch (Exception exception) {
            rejectCall(call, exception);
        }
    }

    private void rejectCall(@NonNull PluginCall call, @NonNull Exception exception) {
        String message = exception.getMessage();
        if (message == null || message.isEmpty()) {
            message = ERROR_UNKNOWN;
        }
        Logger.error(TAG, message, exception);

        if (exception instanceof app.capgo.androidagesignals.classes.CustomException) {
            JSObject error = new JSObject();
            app.capgo.androidagesignals.classes.CustomException customException =
                (app.capgo.androidagesignals.classes.CustomException) exception;
            error.put("code", customException.getCode());
            error.put("message", message);
            call.reject(message, customException.getCode(), error);
        } else {
            call.reject(message);
        }
    }

    private void resolveCall(@NonNull PluginCall call, @Nullable Result result) {
        if (result == null) {
            call.resolve();
        } else {
            call.resolve(result.toJSObject());
        }
    }

    @PluginMethod
    public void getPluginVersion(final PluginCall call) {
        try {
            final JSObject ret = new JSObject();
            ret.put("version", this.pluginVersion);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Could not get plugin version", e);
        }
    }
}
