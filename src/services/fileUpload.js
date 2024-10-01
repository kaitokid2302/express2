module.exports = {
  fileUpload: async (file) => {
    const currentPath = __dirname;
    const fileName =
      Date.now().toString() + "-" + file.name.replace(/\s+/g, "");

    const uploadPath = `${currentPath}/../upload/` + fileName;
    await file.mv(uploadPath, (err) => {
      if (err) {
        return {
          error: true,
          description: "Error uploading file",
        };
      }
    });
    return {
      error: false,
      description: "File uploaded!",
      file: fileName,
    };
  },
};
