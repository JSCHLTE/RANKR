import "./followList.css"

const FollowList = ({ username, followers, following }) => {

  useEffect(() => {
    console.log(followers)
  }, [])

  return (
    <div className='follow-list-wrapper'>
        <div className='follow-list-title'>
            <p>{username ? username : 'User'}'s Followers</p>
        </div>
        <div className='follow-list-list'>
            { followers ? followers : `No users found` }
        </div>
    </div>
  )
}

export default FollowList