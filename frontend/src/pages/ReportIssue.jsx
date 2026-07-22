import Webcam from "react-webcam";
import { MapContainer, TileLayer, Marker, useMapEvents,useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState,useRef } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
function ChangeView({ center }) {
  const map = useMap();

  map.setView(center);

  return null;
}
function LocationMarker({ setPosition, setLatitude, setLongitude }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });

  return null;
}
function ReportIssue() {
  const[showCamera,setShowCamera]=useState(false);
  const webcamRef=useRef(null);
  const [image, setImage] = useState(null);
  const [title,setTitle]=useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState([17.385, 78.4867]); // Default location
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);


  const categories = [
    "Water Leakage",
    "Broken Street Light",
    "Chemical Waste",
    "Paper Waste",
    "Plastic Waste",
    "Dustbin Overflow",
    "Dry Plants",
    "Energy Issue",
    "Maintenance",
    "Other"
  ];

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setPosition([lat, lng]);
      setLatitude(lat);
      setLongitude(lng);

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const place = response.data.display_name;

        setLocation(place);

      } catch (error) {
        console.log("Location name error:", error);
        setLocation(`${lat}, ${lng}`);
      }
    },
    () => {
      alert("Unable to fetch your location");
    }
  );
};
const dataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];

  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

  // AI Analysis Button

  const handleAnalyze = () => {


    if(!category){

      alert("Please select issue category");
      return;

    }


    let severity = "Low";
    let recommendation = "";



    if(category === "Water Leakage"){

      severity = "High";
      recommendation =
      "Repair leaking tap or pipe to prevent water wastage.";

    }


    else if(category === "Broken Street Light"){

      severity = "High";
      recommendation =
      "Repair or replace damaged street light.";

    }


    else if(category === "Chemical Waste"){

      severity = "High";
      recommendation =
      "Dispose chemical waste safely.";

    }


    else if(category === "Dustbin Overflow"){

      severity = "Medium";
      recommendation =
      "Empty dustbin and improve waste collection.";

    }


    else if(category === "Plastic Waste"){

      severity = "Medium";
      recommendation =
      "Send plastic waste for recycling.";

    }


    else{

      severity = "Medium";
      recommendation =
      "Inspect and resolve the issue.";

    }



    setAiResult({

      category,
      severity,
      recommendation

    });


  };





  // Submit Issue Button

  const handleSubmit = async () => {


    if(!image || !title ||!category || !location){

      alert("Please fill all details");
      return;

    }


    try{


      setLoading(true);



      const formData = new FormData();


      formData.append("image", image);
      formData.append("title", title);
      formData.append("category", category);
      formData.append("location", location);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);


      const token = localStorage.getItem("token");

      console.log("Coordinates:", latitude, longitude);

      const response = await axios.post(

        "https://green-campus-1.onrender.com/api/issues",

        formData,

        {

          headers: {

            Authorization:`Bearer ${token}`,

            "Content-Type":"multipart/form-data"

          }

        }

      );



      setResult(response.data);



    }


    catch(error){


      setResult({
  message:
  error.response?.data?.message ||
  error.message
});


    }


    finally{


      setLoading(false);


    }


  };





  return (


  
    <MainLayout>


      <div className="min-h-screen bg-green-50 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">


        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-700 mb-6">

          📷 Report Campus Issue

        </h1>



        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto">



          <label className="font-semibold text-green-800 block mb-3">
  📸 Upload Campus Photo
</label>

<div className="border-2 border-dashed border-green-300 rounded-xl p-4 sm:p-6 text-center bg-green-50">

  <p className="text-gray-600 text-sm mb-4">
    Capture or upload an image of the campus issue 🌱
  </p>

  <button
    onClick={() => setShowCamera(!showCamera)}
    className="bg-green-600 text-white px-5 py-2 rounded-full shadow hover:bg-green-700 hover:scale-105 transition"
  >
    📷 {showCamera ? "Close Camera" : "Open Camera"}
  </button>

</div>
{showCamera && (
  <div>
    <Webcam
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  className="w-full rounded-xl mt-4 shadow-md"
/>

    <button
      onClick={() => {
        const imageSrc = webcamRef.current.getScreenshot();
        const file = dataURLtoFile(
  imageSrc,
  "camera-image.jpg"
);

setImage(file);
        setShowCamera(false);
      }}
      className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-full mt-4 shadow hover:bg-green-700 transition"
    >
      Capture Photo
    </button>
  </div>
)}


         <input
  type="file"
  accept="image/*"
  capture="environment"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full border-2 border-green-200 rounded-xl p-3 text-sm sm:text-base mt-4 mb-5 focus:outline-none focus:border-green-500"
/>

{image && (
  <img
    src={URL.createObjectURL(image)}
    alt="Preview"
    className="w-full rounded-lg mt-4 mb-5 border"
  />
)}
{image && (
  <button
    onClick={() => setImage(null)}
    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
  >
    ❌ Remove Image
  </button>
)}
       <label className="font-semibold text-green-800 block mb-2">
  📝 Issue Title
</label>

<input
  type="text"
  placeholder="Example: Overflowing Dustbin"
  value={title}
  onChange={(e)=>setTitle(e.target.value)}
  className="
    w-full
    border-2
    border-green-200
    rounded-xl
    p-3
    text-sm
    sm:text-base
    mb-5
    focus:outline-none
    focus:border-green-500
    transition
  "
/>



          <label className="font-semibold text-green-800 block mb-2">
  🌍 Select Issue Category
</label>


          <select

            value={category}

            onChange={(e)=>setCategory(e.target.value)}

            className="
w-full
border-2
border-green-200
rounded-xl
p-3
text-sm
sm:text-base
mb-5
bg-white
focus:outline-none
focus:border-green-500
transition
"

          >


            <option value="">

              Select Category

            </option>


            {

            categories.map((item,index)=>(

              <option key={index} value={item}>

                {item}

              </option>

            ))

            }


          </select>






          <label className="font-semibold text-green-800 block mb-2">
  📍 Issue Location
</label>


          <input

            type="text"

            placeholder="Example: Near Mess"

            value={location}

            onChange={(e)=>setLocation(e.target.value)}

            className="
              w-full
              border-2
              border-green-200
              rounded-xl
              p-3
              text-sm
              sm:text-base
              mb-5
              focus:outline-none
              focus:border-green-500
              transition
            "

          />

            <button
  onClick={getCurrentLocation}
  className="
    w-full
    sm:w-auto
    bg-blue-600
    text-white
    px-6
    py-3
    rounded-full
    shadow-md
    hover:bg-blue-700
    hover:scale-105
    transition
    mb-5
  "
>
  📍 Get Current Location
</button>

<MapContainer
  center={position}
  zoom={13}
  style={{
    height: "350px",
    width: "100%"
  }}
  className="
    rounded-2xl
    border-2
    border-green-200
    shadow-lg
    overflow-hidden
    mb-6
  "
>
  <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

  <ChangeView center={position} />

  <LocationMarker
    setPosition={setPosition}
    setLatitude={setLatitude}
    setLongitude={setLongitude}
  />

  <Marker position={position} />

</MapContainer>



          <div className="flex  flex-col sm:flex-row gap-4">


            <button

              onClick={handleAnalyze}

             className="
w-full
sm:w-1/2
bg-blue-600
text-white
py-3
rounded-full
shadow-md
hover:bg-blue-700
hover:scale-105
transition
"
            >

              🤖 Analyze with AI

            </button>





            <button

              onClick={handleSubmit}

              disabled={loading}

              className="
w-full
sm:w-1/2
bg-green-600
text-white
py-3
rounded-full
shadow-md
hover:bg-green-700
hover:scale-105
transition
disabled:opacity-50
"

            >

              {loading ? "Submitting..." : "🚀 Submit Issue"}

            </button>


          </div>






          {aiResult && (

          <div
  className="
    mt-6
    bg-gradient-to-r
    from-blue-50
    to-cyan-50
    p-5
    sm:p-6
    rounded-2xl
    border
    border-blue-200
    shadow-md
    animate-pulse
    break-words
  "
>


            <h2 className="font-bold text-blue-700 text-lg">
  🤖 AI Environmental Analysis
</h2>


            <p>

            <b>Category:</b> {aiResult.category}

            </p>


            <p>

            <b>Severity:</b> {aiResult.severity}

            </p>


            <p>

            <b>Recommendation:</b> {aiResult.recommendation}

            </p>


          </div>

          )}






          {result && (

<div
  className="
    mt-6
    bg-gradient-to-r
    from-green-50
    to-emerald-50
    p-5
    sm:p-6
    rounded-2xl
    border
    border-green-200
    shadow-md
    animate-bounce
  "
>


            <h2 className="font-bold text-green-700 text-lg">
  ✅ Report Submitted Successfully
</h2>

            <p>

            {result.message}

            </p>


          </div>

          )}

          {result?.message && (

<div
 className="
 fixed
 top-5
 right-3
 left-3
 sm:left-auto
 sm:right-5
 bg-red-500
 text-white
 px-5
 py-3
 rounded-2xl
 shadow-xl
 text-center
 animate-pulse
 z-50
 "
>

{result.message}

</div>

)}


        </div>


      </div>


    </MainLayout>

  );

}


export default ReportIssue;