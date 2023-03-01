import "./Courses.css";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
const Courses = () => {
  const [modal, setModal] = useState(false);
  const modals = () => {
    if (localStorage.getItem("token")) {
      setModal(true);
    } else {
      alert("Token mavjud emas");
    }
  };
  return (
    <div className="courses">
      <div onClick={() => modals()} className="courses_header">
        <button className="create_courses_btn">Create</button>
      </div>
      {modal ? (
        <div className="courses_modal">
          <div
            onClick={() => setModal(false)}
            className="courses_modal_overlay"
          ></div>
          <div className="courses_modal_content">
            <div className="courses_modal_header">
              <h2 className="courses_modal_title">Create course</h2>
              <span
                onClick={() => setModal(false)}
                className="courses_modal_closeSpan"
              >
                <GrClose className="courses_close" />
              </span>
            </div>
            <form className="form_courses">
              <div className="form_courses_div">
                <label for="title">Title:</label>
                <input
                  type="text"
                  className="form_courses_input"
                  placeholder="Enter your title..."
                  required
                  id="title"
                  name="title"
                />
              </div>

              <div className="form_courses_div">
                <label for="price">Price:</label>
                <input
                  type="number"
                  className="form_courses_input"
                  placeholder="Enter your price..."
                  required
                  id="price"
                  name="price"
                />
              </div>

              <div className="form_courses_div">
                <label for="author">Author:</label>
                <input
                  type="text"
                  className="form_courses_input"
                  placeholder="Enter your author..."
                  required
                  id="author"
                  name="author"
                />
              </div>
              <div className="form_courses_div  ">
                <label for="file">File:</label>
                <input
                  type="file"
                  className="form_courses_input_file"
                  required
                  name="file"
                  id="file"
                />
              </div>
              <button type="submit" className="form_courses_btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <div className="coursesAll"></div>
    </div>
  );
};
export default Courses;
