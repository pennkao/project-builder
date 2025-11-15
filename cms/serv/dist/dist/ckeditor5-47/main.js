/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoFgNARATAdA7PCkCMAGAnKgzMrWAcumu2ArAGxr7nmpwiohbn6mkgMjpRz4hIQAXgAsAtAGMAdklRhgyMLNkLlAXRQATfNnGoIqoA==
 */

import {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	Autoformat,
	TextTransformation,
	Heading,
	Link,
	AutoLink,
	ImageInline,
	ImageToolbar,
	ImageBlock,
	ImageInsertViaUrl,
	AutoImage,
	ImageResize,
	CKBoxImageEdit,
	CKBox,
	CloudServices,
	ImageUpload,
	ImageInsert,
	PictureEditing,
	ImageStyle,
	LinkImage,
	ImageCaption,
	ImageTextAlternative,
	CodeBlock,
	PasteFromOffice,
	Emoji,
	Mention,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Superscript,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	RemoveFormat,
	Highlight,
	ShowBlocks,
	GeneralHtmlSupport,
	HtmlEmbed,
	HtmlComment,
	FullPage,
	PageBreak,
	Table,
	TableToolbar,
	TableLayout,
	PlainTableOutput,
	TableProperties,
	TableCellProperties,
	TableColumnResize,
	TableCaption,
	List,
	TodoList,
	ListProperties,
	TextPartLanguage,
	WordCount,
	Title
} from '/ckeditor5-47/ckeditor5/ckeditor5.js';
import {
	PasteFromOfficeEnhanced,
	SourceEditingEnhanced,
	DocumentOutline,
	TableOfContents,
	MultiLevelList,
	EmailConfigurationHelper
} from '/ckeditor5-47/ckeditor5-premium-features/ckeditor5-premium-features.js';

import translations from '/ckeditor5-47/ckeditor5/translations/zh-cn.js';
import premiumFeaturesTranslations from './ckeditor5-premium-features/translations/zh-cn.js';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjEzNTAzOTksImp0aSI6ImI2NmU2YzUyLWM2MzctNDM1My1hN2YzLTYxZDc3YjI2NmRkMSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjhiZWVkMmM0In0.Z55Cs8i_1Kni0polNDVdvEmPfa7NamwkdqFTQEtuvqBeW5hNWOS6E6oszWn4ELkMRSEOLezW3aOC5s1zT1I_EQ';

const CLOUD_SERVICES_TOKEN_URL =
	'https://2gbwag56jb_5.cke-cs.com/token/dev/dcd58e0b5e2961d6e0302cd545dfb22b8812ef5af92d19ef23449ca5a7dd?limit=10';

const DEFAULT_HEX_COLORS = [
	{ color: '#000000', label: 'Black' },
	{ color: '#4D4D4D', label: 'Dim grey' },
	{ color: '#999999', label: 'Grey' },
	{ color: '#E6E6E6', label: 'Light grey' },
	{ color: '#FFFFFF', label: 'White', hasBorder: true },
	{ color: '#E65C5C', label: 'Red' },
	{ color: '#E69C5C', label: 'Orange' },
	{ color: '#E6E65C', label: 'Yellow' },
	{ color: '#C2E65C', label: 'Light green' },
	{ color: '#5CE65C', label: 'Green' },
	{ color: '#5CE6A6', label: 'Aquamarine' },
	{ color: '#5CE6E6', label: 'Turquoise' },
	{ color: '#5CA6E6', label: 'Light blue' },
	{ color: '#5C5CE6', label: 'Blue' },
	{ color: '#A65CE6', label: 'Purple' }
];

const editorConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'sourceEditingEnhanced',
			'showBlocks',
			'textPartLanguage',
			'|',
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'code',
			'removeFormat',
			'|',
			'emoji',
			'pageBreak',
			'link',
			'insertImage',
			'ckbox',
			'insertTable',
			'insertTableLayout',
			'tableOfContents',
			'highlight',
			'codeBlock',
			'htmlEmbed',
			'|',
			'bulletedList',
			'numberedList',
			'multiLevelList',
			'todoList'
		],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		Autoformat,
		AutoImage,
		AutoLink,
		Autosave,
		Bold,
		CKBox,
		CKBoxImageEdit,
		CloudServices,
		Code,
		CodeBlock,
		DocumentOutline,
		EmailConfigurationHelper,
		Emoji,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		FullPage,
		GeneralHtmlSupport,
		Heading,
		Highlight,
		HtmlComment,
		HtmlEmbed,
		ImageBlock,
		ImageCaption,
		ImageInline,
		ImageInsert,
		ImageInsertViaUrl,
		ImageResize,
		ImageStyle,
		ImageTextAlternative,
		ImageToolbar,
		ImageUpload,
		Italic,
		Link,
		LinkImage,
		List,
		ListProperties,
		Mention,
		MultiLevelList,
		PageBreak,
		Paragraph,
		PasteFromOffice,
		PasteFromOfficeEnhanced,
		PictureEditing,
		PlainTableOutput,
		RemoveFormat,
		ShowBlocks,
		SourceEditingEnhanced,
		Strikethrough,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableLayout,
		TableOfContents,
		TableProperties,
		TableToolbar,
		TextPartLanguage,
		TextTransformation,
		Title,
		TodoList,
		Underline,
		WordCount
	],
	cloudServices: {
		tokenUrl: CLOUD_SERVICES_TOKEN_URL
	},
	documentOutline: {
		container: document.querySelector('#editor-outline')
	},
	fontBackgroundColor: {
		colorPicker: {
			format: 'hex'
		},
		colors: DEFAULT_HEX_COLORS
	},
	fontColor: {
		colorPicker: {
			format: 'hex'
		},
		colors: DEFAULT_HEX_COLORS
	},
	fontFamily: {
		supportAllValues: true
	},
	fontSize: {
		options: [10, 12, 14, 'default', 18, 20, 22],
		supportAllValues: true
	},
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5'
			},
			{
				model: 'heading6',
				view: 'h6',
				title: 'Heading 6',
				class: 'ck-heading_heading6'
			}
		]
	},
	htmlSupport: {
		allow: [
			{
				name: /^(div|table|tbody|tr|td|span|img|h1|h2|h3|p|a)$/,
				styles: true,
				attributes: true,
				classes: true
			}
		]
	},
	image: {
		toolbar: [
			'toggleImageCaption',
			'imageTextAlternative',
			'|',
			'imageStyle:inline',
			'imageStyle:wrapText',
			'imageStyle:breakText',
			'|',
			'resizeImage',
			'|',
			'ckboxImageEdit'
		]
	},
	initialData:
		'',
	language: 'zh-cn',
	licenseKey: LICENSE_KEY,
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file'
				}
			}
		}
	},
	list: {
		properties: {
			styles: true,
			startIndex: true,
			reversed: false
		}
	},
	mention: {
		feeds: [
			{
				marker: '@',
				feed: [
					/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
				]
			}
		]
	},
	placeholder: 'Type or paste your content here!',
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
		tableProperties: {
			borderColors: DEFAULT_HEX_COLORS,
			backgroundColors: DEFAULT_HEX_COLORS
		},
		tableCellProperties: {
			borderColors: DEFAULT_HEX_COLORS,
			backgroundColors: DEFAULT_HEX_COLORS
		}
	},
	translations: [translations, premiumFeaturesTranslations]
};

//configUpdateAlert(editorConfig);
ClassicEditor.create(document.querySelector('#editor'), editorConfig).then(editor => {
	const wordCount = editor.plugins.get('WordCount');
	document.querySelector('#editor-word-count').appendChild(wordCount.wordCountContainer);
	window.editor=editor;
	window.onInitEditor &&window.onInitEditor(editor)
	return editor;
});

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
	if (configUpdateAlert.configUpdateAlertShown) {
		return;
	}

	const isModifiedByUser = (currentValue, forbiddenValue) => {
		if (currentValue === forbiddenValue) {
			return false;
		}

		if (currentValue === undefined) {
			return false;
		}

		return true;
	};

	const valuesToUpdate = [];

	configUpdateAlert.configUpdateAlertShown = true;

	if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
		valuesToUpdate.push('LICENSE_KEY');
	}

	if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
		valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
	}

	if (valuesToUpdate.length) {
		window.alert(
			[
				'Please update the following values in your editor config',
				'to receive full access to Premium Features:',
				'',
				...valuesToUpdate.map(value => ` - ${value}`)
			].join('\n')
		);
	}
}
