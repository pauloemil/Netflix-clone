import { useContext, useState } from "react";
// import storage from "../../config/firebase";
import "./newProduct.css";
// import { ref } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
export default function NewProduct() {
  const [movie, setMovie] = useState({ isSeries: true });
  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "isSeries") {
      if (value === "true") setMovie({ ...movie, [e.target.name]: true });
      else setMovie({ ...movie, [e.target.name]: false });
    } else setMovie({ ...movie, [e.target.name]: value });
  };

  // const upload = (items) => {
  //   items.forEach((item) => {
  //     const uploadTask = ref(storage, `/items/${item.file.name}`).put(item);
  //     uploadTask.on(
  //       "state_changes",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log(progress, "%");
  //       },
  //       (err) => {
  //         console.log(err);
  //       },
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
  //           setMovie((prev) => {
  //             return { ...prev, [item.label]: url };
  //           });
  //           setUploaded((prev) => prev + 1);
  //         });
  //       }
  //     );
  //   });
  // };

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   upload([{ file: img, label: "image" }]);
  //   // { file: imgTitle, label: "imageTitle" },
  //   //   { file: imgsm, label: "imageSmall" },
  //   //   { file: trailer, label: "trailer" },
  //   //   { file: video, label: "video" },
  // };

  const handleCreate = (e) => {
    e.preventDefault();

    createMovie(movie, dispatch);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image Link</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image Link"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Title Image Link</label>
          <input
            type="text"
            id="imageTitle"
            name="imageTitle"
            placeholder="Title Image Link<"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Link</label>
          <input
            type="text"
            placeholder="Thumbnail Link"
            id="imageSmall"
            name="imageSmall"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            name="limit"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          {/*  i know it should be server side action :" */}
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
            required
          />
        </div>

        <div className="addProductItem">
          <label>isSeries?</label>
          <select
            name="isSeries"
            id="isSeries"
            onChange={handleChange}
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer Link</label>
          <input
            type="text"
            name="trailer"
            placeholder="Trailer Link"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Video Link</label>
          <input
            type="text"
            name="video"
            placeholder="Video Link"
            onChange={handleChange}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            placeholder="Description"
            name="description"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="addProductButton" onClick={(e) => handleCreate(e)}>
          Create
        </button>
      </form>
    </div>
  );
}
