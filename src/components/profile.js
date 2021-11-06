import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import Tags from "./subcomponents/tags"
import ProfilePostsBox  from "./subcomponents/profilePostsBox"
import axios from 'axios'
class Profile extends React.Component {
  constructor(props){
    super(props)
    if(sessionStorage.getItem("token"))
      var obj = JSON.parse(sessionStorage.getItem("token"))
    else
      window.location = "/login"
      console.log(sessionStorage.getItem("token"))
      var objs = JSON.parse(sessionStorage.getItem("token"))
      console.log(objs)
    this.state = {
      postpoxWidth : "",
      items : obj,
      sength : 45,
      item : [],
      size : 0,
      limit : 10
    }
    
    axios.get('https://tiaraapi.herokuapp.com/PostsData/0/6')
    .then((response) => {
      if(response.status===200){
        this.setState({item : response.data })
        console.log(this.state.item)
      }
      else{
      }
    })
    this.state.item.map((i,index) => console.log(index))
  }

  fetchMoreData = () => {
    
    this.setState({skip: this.state.skip + 2})  
    
    axios.get('https://tiaraapi.herokuapp.com/PostsData/'+this.state.skip+'/'+this.state.limit)
      .then((response) => {
        if(response.status===200){   
          this.setState({item : this.state.item.concat(response.data) })
          console.log(response.data)
        }
        else{
        }
    })
    // a fake async api call like which sends
  
    this.state.item.map((i,index) => console.log(index))
  };

  componentDidMount () {
    
    console.log(this.state.items)
  
  }

  render() {
    console.log(this.state.postpoxWidth);
    
    return (
      <div className="body">
        <div className="profile-contants">
            <div className="coverImg" style={{background:"url("+this.state.items.userCoverPic+")"}}>

                <div className="profilePic" ><img src={this.state.items.userPic} width="80px" height="80px" alt=""></img></div>
                <div className="editButton"><span>
                        <center>edit</center>
                    </span></div>
            </div>
            <div className="username"><span><center>{this.state.items.userName}</center></span>
                
            </div>
            <div className="tags">
              <center>
                <Tags tags={this.state.items.tags} />
              </center>
            </div>
            <div className="userBio"><span>{this.state.items.bio}</span></div>
            <div className="row posts-data" style={{height:76+'px'}} >
                <div className="posts col p-0">
                    <div className="posts-no">{this.state.items.postInfo.postCount}</div>
                    <div className="posts-text">Posts</div>
                </div>
                <div className="followers col p-0">
                    <div className="followers-no ">{this.state.items.postInfo.followersCount}</div>
                    <div className="followers-text">Followers</div>
                </div>
                <div className="following col p-0">
                    <div className="following-no">{this.state.items.postInfo.followingCount}</div>
                    <div className="following-text">Following</div>
                </div>
            </div> 

        </div>
        <div style={{paddingBottom : 45+'px'}}>

          <InfiniteScroll
              dataLength={this.state.item.length}
              next = {this.fetchMoreData}
            >
            <div className="profile-posts row" >
              {this.state.item.map((i,index) =>( 
                <ProfilePostsBox key={index}  postsBoxData={this.state.item[index]}/>
              ))}
            <div className="posts-box col-4">
                <span className="iconify add-posts" data-inline="false" data-icon="bi:plus-circle"></span>
            </div>
            </div>
          </InfiniteScroll>
        </div>
           
    </div>
    )
  }
}


export default Profile