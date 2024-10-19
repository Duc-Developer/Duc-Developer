import React, { useImperativeHandle, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Bold,
  Italic,
  Paragraph,
  Undo,
  CodeBlock,
  Heading,
  Link,
  List,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageUpload,
  Table,
  TableToolbar,
  FontFamily,
  FontSize,
  Underline,
  Strikethrough,
  FontColor,
  FontBackgroundColor,
  MediaEmbed,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Alignment,
  BlockQuote,
  HorizontalLine,
  EventInfo,
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import styles from './style.module.css';
import CustomUploadAdapterPlugin from './plugins/uploader';

const plugins = [
  Essentials,
  Bold,
  Italic,
  Paragraph,
  Undo,
  CodeBlock,
  Heading,
  Link,
  List,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageUpload,
  Table,
  TableToolbar,
  FontFamily,
  FontSize,
  Underline,
  Strikethrough,
  FontColor,
  FontBackgroundColor,
  MediaEmbed,
  SpecialCharacters,
  SpecialCharactersEssentials,
  Alignment,
  BlockQuote,
  HorizontalLine
];

type Props = {
  defaultValue?: string;
  editorRef?:  React.MutableRefObject<any>;
  onChange?: (event: EventInfo, editor: ClassicEditor) => void;
}

const RichEditor = ({ defaultValue = '', editorRef, onChange }: Props) => {
  const ref = useRef<any>(null);

  useImperativeHandle(editorRef, () => ({
    setData: (content: string) => {
      ref?.current?.setData(content);
    }
  }));

  return (
    <div className={styles.richEditorWrapper}>
      <CKEditor
        editor={ClassicEditor}
        onChange={onChange}
        onReady={(editor) => {
          ref.current = editor;
        }}
        config={{
          extraPlugins: [CustomUploadAdapterPlugin],
          toolbar: {
            items: [
              'undo', 'redo', '|',
              'fontFamily', 'fontSize', 'heading', '|',
              'bold', 'italic', 'strikethrough', 'fontColor', 'fontBackgroundColor', '|',
              'link', 'uploadImage', 'mediaEmbed', 'specialCharacters', '|',
              'alignment', 'bulletedList', 'numberedList', 'blockQuote', 'horizontalLine', '|',
              'codeBlock', 'insertTable'
            ],
          },
          plugins: plugins,
          image: {
            toolbar: [
              'imageStyle:full', 'imageStyle:side', '|',
              'imageTextAlternative'
            ]
          },
          table: {
            contentToolbar: [
              'tableColumn', 'tableRow', 'mergeTableCells'
            ]
          },
          initialData: defaultValue
        }}
      />
    </div>
  );
};

export default RichEditor;