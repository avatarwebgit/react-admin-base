export const editorInit = {
  height: 600,
  menubar: true,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
    // Additional useful plugins:
    "emoticons",
    "imagetools",
    "textcolor",
    "spellchecker",
  ],
  toolbar:
    "undo redo | blocks | fontselect fontsizeselect | " +
    "bold italic underline forecolor backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "link image media table | code preview fullscreen | " +
    "removeformat help emoticons",
  content_style:
    "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.2; }",
  directionality: "rtl",
  language: "fa",
  // Additional useful settings:
  image_advtab: true, // Advanced image options
  paste_data_images: true, // Allow pasting images
  menubar: "file edit view insert format tools table help",
};
