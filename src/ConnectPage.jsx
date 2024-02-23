import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConnectPage = () => {
  const navigate= useNavigate()
    function handleGetPageAcessToken(){
        const userAccessToken= localStorage.getItem("userAccessToken");
        axios.post('https://fbhelpdesk-server.onrender.com/get-page-access-token', { userAccessToken})
        .then((res) =>{
            console.log('res',res.data.pageAccessToken)
           localStorage.setItem('pageAccessToken',res.data.pageAccessToken )
           navigate('/delete-or-message')

        })
        .catch((error) => console.error(error));  }
  return (
    <div>
    <div className='login-div'>
    <h2>Facebook Page Integration</h2>
    <button onClick={handleGetPageAcessToken}>Connect Page</button>
    </div>
</div>
  )
}

export default ConnectPage