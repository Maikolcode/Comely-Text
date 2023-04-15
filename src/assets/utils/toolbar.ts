export const ToolbarOptions = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike', 'clean'],
      ['code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ align: [] }],

      ['link', 'image', 'video'],

      [
        { font: [] },
        { size: ['small', false, 'large', 'huge'] },
        { header: [1, 2, 3, 4, 5, 6, false] },
      ],
    ],
  },
};
