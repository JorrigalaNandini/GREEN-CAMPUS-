import { useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";


function ReportIssue() {

  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

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


    if(!image || !category || !location){

      alert("Please fill all details");
      return;

    }


    try{


      setLoading(true);



      const formData = new FormData();


      formData.append("image", image);
      formData.append("category", category);
      formData.append("location", location);



      const token = localStorage.getItem("token");



      const response = await axios.post(

        "http://localhost:5000/api/issues",

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


      <div className="min-h-screen bg-green-50 p-6">


        <h1 className="text-3xl font-bold text-green-700 mb-6">

          📷 Report Campus Issue

        </h1>



        <div className="bg-white shadow-lg rounded-xl p-6 max-w-2xl mx-auto">



          <label className="font-semibold">

            Upload Campus Photo

          </label>


          <input

            type="file"

            onChange={(e)=>setImage(e.target.files[0])}

            className="w-full border rounded-lg p-3 mb-5"

          />





          <label className="font-semibold">

            Select Issue Category

          </label>


          <select

            value={category}

            onChange={(e)=>setCategory(e.target.value)}

            className="w-full border rounded-lg p-3 mb-5"

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






          <label className="font-semibold">

            Location

          </label>


          <input

            type="text"

            placeholder="Example: Near Mess"

            value={location}

            onChange={(e)=>setLocation(e.target.value)}

            className="w-full border rounded-lg p-3 mb-5"

          />






          <div className="flex gap-4">


            <button

              onClick={handleAnalyze}

              className="w-1/2 bg-blue-600 text-white py-3 rounded-lg"

            >

              🤖 Analyze with AI

            </button>





            <button

              onClick={handleSubmit}

              disabled={loading}

              className="w-1/2 bg-green-600 text-white py-3 rounded-lg"

            >

              {loading ? "Submitting..." : "🚀 Submit Issue"}

            </button>


          </div>






          {aiResult && (

          <div className="mt-6 bg-blue-50 p-5 rounded-xl">


            <h2 className="font-bold text-blue-700">

              🤖 AI Analysis Result

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

          <div className="mt-6 bg-green-50 p-5 rounded-xl">


            <h2 className="font-bold text-green-700">

              ✅ Issue Submitted

            </h2>


            <p>

            {result.message}

            </p>


          </div>

          )}

          {result?.message && (

<div className="fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">

{result.message}

</div>

)}


        </div>


      </div>


    </MainLayout>

  );

}


export default ReportIssue;