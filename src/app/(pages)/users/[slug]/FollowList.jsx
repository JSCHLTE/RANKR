import "./followList.css"

const FollowList = ({ username, followList }) => {
  return (
    <div className='follow-list-wrapper'>
        <div className='follow-list-title'>
            <p>{username ? username : 'User'}'s Followers</p>
        </div>
        <div className='follow-list-list'>
            { followList ? followList : `No users found` }
        </div>
    </div>
  )
}

export default FollowList