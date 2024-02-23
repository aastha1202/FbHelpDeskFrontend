
import { useNavigate } from 'react-router-dom'

const Login = () => {
const navigate = useNavigate()
  function handleFacebookLogin(){
    window.FB.login(function(resp){
        if(resp.authResponse){
            const userAccessToken= resp.authResponse.accessToken
             console.log(userAccessToken)
             localStorage.setItem('userAccessToken', userAccessToken);
             navigate('/connect-page')

        }
    })
  }

  return (
    <div>
        <div className='login-div'>
        <h2>Login with Facebook</h2>
        <button onClick={handleFacebookLogin}>Login with facebook</button>
        </div>
    </div>
  )
}

export default Login