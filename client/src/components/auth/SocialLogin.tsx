import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login-lite';
import { FacebookLogin, FacebookLoginAuthResponse } from 'react-facebook-login-lite';

import { googleLogin, facebookLogin } from '../../redux/actions/authAction';


const SocialLogin = () => {
    const dispatch = useDispatch<any>()

    const onSuccess = (googleUser: GoogleLoginResponse) => {
        const id_token = googleUser.getAuthResponse().id_token
        dispatch(googleLogin(id_token))
    }

    const onFbSuccess = (response: FacebookLoginAuthResponse) => {
        const { accessToken, userID } = response.authResponse
        dispatch(facebookLogin(accessToken, userID))
    }


    return (
        <div>
            <div className='my-2'>
                <GoogleLogin
                    client_id='256996196142-gqs6e7ovihu6mclbodo9nt2geq6n49da.apps.googleusercontent.com'
                    cookiepolicy='single_host_origin'
                    onSuccess={onSuccess}
                    theme="dark"
                />
            </div>

            <div className='my-2'>
                <FacebookLogin
                    appId="1456233054820255"
                    onSuccess={onFbSuccess}
                />
            </div>
        </div>
    )
}

export default SocialLogin