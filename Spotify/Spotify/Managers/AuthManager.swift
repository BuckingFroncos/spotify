//
//  AuthManager.swift
//  Spotify
//
//  Created by Nhi Nguyen 

import Foundation

final class AuthManager {
    
    static let shared = AuthManager()
    
    struct Constants {
        static let clientID = "99a370ff3ffe4ac7a516cf3bbe8982e7"
        static let clientSecret = "79a68c935a574698b3f43f7e0aae8907"
    }
    
    private init(){
        
    }
    
    public var signInURL: URL?{
        let base = "https://accounts.spotify.com/authorize"
        let scopes = "user-read-private"
        let redirectURI = "https://www.codepath.org"
        let string = "\(base)?response_type=code&client_id=\(Constants.clientID)&scope=\(scopes)&redirect_uri=\(redirectURI)&show_dialog=true"
        return URL(string: string)
    }
    
    var isSignedIn: Bool {
        return false
    }
    
    private var accessToken: String? {
        return nil
    }
    
    private var refreshToken: String? {
        return nil
    }
    
    private var tokenExpirationDate: Date? {
        return nil
    }
    
    private var shouldRefreshToken: Bool {
        return false
    }
    
    public func exchangeCodeForToken(code:String,
                                     completion: @escaping ((Bool) -> Void){
        // get token
                                         
        
    }
    
    public func refreshToken(){
        
    }
    
    private func cacheToken(){
        
    }
    
}
