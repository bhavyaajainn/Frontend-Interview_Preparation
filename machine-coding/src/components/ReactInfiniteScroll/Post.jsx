import React, {useEffect} from 'react'

const Post = ({data, setPageNo, pageNo}) => {
    useEffect(()=>{
const observer = new IntersectionObserver((param)=>{
if(param[0].isIntersecting){
    observer.unobserve(lastImage);
    setPageNo((prev)=> prev+1);

}
},{threshold: 0.5})
const lastImage = document.querySelector('.image-post:last-child');
if(!lastImage){ return;}
observer.observe(lastImage)
return()=>{
    if(lastImage){
        observer.unobserve(lastImage);
    }
    observer.disconnect();
}
    },[data])
   return (
    <div className="container">
        {data.map((ele, index)=>{
            return <img className='image-post' key={index} src={ele.download_url} />
        })}
      
    </div>
  );
}

export default Post