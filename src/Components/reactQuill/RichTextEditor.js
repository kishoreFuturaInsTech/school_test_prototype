import React, { useState, useRef } from "react";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./RichTextEditor.css";

Quill.register("modules/imageResize", ImageResize);

function RichTextEditor() {
  const [quillvalue, setQuillvalue] = useState("<p>sample</p>");
  const [textValue, setTextValue] = useState("<p>sample</p>");
  const textBoxRef = useRef();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],

    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const onSaveText = () => {
    setQuillvalue(textBoxRef.current.value);
  };

  const onSaveQuill = () => {
    //console.log(quillvalue);
    setTextValue(quillvalue);
  };

  const onTextChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="rowC">
      {" "}
      <div className="editor">
        <ReactQuill
          theme="snow"
          value={quillvalue}
          onChange={setQuillvalue}
          modules={modules}
          formats={formats}
        />
        <button onClick={onSaveQuill}>Save</button>
      </div>
      <div className="preview">
        <textarea
          className="textareaC"
          rows="15"
          value={textValue}
          ref={textBoxRef}
          onChange={onTextChange}
        ></textarea>
        <button onClick={onSaveText}>Save</button>
      </div>
    </div>
  );
}

export default RichTextEditor;
