import React, { useState } from 'react';

const TracksPage = () => {
  const [tracks, setTracks] = useState([]);
  const [trackName, setTrackName] = useState('');
  const [activeTrack, setActiveTrack] = useState(null);
  const [activeCourse, setActiveCourse] = useState('');
  const [courseName, setCourseName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editVideoIndex, setEditVideoIndex] = useState(null);

  const handleAddTrack = () => {
    if (trackName) {
      setTracks([...tracks, { name: trackName, courses: [] }]);
      setTrackName('');
    }
  };

  const handleAddCourse = () => {
    if (activeTrack !== null && courseName) {
      const newTracks = [...tracks];
      newTracks[activeTrack].courses.push({ name: courseName, videos: [] });
      setTracks(newTracks);
      setCourseName('');
    }
  };

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTracks = [...tracks];

    if (isEditing && editVideoIndex !== null) {
      // تعديل الفيديو الموجود
      const courseIndex = newTracks[activeTrack].courses.findIndex(course => course.name === activeCourse);
      newTracks[activeTrack].courses[courseIndex].videos[editVideoIndex] = { id: editVideoIndex + 1, name: videoName, file: videoFile };
    } else {
      // إضافة فيديو جديد
      if (activeTrack !== null && activeCourse) {
        const courseIndex = newTracks[activeTrack].courses.findIndex(course => course.name === activeCourse);
        const newVideo = { id: newTracks[activeTrack].courses[courseIndex].videos.length + 1, name: videoName, file: videoFile };
        newTracks[activeTrack].courses[courseIndex].videos.push(newVideo);
      }
    }

    setTracks(newTracks);
    setVideoName('');
    setVideoFile(null);
    setIsEditing(false);
    setEditVideoIndex(null);
  };

  const handleDeleteVideo = (trackIndex, courseIndex, videoIndex) => {
    const newTracks = [...tracks];
    newTracks[trackIndex].courses[courseIndex].videos.splice(videoIndex, 1);
    setTracks(newTracks);
  };

  const handleEditVideo = (trackIndex, courseIndex, videoIndex) => {
    const videoToEdit = tracks[trackIndex].courses[courseIndex].videos[videoIndex];
    setVideoName(videoToEdit.name);
    setVideoFile(videoToEdit.file);
    setIsEditing(true);
    setEditVideoIndex(videoIndex);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Tracks and Courses</h2>

      {/* Add Track */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Track Name"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleAddTrack}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Track
        </button>
      </div>

      {/* Track Selection */}
      <div className="mb-4">
        <label htmlFor="track-select" className="block mb-2">
          Select Track:
        </label>
        <select
          id="track-select"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => {
            setActiveTrack(e.target.value);
            setActiveCourse('');
          }}
        >
          <option value="">Choose a track</option>
          {tracks.map((track, index) => (
            <option key={index} value={index}>
              {track.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Course */}
      {activeTrack !== null && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddCourse}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2"
          >
            Add Course
          </button>
        </div>
      )}

      {/* Course Selection for Video Upload */}
      {activeTrack !== null && (
        <div className="mb-4">
          <label htmlFor="course-select" className="block mb-2">
            Select Course to Add Video:
          </label>
          <select
            id="course-select"
            className="p-2 border border-gray-300 rounded"
            value={activeCourse}
            onChange={(e) => setActiveCourse(e.target.value)}
          >
            <option value="">Choose a course</option>
            {activeTrack !== null && tracks[activeTrack].courses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Video Upload */}
      {activeTrack !== null && activeCourse && (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold">
            {isEditing ? 'Edit Video' : 'Upload Video'} to Course
          </h3>
          <input
            type="text"
            placeholder="Video Name"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="p-2 border border-gray-300 rounded"
            required={!isEditing} // جعل رفع الفيديو مطلوب فقط عند إضافة فيديو جديد
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Save Changes' : 'Upload Video'}
          </button>
        </form>
      )}

      {/* Display Courses and Videos */}
      {activeTrack !== null && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Courses</h3>
          {tracks[activeTrack].courses.map((course, courseIndex) => (
            <div key={courseIndex} className="border p-4 mt-2">
              <h4 className="font-bold">{course.name}</h4>
              <h5 className="font-semibold mb-2">Videos:</h5>
              {course.videos.length > 0 ? (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">ID</th>
                      <th className="px-4 py-2 border">Video Name</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {course.videos.map((video, videoIndex) => (
                        <tr key={videoIndex}>
                          {/* تعديل id ليكون بناءً على index */}
                          <td className="px-4 py-2 border">{videoIndex + 1}</td>
                          <td className="px-4 py-2 border">{video.name}</td>
                          <td className="px-4 py-2 border flex justify-between">
                            <button
                              onClick={() => handleEditVideo(activeTrack, courseIndex, videoIndex)}
                              className="text-blue-500 hover:underline mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(activeTrack, courseIndex, videoIndex)}
                              className="text-red-500 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>No videos available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TracksPage;
