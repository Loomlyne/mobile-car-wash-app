import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Create the main window
        window = UIWindow(frame: UIScreen.main.bounds)
        
        // Create the main view controller
        let mainViewController = MainViewController()
        let navigationController = UINavigationController(rootViewController: mainViewController)
        
        // Set the root view controller
        window?.rootViewController = navigationController
        window?.makeKeyAndVisible()
        
        return true
    }
}