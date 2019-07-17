// http://simplelineicons.com/
// 사이드 메뉴
export default {
  items: [
    {
      name: '사진',
      url: '/picture',
      icon: 'icon-cup',
      children: [
        {
          name: '사진불러오기',
          url: '/picture/load',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      title: true,
      name: '코드관리',
      class: '',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'EMOTION',
      url: '/code/emotion',
      icon: 'icon-pencil',
    },
    {
      name: 'FILTER',
      url: '/code/filter',
      icon: 'icon-pencil',
    },
    {
      name: '공통코드',
      url: '/code/common',
      icon: 'icon-pencil',
    },
    {
      name: 'SPCH코드',
      url: '/code/spch',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: '컨텐츠 관리',
      class: '',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: '컨텐츠 등록',
      url: '/emotion_speech/registration',
      icon: 'icon-puzzle',
    },
    {
      name: '컨텐츠 연동',
      url: '/emotion_speech/mapping',
      icon: 'icon-puzzle',
    },
    {
      title: true,
      name: '사이트 관리',
      class: '',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: '메뉴 관리',
      url: '/site/menu',
      icon: 'icon-puzzle',
    },
    {
      name: '사이트 컨텐츠 관리',
      url: '/site/content',
      icon: 'icon-puzzle',
    },
    {
      name: '이미지 관리',
      url: '/site/image',
      icon: 'icon-puzzle',
    },
    {
      divider: true,
    },
  ],
};
