import React, { useEffect, useState } from "react";
import { CSSProperties } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner: CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img: CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
};

export const FileUpload = ({
  initialFiles,
  onChange,
}: {
  initialFiles?: File[];
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState(initialFiles || []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (onChange) onChange(acceptedFiles);
    },
  });

  const thumbs = files.map((file: any, index) => (
    <div style={thumb} key={file.name} className="relative">
      <div
        className="absolute right-[10px] top-[5px] cursor-pointer"
        onClick={() => {
          const newFiles = [...files];
          newFiles.splice(index, 1);
          setFiles(newFiles);
        }}
      >
        X
      </div>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
};
