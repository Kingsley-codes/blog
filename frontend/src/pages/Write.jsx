import { useAuth, useUser } from "@clerk/clerk-react";
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import Upload from "../components/Upload";




const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [value, setValue] = useState('');
  const [cover, setCover] = useState('');
  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => { 
    img && setValue(prev=>prev + `<p><image src="${img.url}" /></p>`)
  },[img])

  useEffect(() => {
    video && setValue(prev=>prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`)
  },[video])

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("No token received");
        }

        return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    },

    onSuccess: (res) => {
      toast.success("Post has been created!")
      navigate(`/${res.data.slug}`);
    }
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (!isSignedIn) {
    return <div className="">You should login!</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);

    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };


    if (!data.title || !data.category || !data.desc) {
      console.error("Missing fields in the form data");
      return;
    }

    mutation.mutate(data);
  };

  

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col mx-6 gap-6">
      <h1 className="text-xl font-light">Create A New Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-8">
        <Upload type='image' setProgress={setProgress} setData={setCover}>
          <button type="button" className="p-2 shadow-md rounded-xl text-sm bg-white text-gray-500 w-max">
            Add a Cover Image
          </button>
        </Upload>
        
        <input
          name="title"
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
        />

        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">Choose a Category</label>
          <select className="p-2 rounded-xl shadow-md bg-white" name="category">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="database">Database</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl shadow-md bg-white"
          name="desc"
          placeholder="A Short Description"
        />

        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
          <Upload type='image' setProgress={setProgress} setData={setImg}>
            🖼️
          </Upload>

          <Upload type='video' setProgress={setProgress} setData={setVideo}>
            📹
          </Upload>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            readOnly={0 < progress && progress < 100}
            onChange={setValue}
            className="flex-1 min-h-[400px] rounded-xl shadow-md bg-white"
          />
        </div>
        <button 
          disabled={mutation.isPending || (0 < progress && progress < 100)} 
          className="bg-blue-800 text-white font-medium rounded-xl mb-6 mt-4 p-2 w-36 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {mutation.isPending ? "Loading..." : "Send" }
        </button>
        {"progress:" + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
