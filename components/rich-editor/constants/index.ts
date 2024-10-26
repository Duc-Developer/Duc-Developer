import {
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
    SourceEditing,
    ImageResize,
    TableProperties,
    TableCellProperties,
} from 'ckeditor5';

import type { HeadingConfig, ImageConfig, TableConfig, ToolbarConfig } from "ckeditor5";


export const basePlugins = [
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
    ImageResize,
    ImageUpload,
    Table,
    TableToolbar,
    TableProperties,
    TableCellProperties,
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
    SourceEditing,
];

/** for table configs */
export const tableConfig: TableConfig = {
    contentToolbar: [
        'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'
    ],
    tableProperties: {
        borderColors: [
            {
                color: 'hsl(0, 0%, 0%)',
                label: 'Black'
            },
            {
                color: 'hsl(0, 0%, 30%)',
                label: 'Dim grey'
            },
            {
                color: 'hsl(0, 0%, 60%)',
                label: 'Grey'
            },
            {
                color: 'hsl(0, 0%, 90%)',
                label: 'Light grey'
            },
            {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
            },
            {
                color: 'hsl(0, 75%, 60%)',
                label: 'Red'
            },
            {
                color: 'hsl(30, 75%, 60%)',
                label: 'Orange'
            },
            {
                color: 'hsl(60, 75%, 60%)',
                label: 'Yellow'
            },
            {
                color: 'hsl(90, 75%, 60%)',
                label: 'Light green'
            },
            {
                color: 'hsl(120, 75%, 60%)',
                label: 'Green'
            },
            {
                color: 'hsl(150, 75%, 60%)',
                label: 'Aquamarine'
            },
            {
                color: 'hsl(180, 75%, 60%)',
                label: 'Turquoise'
            },
            {
                color: 'hsl(210, 75%, 60%)',
                label: 'Light blue'
            },
            {
                color: 'hsl(240, 75%, 60%)',
                label: 'Blue'
            },
            {
                color: 'hsl(270, 75%, 60%)',
                label: 'Purple'
            }
        ],
        backgroundColors: [
            {
                color: 'hsl(0, 0%, 0%)',
                label: 'Black'
            },
            {
                color: 'hsl(0, 0%, 30%)',
                label: 'Dim grey'
            },
            {
                color: 'hsl(0, 0%, 60%)',
                label: 'Grey'
            },
            {
                color: 'hsl(0, 0%, 90%)',
                label: 'Light grey'
            },
            {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
            },
            {
                color: 'hsl(0, 75%, 60%)',
                label: 'Red'
            },
            {
                color: 'hsl(30, 75%, 60%)',
                label: 'Orange'
            },
            {
                color: 'hsl(60, 75%, 60%)',
                label: 'Yellow'
            },
            {
                color: 'hsl(90, 75%, 60%)',
                label: 'Light green'
            },
            {
                color: 'hsl(120, 75%, 60%)',
                label: 'Green'
            },
            {
                color: 'hsl(150, 75%, 60%)',
                label: 'Aquamarine'
            },
            {
                color: 'hsl(180, 75%, 60%)',
                label: 'Turquoise'
            },
            {
                color: 'hsl(210, 75%, 60%)',
                label: 'Light blue'
            },
            {
                color: 'hsl(240, 75%, 60%)',
                label: 'Blue'
            },
            {
                color: 'hsl(270, 75%, 60%)',
                label: 'Purple'
            }
        ]
    },
    tableCellProperties: {
        borderColors: [
            {
                color: 'hsl(0, 0%, 0%)',
                label: 'Black'
            },
            {
                color: 'hsl(0, 0%, 30%)',
                label: 'Dim grey'
            },
            {
                color: 'hsl(0, 0%, 60%)',
                label: 'Grey'
            },
            {
                color: 'hsl(0, 0%, 90%)',
                label: 'Light grey'
            },
            {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
            },
            {
                color: 'hsl(0, 75%, 60%)',
                label: 'Red'
            },
            {
                color: 'hsl(30, 75%, 60%)',
                label: 'Orange'
            },
            {
                color: 'hsl(60, 75%, 60%)',
                label: 'Yellow'
            },
            {
                color: 'hsl(90, 75%, 60%)',
                label: 'Light green'
            },
            {
                color: 'hsl(120, 75%, 60%)',
                label: 'Green'
            },
            {
                color: 'hsl(150, 75%, 60%)',
                label: 'Aquamarine'
            },
            {
                color: 'hsl(180, 75%, 60%)',
                label: 'Turquoise'
            },
            {
                color: 'hsl(210, 75%, 60%)',
                label: 'Light blue'
            },
            {
                color: 'hsl(240, 75%, 60%)',
                label: 'Blue'
            },
            {
                color: 'hsl(270, 75%, 60%)',
                label: 'Purple'
            }
        ],
        backgroundColors: [
            {
                color: 'hsl(0, 0%, 0%)',
                label: 'Black'
            },
            {
                color: 'hsl(0, 0%, 30%)',
                label: 'Dim grey'
            },
            {
                color: 'hsl(0, 0%, 60%)',
                label: 'Grey'
            },
            {
                color: 'hsl(0, 0%, 90%)',
                label: 'Light grey'
            },
            {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                hasBorder: true
            },
            {
                color: 'hsl(0, 75%, 60%)',
                label: 'Red'
            },
            {
                color: 'hsl(30, 75%, 60%)',
                label: 'Orange'
            },
            {
                color: 'hsl(60, 75%, 60%)',
                label: 'Yellow'
            },
            {
                color: 'hsl(90, 75%, 60%)',
                label: 'Light green'
            },
            {
                color: 'hsl(120, 75%, 60%)',
                label: 'Green'
            },
            {
                color: 'hsl(150, 75%, 60%)',
                label: 'Aquamarine'
            },
            {
                color: 'hsl(180, 75%, 60%)',
                label: 'Turquoise'
            },
            {
                color: 'hsl(210, 75%, 60%)',
                label: 'Light blue'
            },
            {
                color: 'hsl(240, 75%, 60%)',
                label: 'Blue'
            },
            {
                color: 'hsl(270, 75%, 60%)',
                label: 'Purple'
            }
        ]
    }
};

/** For Image plugin */
const sideIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path opacity=".5" d="M2 3h16v2H2zm0 12h16v2H2zm0-9h6v2H2zm0 3h6v2H2zm0 3h6v2H2z" />
    <path
        d="M10 0 A10 10 0 0 0 10 20 L10 10 Z" transform="scale(0.5) translate(26, 10)"
        fill="#000" />
</svg>`;
const leftIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zm0-3H18v1.5h-4.5zm0-3H18v1.5h-4.5zM2 15h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>`;
const rightIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2zm0-9h5v1.5H2zm0 3h5v1.5H2zm0 3h5v1.5H2z"/><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"/></svg>`;
const inlineIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zM2 15h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>`;
const centerIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M15.003 7v5.5a1 1 0 0 1-1 1H5.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H6.5V12h6.997V7.5z"/></svg>`;
const blockLeftIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>`;
const blockRightIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"/></svg>`;

export const imageConfig: ImageConfig = {
    toolbar: [
        {
            name: 'imageStyle:icons',
            title: 'Alignment',
            items: [
                'imageStyle:margin-left',
                'imageStyle:margin-right',
                'imageStyle:inline'
            ],
            defaultItem: 'imageStyle:margin-left'
        },
        {
            name: 'imageStyle:pictures',
            title: 'Style',
            items: ['imageStyle:alignBlockLeft', 'imageStyle:block', 'imageStyle:alignBlockRight', 'imageStyle:side'],
            defaultItem: 'imageStyle:block'
        }, '|',
        'imageTextAlternative', 'imageResize'
    ],
    styles: {
        options: [{
            name: 'side',
            icon: sideIcon,
            title: 'Side image',
            className: 'image-side',
            modelElements: ['imageBlock']
        },
        {
            name: 'block',
            title: 'Centered image',
            icon: centerIcon,
            className: 'image-block',
            modelElements: ['imageBlock']
        },
        {
            name: 'alignBlockLeft',
            title: 'Align left image',
            icon: blockLeftIcon,
            className: 'image-style-align-block-left',
            modelElements: ['imageBlock']
        },
        {
            name: 'alignBlockRight',
            title: 'Align right image',
            icon: blockRightIcon,
            className: 'image-style-align-block-right',
            modelElements: ['imageBlock']
        },
        // for inline image
        {
            name: 'margin-left',
            icon: leftIcon,
            title: 'Image on left margin',
            className: 'image-margin-left',
            modelElements: ['imageInline']
        }, {
            name: 'margin-right',
            icon: rightIcon,
            title: 'Image on right margin',
            className: 'image-margin-right',
            modelElements: ['imageInline']
        },
        {
            name: 'inline',
            icon: inlineIcon,
            title: 'Image inline',
            className: 'image-inline',
            modelElements: ['imageInline']
        }]
    },
    resizeUnit: "%",
    resizeOptions: [
        {
            name: 'resizeImage:original',
            value: null,
            icon: 'original'
        },
        {
            name: 'resizeImage:25',
            value: '25',
            icon: '25'
        },
        {
            name: 'resizeImage:50',
            value: '50',
            icon: 'medium'
        },
        {
            name: 'resizeImage:75',
            value: '75',
            icon: 'large'
        },
        {
            name: 'resizeImage:100',
            value: '100',
            icon: 'full'
        }
    ],
};

export const headingConfig : HeadingConfig = {
    options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
      ]
};

/** For toolbar display */
export const toolbarConfig: ToolbarConfig = {
    items: [
        'undo', 'redo', '|', 'sourceEditing', '|',
        'fontFamily', 'fontSize', 'heading', '|',
        'bold', 'italic', 'strikethrough', 'fontColor', 'fontBackgroundColor', '|',
        'link', 'uploadImage', 'mediaEmbed', 'specialCharacters', '|',
        'alignment', 'bulletedList', 'numberedList', 'blockQuote', 'horizontalLine', '|',
        'codeBlock', 'insertTable'
    ],
};