import "./followList.css"

const FollowList = ({ username, followList, setFollowList }) => {

  return (
    <div className='follow-list-wrapper'>
    <button onClick={() => setFollowList(null)}>Close</button>
        <div className='follow-list-title'>
            <p>{username ? username : 'User'}'s { followList || "No users found" }</p>
        </div>
        <div className='follow-list-list'>
            { followList || `No users found` }
        </div>
    </div>
  )
}

export default FollowList