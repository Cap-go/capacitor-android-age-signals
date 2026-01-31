import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(AgeSignalsPlugin)
public class AgeSignalsPlugin: CAPPlugin, CAPBridgedPlugin {
    private let pluginVersion: String = "8.1.8"
    public let identifier = "AgeSignalsPlugin"
    public let jsName = "AgeSignals"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "checkAgeSignals", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    @objc func checkAgeSignals(_ call: CAPPluginCall) {
        call.reject("Age signals are not available on iOS. This functionality is only supported on Android devices with Google Play installed.")
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve(["version": self.pluginVersion])
    }

}
