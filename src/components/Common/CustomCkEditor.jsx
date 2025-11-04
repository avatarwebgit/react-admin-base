// CustomEditor.js
import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Link from "@ckeditor/ckeditor5-link/src/link";
import List from "@ckeditor/ckeditor5-list/src/list";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import Undo from "@ckeditor/ckeditor5-undo/src/undo";
// import Redo from "@ckeditor/ckeditor5-undo/src/redo";

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  BlockQuote,
  Heading,
  Link,
  List,
  Paragraph,
  Table,
  TableToolbar,
  Image,
  ImageToolbar,
  ImageUpload,
  MediaEmbed,
  CodeBlock,
  Font,
  Alignment,
  SourceEditing,
  HorizontalLine,
  RemoveFormat,
  Undo,
//   Redo,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "insertTable",
      "codeBlock",
      "mediaEmbed",
      "undo",
    //   "redo",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "alignment",
      "horizontalLine",
      "removeFormat",
      "sourceEditing",
    ],
  },
  language: "fa",
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  image: {
    toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
  },
};
