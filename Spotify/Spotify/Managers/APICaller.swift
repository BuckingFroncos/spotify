//
//  APICaller.swift
//  Spotify
//
//  Created by Nhi Nguyen on 5/6/22.
//

import Foundation

final class APICaller {
    static let shared = APICaller()
    private init(){}
    
//    public func getCurrentUserAlbums(completion: @escaping (Result<UserProfile, Error>) -> Void) {
//        createRequest(
//            with: URL(string: Constants.baseAPIURL + "/me/albums"),
//            type: .GET
//        ) { request in
//            let task = URLSession.shared.dataTask(with: request) { data, _, error in
//                guard let data = data, error == nil else {
//                    completion(.failure(APIError.faileedToGetData))
//                    return
//                }
//
//                do {
//                    let result = try JSONDecoder().decode(LibraryAlbumsResponse.self, from: data)
//                    completion(.success(result.items.compactMap({ $0.album })))
//                }
//                catch {
//                    completion(.failure(error))
//                }
//            }
//            task.resume()
//        }
//    }
}
