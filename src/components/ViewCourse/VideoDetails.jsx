import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, Player } from 'video-react';
import IconBtn from '../common/IconBtn';
import { markLectureAsComplete } from '../../services/operations/courseDetailsAPI';
import {updateCompletedLectures} from "../../slices/viewCourseSlice"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const {token} = useSelector( (state) => state.auth);
  const {courseSectionData,courseEntireData,completedLectures} = useSelector( (state) => state.viewCourse);

  const [videoData,setVideoData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [videoEnded,setVideoEnded] = useState(false);
  const [previewSource,setPreviewSource] = useState("");

  useEffect( () => {
    ;(async () => {
      if(!courseSectionData.length) return;
      if(!courseId && !sectionId && !subSectionId){
        navigate(`/dashboard/enrolled-courses`)
      }else{
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )

        if (filteredVideoData && filteredVideoData.length > 0) {
          setVideoData(filteredVideoData[0]);
          setPreviewSource(courseEntireData.thumbnail);
          setVideoEnded(false);
        }
      }
    })();
  },[courseSectionData, courseEntireData, location.pathname]);
  
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex( (data) => data._id === subSectionId);

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId);
    
    if(currentSubSectionIndx !== noOfSubsections-1)
    {
      const nextSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSubSectionIndx+1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    }else{
      const nextSectionId = courseSectionData[currentSectionIndx +1]._id;
      const nextSubSectionId =
      courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

    // check if the lecture is the last video of the course
    const isLastVideo = () => {
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      const noOfSubsections = courseSectionData[currentSectionIndx].subSection.length;

      const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

      if(currentSectionIndx === courseSectionData.length - 1 && 
        currentSubSectionIndx === noOfSubsections - 1)
      {
        return true
      }
      else { return false}
    }
  

  const goToPrevVideo = () => {
    const currentSectionIndx  = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[currentSectionIndx].subSection.findIndex((data) => data._id === subSectionId)

    if(currentSubSectionIndx !== 0) {
      const prevSubSectionId = courseSectionData[currentSectionIndx].subSection[currentSectionIndx - 1]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    }else{
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
     const prevSubSectionLength = courseSectionData[currentSectionIndx - 1].subSection.length;
     const prevSubSectionId = courseSectionData[currentSectionIndx - 1].subSection[prevSubSectionLength - 1]._id;
     navigate(
      `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
    )
    }
  }
  
  const handleLectureComplete = async() => {
    setLoading(true);
    const res = await markLectureAsComplete({courseId,subSectionId},token);
    if(res){
      dispatch(updateCompletedLectures(subSectionId))
    }
    if(!isLastVideo()){
      goToNextVideo();
    }
    setLoading(false);
  }



  return (
    <div className='flex flex-col text-white lg:min-h-[calc(100vh-3.5rem)]'>
      {!videoData ? (<img src={previewSource} alt='preview' className="h-full w-full rounded-md object-cover "/>) 
      :
      (
        
       <Player
         ref={playerRef}
         playsInline
         aspectRatio='16:9'
         onEnded={() => setVideoEnded(true)}
         src={videoData?.videoUrl}
         className="mt-12"
       >
        <BigPlayButton position='center'/>
        {/* Render when video end */}
          {videoEnded && (
            <div  style={{
              backgroundImage:
                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
            }}
            className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                 disabled={loading}
                 onclick={() => handleLectureComplete()}
                 text={!loading ? "Mark As Completed":"Loading..."}
                 customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}


          <IconBtn
              disabled={loading}
              onclick={() => {
                if (playerRef?.current) {
                  // set the current time of the video to 0
                  playerRef?.current?.seek(0)
                  setVideoEnded(false)
                }
              }}
              text="Rewatch"
              customClasses="text-xl max-w-max px-4 mx-auto mt-2"
            />
            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
              {!isFirstVideo() && (
                <button
                  disabled={loading}
                  onClick={goToPrevVideo}
                  className="blackButton"
                >
                  Prev
                </button>
              )}
              {!isLastVideo() && (
                <button
                  disabled={loading}
                  onClick={goToNextVideo}
                  className="blackButton"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
       </Player>
      )  
    }
    <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
    </div>
  )
}

export default VideoDetails