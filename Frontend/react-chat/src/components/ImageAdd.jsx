import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
const apiLink = import.meta.env.VITE_API_LINK

const ImageAdd = () => {

  const [images, setImages] = useState([])
  useEffect(()=>{
    const fetchImages = async () => {
      try {
        await axios.get(apiLink + "/uploads") 
        .then(res => {
          setImages(res.data.filenames)
        })
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

  fetchImages()
} , [])

  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("User");
    if (localStorage.getItem("User") == null) {
      navigate("/login");
    }
  };

  const [slika, setSlika] = useState(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append('image', slika)
    await axios.post( apiLink+"/upload" , formData)
      .then(response => {
        console.log(response)
        if(!response.data.status){
          alert(response.data.message)
        }else {
          alert("Succesfuly added")
          console.log(response.data.filenames)
          setImages([])
          setImages(response.data.filenames)
        }
      }) 
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <h1 className="text-center text-5xl uppercase py-2 mb-10">Chat</h1>

      <form className="flex-col w-1/2 m-auto bg-sky-500 flex p-10 items-center space-y-4">
        <input  type="file" onChange={(e) => setSlika(e.target.files[0])} ></input>
        <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-green-500 text-white py-2 px-5 rounded-full uppercase font-semibold text-2xl mb-3">Spremi</button>
      </form>


    {
      images.length >  0 ?
        images.map((slika) => {
          return(
          <div key={slika}>
          <img className="h-30 w-40" src={apiLink+"/image/"+slika}></img>
          </div>)
        })
        :<h1>
          "Nemate slika"
        </h1>
    }


      <button className="bg-red-700 text-white uppercase font-semibold text-xl py-2 px-5 rounded-full" onClick={Logout}>Odjava</button>
    </div>
  );
};

export default ImageAdd;
