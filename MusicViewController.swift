//
//  ViewController.swift
//  Music
//
//  Created by Nhi Nguyen.
//

import UIKit
import Foundation

class MusicViewController: UIViewController {
    
    @IBOutlet weak var tableView: UITableView!
    
    
    // create an array of dictionary to store the fetched songs
    var music = [[String: Any]]()

    override func viewDidLoad() {
        super.viewDidLoad()
//        // TODO: Network request
//        let url = URL(string: "https://api....)!
//        let request = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 10)
//        let session = URLSession(configuration: .default, delegate: nil, delegateQueue: OperationQueue.main)
//        let task = session.dataTask(with: request) { (data, response, error) in
//             // This will run when the network request returns
//             if let error = error {
//                    print(error.localizedDescription)
//             } else if let data = data {
//                    let dataDictionary = try! JSONSerialization.jsonObject(with: data, options: []) as! [String: Any]
//
//                    // TODO: Get the array of music
//                    // TODO: Store the music in a property to use elsewhere
//                    // TODO: Reload your table view data
//
//             }
//        }
//        task.resume()
    }


}

