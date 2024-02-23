import { useNavigate } from "react-router-dom"

const DeletePage = () => {
    const navigate = useNavigate()
    function handleDelete(){
      localStorage.removeItem('userAccessToken')
      localStorage.removeItem('pageAccessToken')
      navigate('/')
    }
  return (

    <div>
    <div className='login-div'>
    <span style={{fontWeight:'600'}}>Facebook Page Integration</span>
    <p>Integrated Page : <span style={{fontWeight:'700'}}> Test-2</span></p>
    <div className="flex-div" style={{gap:'1em'}}>
    <button className="red-button" onClick={handleDelete} >Delete Integration</button>
    <button onClick={()=> navigate('/conversation')}>Reply to messages</button>
    </div>    
    </div>
</div>  
)
}

export default DeletePage