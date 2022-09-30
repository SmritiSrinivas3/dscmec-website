import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import firebaseApp from "../../utils/firebase";
import "./Videos.css";
function Videos() {
    const [videos,setVideos]=useState([]) 
 
    async function getVideos()
  {
    const db=getFirestore(firebaseApp);
    const data = await getDocs(
        query(
          collection(db, "videos"),
          orderBy("id", "desc")
        )
      );
  let videosArray=[];
    data.forEach((doc) => {
        videosArray.push(doc.data())
       })
       setVideos(videosArray)
   
    }
    useEffect(() => {
  getVideos();},[])
  return (
    <div className="videos_container">
        <h1 className="videos_heading">Our Videos</h1>
{videos.map((item, index) => {return(<>
        <h1 className="videos_heading_1">{item.title}</h1>
        <div className="videos">
        {item.yids.map((item1, index) => {return( <iframe
        className="video_iframe"
        src={item1.replace("watch?v=","embed/")}
        title="DSC MEC Videos"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>);})}
      </div></>);})}
    </div>
  );
}

export default Videos;
