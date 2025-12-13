import XCTest
@testable import AgeSignalsPlugin

class AgeSignalsPluginTests: XCTestCase {
    func testPluginVersion() {
        // Basic test to ensure the plugin loads
        let plugin = AgeSignalsPlugin()
        XCTAssertNotNil(plugin)
    }
}
