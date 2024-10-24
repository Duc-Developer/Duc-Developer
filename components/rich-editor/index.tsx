import React, { useImperativeHandle, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, EventInfo } from 'ckeditor5'

import 'ckeditor5/ckeditor5.css';
import styles from './style.module.css';
import CustomUploadAdapterPlugin from './plugins/uploader';
import { basePlugins, imageConfig, tableConfig, toolbarConfig } from './constants';

type Props = {
  defaultValue?: string;
  editorRef?: React.MutableRefObject<any>;
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
          toolbar: { ...toolbarConfig },
          plugins: basePlugins,
          image: { ...imageConfig },
          table: { ...tableConfig },
          initialData: defaultValue
        }}
      />
    </div>
  );
};

export default RichEditor;